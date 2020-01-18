import React from 'react';
import BarcodeGenerator from 'components/BarcodeGenerator/BarcodeGenerator'
import ImageMerger from 'components/ImageMerger/ImageMerger';
import { withStyles } from "@material-ui/core/styles";

const useStyles = theme => ({
  'imgContainer' : {
    width: "100%", 
    '& img' : {
      width: "100%",
      'margin-bottom': '150px'
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
      dataUrlsLoaded: false,
      dataURLs: [] 
    }
  }

  render() {
    // Get classes
    const { classes } = this.props;
    // Prepare the options

    // Obtain the images
    if (!this.state.dataUrlsLoaded){
      BarcodeGenerator.bulk_generate(this.props.data, this.props.options)
      .then((dataURLs) => {
        this.setState({
          dataUrlsLoaded: true,
          dataURLs : dataURLs
        });
      });
    }
    // Create an image for each dataURLs saved in props.state
    var items = this.state.dataURLs.map((src) => <img src={src}/> );
    // Render
    return (
      <div className={classes.imgContainer}>
        {items}
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

