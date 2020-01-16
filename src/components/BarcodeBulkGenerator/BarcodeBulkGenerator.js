import React from 'react';
import BarcodeGenerator from 'components/BarcodeGenerator/BarcodeGenerator'
import BarcodeRenderer from 'components/BarcodeRenderer/BarcodeRenderer';
import ImageMerger from 'components/ImageMerger/ImageMerger';

import { withStyles } from "@material-ui/core/styles";

import mergeImages from 'merge-images';
const useStyles = theme => ({


});

class BarcodeBulkGenerator extends React.Component {

  // props.data expected structure:
  // [
  //    {
  //    row_index: integer,
  //    row_title: string
  //    }
  // ]

  constructor(props){
    super(props);
    this.state = { data: props.data }
  }

  render() {
    
    // Get the URL image sources of the barcodes
    let sources = this.props.data.map( data => {
      return BarcodeGenerator.generate(data.row_title);
    });
    // Merge all of the images 
    let dataURL = ImageMerger.mergeToDataURL(sources);
    // download images for test  
    var link = document.createElement('a');
    link.download = 'filename.png';
    link.href =  dataURL;
    link.click();
    console.log("sources", sources);
    console.log("dataURL", dataURL);


    
    var canvas =document.createElement("canvas");
    var ctx=canvas.getContext("2d");
    var image = new Image;
    image.crossOrigin = "Anonymous";
    image.src = "https://cors-anywhere.herokuapp.com/"+"https://barcode.tec-it.com/barcode.ashx?data=title-1&code=Code128&dpi=300";
    image.onload = function() {
      console.log("image 1 ");
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      //console.log("canvas URL", canvas.toDataURL("image/png"));
      //var link = document.createElement('a');
      //link.download = 'filename.png';
      //link.href =  canvas.toDataURL("image/png")
      //link.click();
    }
    

    return (
      <div>Hola</div>
    )

  }
}

BarcodeBulkGenerator.defaultProps = {
  data : 
  [
    {
      row_index: -1,
      row_title: "title-1" 
    },
    {
      row_index: -2,
      row_title: "title-2"
    },
    {
      row_index: -3,
      row_title: "title-3"
    }
  ]
}
export default withStyles(useStyles)(BarcodeBulkGenerator);

