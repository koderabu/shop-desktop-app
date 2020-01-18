import ImageMerger from 'components/ImageMerger/ImageMerger';
import JsBarcode from 'jsbarcode';

export default class BarcodeGenerator {


    // Images are 96dpi.
    // That means a pixel is equivalent to 0.264583333mm
    
    static generate(data="Placeholder", options = {}){
        // Handle optional parameters
        if (options === undefined){ options = {};}
        if (options.prefix) data = options.prefix + data;
        var border = (options.border)? options.border : false;
        var borderWidth = (options.borderWidth)? options.borderWidth : 10;
        var borderPadding = (options.borderPadding)? options.borderPadding : 0;
        var text = (options.text)? options.text : null;
        var fontSize = (options.fontSize)? options.fontSize : 30;
        const textBottomMargin = 10;
        // Generate the barcode as dataURL
        var barcodeCanvas = document.createElement("canvas");
        JsBarcode(barcodeCanvas, data);
        // Load resulting canvas
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        // Calculate canvas width
        canvas.width = barcodeCanvas.width 
                        + (borderWidth + borderPadding) * 2;
        // Calculate canvas height
        canvas.height = barcodeCanvas.height 
                        + (borderWidth + borderPadding) * 2 
                        + ((text)? fontSize + textBottomMargin : 0);
        // Fill the image with a white background
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Draw the border (optionas)
        if (border){
            ctx.lineWidth = borderWidth;
            let rectX = borderWidth / 2;
            let rectY = borderWidth / 2 + ((text)? fontSize + textBottomMargin: 0)
            let rectWidth = canvas.width - borderWidth;
            let rectHeight = canvas.height - ((text)? fontSize + textBottomMargin : 0) - borderWidth
            ctx.rect(rectX, rectY, rectWidth, rectHeight);
            ctx.stroke();
        }
        // Then draw the barcode
        let imgX = borderPadding + borderWidth;
        let imgY = borderPadding + borderWidth + ((text)? fontSize + textBottomMargin: 0)
        ctx.drawImage(barcodeCanvas, imgX, imgY);
        // Write the text
        if (text){
            ctx.fillStyle = "black";
            ctx.font = fontSize+"px Arial";
            ctx.fillText(text, 0, fontSize); 
        }
        // Return the dataURL
        return canvas.toDataURL("image/png");
    }

    
    static async bulk_generate(dataArr, options){
        // Handle optional parameters
        if (options === undefined){ options = {}; }
        var rows = (options.rows)? options.rows : 3;
        var cols = (options.cols)? options.cols : 3;
        var row_sep = (options.row_sep)? options.row_sep : 200;
        var col_sep = (options.col_sep)? options.col_sep : 200;
        var enable_text = (options.textArr && options.textArr.length === dataArr.length)? true : false;
        // Obtain all of the barcode's image
        var barcodes = dataArr.map( (data, index) => { 
            // Clone the given options and remove unneded values
            let barcodeOptions = { ...options }
            delete barcodeOptions["textArr"];
            delete barcodeOptions["rows"];
            delete barcodeOptions["cols"];
            delete barcodeOptions["row_sep"];
            delete barcodeOptions["col_sep"];
            if (enable_text){
                barcodeOptions["text"] = options["textArr"][index];
            }
            return this.generate(data, barcodeOptions);
        });
        return await ImageMerger.mergeAndReturnDataURLs(barcodes, rows, cols, row_sep, col_sep);
    }

}