import ImageMerger from 'components/ImageMerger/ImageMerger';
import JsBarcode from 'jsbarcode';

const PIXEL_TO_MILLIMETER = 0.264583333;
const TEXT_MARGIN_BOTTOM = 10;

export default class BarcodeGenerator {

    static generate(data="Placeholder", opts = {}){
        
        // Handle optional parameters
        if (opts === undefined){ opts = {};}
        // Make a clone of options to modify later
        let options = { ...opts };
        // Handle border optional paramaters
        if (typeof options.border !== "boolean") options.border = false;
        if (typeof options.borderWidth !== "number") options.borderWidth = 10;
        if (typeof options.borderPadding !== "number") options.borderPadding = 0;
        // Handle text optional parameters
        if (typeof options.text !== "string") options.text = null;
        if (typeof options.fontSize !== "number") options.fontSize = 12;
        // Handle fixed dimensions optional parameters
        if (typeof options.fixedWidth !== "number") options.fixedWidth = null;
        if (typeof options.fixedHeight !== "number") options.fixedHeight = null;
        if (options.prefix) data = options.prefix + data;

        // Get Barcode image
        let barcode = this._generateBarcodeImage(data);

        // Create the canvas which will sustain the resulting image
        var canvas = document.createElement("canvas");

        // Allocate canvas dimension
        this._allocateCanvasDimension(canvas, barcode, options);

        // Fill the image with a white background
        this._fillCanvasBackground(canvas, "white");

        // Draw the barcode
        this._drawBarcode(canvas, barcode, options);

        // Draw the border (optionas)
        if (options.border) this._drawCanvasBorder(canvas, options);

        // Write the text
        if (options.text) this._drawText(canvas, options);

        // Return the dataURL
        return canvas.toDataURL("image/png");
    }

    
    static async bulk_generate(dataArr, opts){

        // Handle optional parameters
        if (opts === undefined){ opts = {}; }
        // Make a clone of options to modify later
        let options = { ... opts};
        if (typeof options.rows !== "number") options.rows = 3;
        if (typeof options.cols !== "number") options.cols = 3;
        if (typeof options.row_sep !== "number") options.row_sep = 200;
        if (typeof options.col_sep !== "number") options.col_sep = 200;
        let enable_text = options.textArr != null && options.textArr.length === dataArr.length
        // Obtain all of the barcode's image
        var barcodes = dataArr.map( (data, index) => { 
            // Clone the given options and remove unneded values
            let barcodeOptions = { ...options }
            delete barcodeOptions["textArr"];
            delete barcodeOptions["rows"];
            delete barcodeOptions["cols"];
            delete barcodeOptions["row_sep"];
            delete barcodeOptions["col_sep"];
            if (enable_text) barcodeOptions["text"] = options["textArr"][index];
            return this.generate(data, barcodeOptions);
        });
        return await ImageMerger.mergeAndReturnDataURLs(barcodes, options.rows, options.cols, options.row_sep, options.col_sep);
    }


    static _generateBarcodeImage(data){
        let barcode = document.createElement("canvas");
        JsBarcode(barcode, data);
        return barcode;
    }


    static _allocateCanvasDimension(canvas, barcode, options){
        // Allocate canvas width
        canvas.width = options.fixedWidth ? ( options.fixedWidth / PIXEL_TO_MILLIMETER ) :
            ( barcode.width + options.border * (options.borderWidth + options.borderPadding) * 2 );
        // Allocate canvas height
        canvas.height = options.fixedHeight ? ( options.fixedHeight / PIXEL_TO_MILLIMETER ) :
            ( barcode.height + options.border * (options.borderWidth + options.borderPadding) * 2 + (options.text ? 1 : 0) * (options.fontSize + TEXT_MARGIN_BOTTOM));            
    }


    static _fillCanvasBackground(canvas, color){
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }


    static _drawCanvasBorder(canvas, options){
        let ctx = canvas.getContext("2d");
        ctx.lineWidth = options.borderWidth;
        let rectX = options.borderWidth / 2;
        let rectY = options.borderWidth / 2 + (options.text ? 1 : 0) * (options.fontSize + TEXT_MARGIN_BOTTOM);
        let rectWidth = canvas.width - options.borderWidth;
        let rectHeight = canvas.height - (options.text ? 1 : 0) * (options.fontSize + TEXT_MARGIN_BOTTOM) - options.borderWidth
        ctx.rect(rectX, rectY, rectWidth, rectHeight);
        ctx.stroke();
    }


    static _drawBarcode(canvas, barcode, options){
        if (options.fixedWidth || options.fixedHeight){
            // Create temporal canvas
            let tmpcanvas = document.createElement("canvas");
            // Obtain the scale for resize
            let fixedWidthPixels = (options.fixedWidth / PIXEL_TO_MILLIMETER) - options.border * (options.borderWidth + options.borderPadding) * 2;
            let fixedHeightPixels = (options.fixedHeight  / PIXEL_TO_MILLIMETER) - options.border * (options.borderWidth + options.borderPadding) * 2 - (options.text? (options.fontSize + TEXT_MARGIN_BOTTOM) : 0);
            let widthScale = fixedWidthPixels / barcode.width;
            let heightScale = fixedHeightPixels / barcode.height;
            if (options.fixedWidth && options.fixedHeight){
                var scale = Math.min(widthScale, heightScale);
            } else if (options.fixedWidth){
                var scale = widthScale;
            } else{ 
                var scale = heightScale;
            }
            // Allocate the dimension of the temporal canvas
            tmpcanvas.width = barcode.width * scale;
            tmpcanvas.height = barcode.height * scale;
            // Draw the scaled barcode in the temporal canvas
            let tmpctx = tmpcanvas.getContext("2d");
            tmpctx.scale(scale, scale);
            tmpctx.drawImage(barcode, 0, 0);
            // Draw the temporal canvas into the original canvas
            let ctx = canvas.getContext("2d");
            let imgX = options.borderPadding + options.borderWidth + (canvas.width - options.borderPadding * 2 - options.borderWidth * 2 - tmpcanvas.width) / 2;
            let imgY = options.borderPadding + options.borderWidth + (options.text ? 1 : 0) * (options.fontSize + TEXT_MARGIN_BOTTOM);
            ctx.drawImage(tmpcanvas, imgX, imgY);

        } else{
            let ctx = canvas.getContext("2d");
            let imgX = options.borderPadding + options.borderWidth;
            let imgY = options.borderPadding + options.borderWidth + (options.text ? 1 : 0) * (options.fontSize + TEXT_MARGIN_BOTTOM);
            ctx.drawImage(barcode, imgX, imgY);
        }

    }


    static _drawText(canvas, options){
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = "black";
        ctx.font = options.fontSize + "px Arial";
        ctx.fillText(options.text, 0, options.fontSize); 
    }


}