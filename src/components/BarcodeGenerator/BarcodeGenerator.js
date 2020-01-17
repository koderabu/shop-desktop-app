import ImageMerger from 'components/ImageMerger/ImageMerger';

export default class BarcodeGenerator {

    static async generate(data="Placeholder", options = {}){
        return new Promise((resolve, reject) => {
            // Handle optional parameters
            if (options === undefined){ options = {};}
            if (options.prefix) data = options.prefix + data;
            var dpi = (options.dpi)? options.dpi : 300;
            var border = (options.border)? options.border : false;
            var borderWidth = (options.borderWidth)? options.borderWidth : 10;
            var borderPadding = (options.borderPadding)? options.borderPadding : 0;
            var text = (options.text)? options.text : null;
            var fontSize = (options.fontSize)? options.fontSize : 30;
            const textBottomMargin = 10;
            var image = new Image();
            image.onload = function(){
                // Load Canvas
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                // Calculate canvas width
                canvas.width = image.width 
                                + (borderWidth + borderPadding) * 2;
                // Calculate canvas height
                canvas.height = image.height 
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
                ctx.drawImage(image, borderPadding + borderWidth, borderPadding + borderWidth + ((text)? fontSize : 0));
                // Write the text
                if (text){
                    ctx.fillStyle = "black";
                    ctx.font = fontSize+"px Arial";
                    ctx.fillText(text, 0, fontSize); 
                }
                // Return the dataURL
                resolve(canvas.toDataURL("image/png"));

            };
            image.onerror = image.onabort = function(){
                console.error("An image failed to load");
                reject();
            };
            image.crossOrigin = "Anonymous";
            image.src = "https://cors-anywhere.herokuapp.com/" + "https://barcode.tec-it.com/barcode.ashx?data="+data+"&code=Code128&dpi="+dpi;
        });
    }

    static async bulk_generate(objarr, rows, columns, row_sep, col_sep, dpi = 300){
        let barcodes = objarr.map( obj => { return this.generate(obj.rowTitle, dpi)});
        return await ImageMerger.mergeAndReturnDataURLs(barcodes, rows, columns, row_sep, col_sep)
            .catch((error) => { return null; });  
    }

}