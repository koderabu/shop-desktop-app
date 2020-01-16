import React from 'react';
import BarcodeGenerator from 'components/BarcodeGenerator/BarcodeGenerator'
import { withStyles } from "@material-ui/core/styles";

const useStyles = theme => ({
    'barcode_renderer' : {
        width: "100%"
    }
});

class BarcodeRenderer extends React.Component {

    // props.useTimeAsData: Use the time in milliseconds as the barcode data
    // props.data: Use props.data as the barcode data (overridden by useTimeAsData)
    // props.prefix: Add a prefix to the barcode data

    render() {
        // Get classes
        const { classes } = this.props;
        // Define the data of the barcode
        var data = (this.props.useTimeAsData)? Date.now().toString() : 
                        (this.props.data)? this.props.data:
                            "undefined barcode" ;
        // Add Prefix if included
        if (this.props.prefix)
            data = this.props.prefix + data;
        // Generate source of the barcode
        let barcode_src = BarcodeGenerator.generate(data);
        // Render
        return (
            <img className={classes.barcode_renderer} src={barcode_src} />
        )
    }
}

export default withStyles(useStyles)(BarcodeRenderer);

