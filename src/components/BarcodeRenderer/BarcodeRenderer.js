import React from 'react';
import BarcodeGenerator from 'components/BarcodeGenerator/BarcodeGenerator'
import { withStyles } from "@material-ui/core/styles";

const useStyles = theme => ({
    'barcode_renderer' : {
        width: "auto"
    }
});

class BarcodeRenderer extends React.Component {

    // props.useTimeAsData: Use the time in milliseconds as the barcode data
    // props.data: Use props.data as the barcode data (overridden by useTimeAsData)
    // props.prefix: Add a prefix to the barcode dat
    // props.options {
    //  border: boolean (barcode surrounded by a border),
    //  borderWidth: integer (border line width),
    //  borderPadding: integer (border padding in px)
    //  text: string (text over the barcode)
    //  fontSize: integer (size of the font)
    // }

    constructor(props){
        super(props);
        this.state = { 
          dataURLReady: false,
          dataURL: "undefined" 
        }
      }
    
    render() {
        // Get classes
        const { classes } = this.props;
        // Define the data of the barcode
        var data = (this.props.data)? this.props.data : "undefined barcode" ;
        // Generate source of the barcode
        if (!this.state.dataURLReady){
            this.setState({
                dataURLReady: true,
                dataURL: BarcodeGenerator.generate(data, this.props.options)
            });
        }
        // Render
        return (
            <img className={classes.barcode_renderer} src={this.state.dataURL} />
        )
    }
}

export default withStyles(useStyles)(BarcodeRenderer);

