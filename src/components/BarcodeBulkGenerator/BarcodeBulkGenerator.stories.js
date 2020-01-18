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


export const Generate9On3X3 = () => (
    <BarcodeBulkGenerator data={_generatePlaceholderData(9)} options={{rows: 3, cols: 3}}></BarcodeBulkGenerator>
);


export const Generate18On3x6 = () => (
    <BarcodeBulkGenerator  data={_generatePlaceholderData(18)} options={{rows: 3, cols: 6}}></BarcodeBulkGenerator>
);

export const Generate33On5x3 = () => (
    <BarcodeBulkGenerator data={_generatePlaceholderData(33)} options={{rows: 5, cols: 3}}></BarcodeBulkGenerator>
)
