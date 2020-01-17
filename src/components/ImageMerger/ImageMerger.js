export default class ImageMerger {

    static mergeAndReturnDataURLs(sources, rows, columns, row_sep, col_sep){
        // Calculate the amount of pages
        var pages = Math.ceil(sources.length / (rows * columns));
        // Generate each page for each subset of sources
        var promises = [];
        for (let i = 0; i < pages; i++){
            let start = i * rows * columns;
            let end =  ( (start + rows * columns) < sources.length)? (start + rows * columns) : (sources.length);
            let subset = sources.slice(start, end);
            promises.push(this._mergeToPage(subset, rows, columns, row_sep, col_sep));
        }
        return Promise.all(promises);
    }

    static _mergeToPage(sources, rows = 4, columns = 2, row_sep = 200, col_sep = 200){
        return new Promise((resolve, reject) => {
            // Preload all of the sources
            this._preloadImagesProcess(sources).then(function(imgs){
                // Calculate the dimension of the canvas
                let current_row_width = 0;
                let current_row_height = 0;
                let total_canvas_width = 0;
                let total_canvas_height = 0;
                for (let index = 0; index < imgs.length; index++){
                    let image = imgs[index];
                    // Update the current row width and height
                    current_row_width += image.width ;
                    current_row_height = Math.max(current_row_height, image.height);
                    // Whenever an entire column is filled, update the total canvas width and height
                    if ((index + 1) % columns === 0){
                        // Update the canvas dimension
                        total_canvas_width = Math.max(total_canvas_width, current_row_width + col_sep * columns);
                        total_canvas_height += current_row_height + row_sep;
                        // Reset current row width and height
                        current_row_width = 0;
                        current_row_height = 0;
                    } 
                    // If the last image was reached, but the column wasn't filled
                    else if((index + 1) === sources.length){
                        // Update the canvas dimension
                        total_canvas_width = Math.max(total_canvas_width, current_row_width + (index + 1) % columns);
                        total_canvas_height += current_row_height;
                        // Reset current row width and height
                        current_row_width = 0;
                        current_row_height = 0;
                    }
                }
                // Create the canvas that will hold the merged image
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                canvas.width = total_canvas_width;
                canvas.height = total_canvas_height;
                // Draw the images in the canvas
                var current_x = 0;
                var current_y = 0;
                var row_max_y = 0;
                for (let index = 0; index < imgs.length; index++){
                    let image = imgs[index];
                    // Draw image on the canvas
                    ctx.drawImage(image, current_x, current_y);
                    // Update current x position
                    current_x += image.width + col_sep;
                    // Update row_max_y 
                    row_max_y = Math.max(row_max_y, image.height);
                    // Update current y position
                    if ((index + 1) % columns === 0){
                        current_y += row_max_y + row_sep;
                        current_x = 0;
                        row_max_y = 0;    
                    }
                }
                resolve(canvas.toDataURL("image/png"));
            }, function(errImg) {
                // At least one image failed to load
                console.error("At least one image failed to load");
                reject();
            });
        })
    }

    static _preloadImagesProcess(srcs){
        var promises = [];
        for (let i = 0; i < srcs.length; i++){
            promises.push(this._loadImageProcess(srcs[i]));
        }
        return Promise.all(promises);
    }

    static _loadImageProcess(src){
        return new Promise((resolve, reject) => {
            var image = new Image();
            image.onload = function() {
                resolve(image);
            };
            image.onerror = image.onabort = function() {
                reject(src);
            };
            image.crossOrigin = "Anonymous";
            image.src = "https://cors-anywhere.herokuapp.com/" + src;
        });
    }

    

}