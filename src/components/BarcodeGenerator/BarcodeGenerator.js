export default class BarcodeGenerator {
    
    static generate(string = "undefined barcode", dpi = 300){
        return "https://barcode.tec-it.com/barcode.ashx?data="+string+"&code=Code128&dpi="+dpi;
    }

    static bulk_generate(string_arr = ["undefined_barcode"], dpi = 300){
        return string_arr.map( string => {
            return this.generate(string, dpi);    
        })
    }

}