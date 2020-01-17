import React from 'react';
import BarcodeRenderer from './BarcodeRenderer';


export default { 
    title: 'Barcode Renderer'
};

export const SimpleBarcode = () => (
    <BarcodeRenderer 
        data={"Simple Barcode"}>
    </BarcodeRenderer>
);

export const BarcodeWithBorder = () => (
    <BarcodeRenderer 
        data={"Barcode With Border"} 
        options={{
            border: true, 
            borderWidth: 10,
            borderPadding: 20 }}>
    </BarcodeRenderer>
);

export const BarcodeWithText = () => (
    <BarcodeRenderer 
        data={"Barcode With Text"} 
        options={{
            border: true, 
            borderWidth: 10,
            borderPadding: 20,
            text: "Lorem Ipsum",
            fontSize: 40 }}>
    </BarcodeRenderer>
)

export const BarcodeWithPrefix = () => (
    <BarcodeRenderer 
    data={"Barcode With Prefix"} 
    options={{
        border: true, 
        borderWidth: 10,
        borderPadding: 20,
        text: "Lorem Ipsum",
        fontSize: 40,
        prefix: "MV-"}}>
</BarcodeRenderer> 
)