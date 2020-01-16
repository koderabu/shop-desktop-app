export default class ImageMerger {
    
    static mergeToDataURL(sources, rows = 4, columns = 2, row_sep = 200, col_sep = 200){
  
        // Temporal
        if (sources.length > rows * columns){
            console.log("Not yet, buddy");
            return null;
        }

        // Obtain the total height and width of the canvas
        let current_row_width = 0;
        let current_row_height = 0;
        let total_canvas_width = 0;
        let total_canvas_height = 0;
        for (let index = 0; index < sources.length; index++){
            let src = sources[index];
            let image = new Image;
            image.crossOrigin = "Anonymous";
            image.src = "https://cors-anywhere.herokuapp.com/" + src;
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
        console.log("total", total_canvas_height, total_canvas_width);
        // Draw the images in the canvas
        var current_x = 0;
        var current_y = 0;
        var row_max_y = 0;
        sources.forEach( (src, index) => {
            console.log("the index", index);
            let image = new Image;
            image.crossOrigin = "Anonymous";
            image.src = "https://cors-anywhere.herokuapp.com/" + src;
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
                console.log("current_y", current_y);

            }
        });
        return canvas.toDataURL("image/png");
    }
    

}