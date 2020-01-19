import React from 'react';
import BarcodeBulkGenerator from './BarcodeBulkGenerator';


export default { 
    title: 'Barcode Bulk Generator'
};

var _generatePlaceholderData = function(qty){
    let placeholders = [];
    let start = Date.now();
    for (let i = 0; i < qty; i++){
        placeholders.push(start + i);
    }
    return placeholders;
}

var _generatePlaceholderTexts = function(qty){
    let placeholders = [];
    for (let i = 0; i < qty; i++){
        placeholders.push("Lorem Ipsum (" + i + ")");
    }
    return placeholders;
}

export const Generate9On3X3 = () => (
    <BarcodeBulkGenerator 
        data={_generatePlaceholderData(9)} 
        options= {{
            rows: 3, 
            cols: 3,
            row_sep: 50,
            col_sep: 50,
            textArr: _generatePlaceholderTexts(9),
            fontSize: 17,
            border: true,
            borderWidth: 5,
            borderPadding: 10,

        }}>
    </BarcodeBulkGenerator>
);


export const Generate18On3x6 = () => (
    <BarcodeBulkGenerator  
        data={_generatePlaceholderData(18)} 
        options={{
            rows: 3, 
            cols: 6,
            row_sep: 50,
            col_sep: 50,
            border: true,
            borderWidth: 5,
            borderPadding: 10,
        }}>
    </BarcodeBulkGenerator>
);

export const Generate33On5x3 = () => (
    <BarcodeBulkGenerator 
        data={_generatePlaceholderData(33)} 
        options={{
            rows: 5, 
            cols: 3,
            row_sep: 50,
            col_sep: 50,
            textArr: _generatePlaceholderTexts(33),
            fontSize: 17,
            border: true,
            borderWidth: 5,
            borderPadding: 10,
        }}>
        
    </BarcodeBulkGenerator>
)

export const Generate9On3X3Resized = () => (
    <BarcodeBulkGenerator 
        data={_generatePlaceholderData(9)} 
        options= {{
            rows: 3, 
            cols: 3,
            row_sep: 0,
            col_sep: 0,
            border: true,
            borderWidth: 1,
            borderPadding: 10,

        }}>
    </BarcodeBulkGenerator>
);
