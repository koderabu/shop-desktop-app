import React from 'react';
import BarcodeGenerator from 'components/BarcodeGenerator/BarcodeGenerator'
import ImageMerger from 'components/ImageMerger/ImageMerger';
import { withStyles } from "@material-ui/core/styles";

const useStyles = theme => ({
  'imgContainer' : {
    width: "100%", 
    '& img' : {
      width: "100%"
    }
  }
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
    this.state = { 
      image_loaded: false,
      image: "undefined" 
    }
  }

  render() {
    // Get classes
    const { classes } = this.props;
    // Obtain the images
    if (!this.state.image_loaded){
      BarcodeGenerator.bulk_generate(this.props.data, this.props.rows, this.props.columns)
      .then((dataURL) => {
        this.setState({
          image_loaded: true,
          image : dataURL
        });
      });
    }
    // Render
    return (
      <div className={classes.imgContainer}>
        <img src={this.state.image}/>
      </div>
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

