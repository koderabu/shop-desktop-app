import ImageMerger from 'components/ImageMerger/ImageMerger';

export default class BarcodeGenerator {
    
    static generate(string = "undefined barcode", dpi = 300){
        return "https://barcode.tec-it.com/barcode.ashx?data="+string+"&code=Code128&dpi="+dpi;
    }

    static async bulk_generate(objarr, rows, columns, row_sep, col_sep, dpi = 300){
        let barcodes = objarr.map( obj => { return this.generate(obj.rowTitle, dpi)});
        return await ImageMerger.mergeToDataURL(barcodes, rows, columns, row_sep, col_sep)
            .catch((error) => { return null; });
    }

}