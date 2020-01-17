import React from 'react';
import BarcodeBulkGenerator from './BarcodeBulkGenerator';


export default { 
    title: 'Barcode Bulk Generator'
};

var _generatePlaceholderData = function(qty){
    let placeholders = [];
    for (let index = 0; index < qty; index++){
         placeholders.push({
             rowIndex: index,
             rowTitle: "Placeholder("+index+")"
         })
    }
    return placeholders;
}


export const Generate9On3X3 = () => (
    <BarcodeBulkGenerator data={_generatePlaceholderData(9)} rows={3} columns={3}></BarcodeBulkGenerator>
);


export const Generate18On3x6 = () => (
    <BarcodeBulkGenerator  data={_generatePlaceholderData(18)} rows={3} columns={6}></BarcodeBulkGenerator>
);

export const Generate33On5x3 = () => (
    <BarcodeBulkGenerator data={_generatePlaceholderData(33)} rows={5} columns={3}></BarcodeBulkGenerator>
)
