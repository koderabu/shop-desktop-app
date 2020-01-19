import React from 'react';
import BarcodeRenderer from './BarcodeRenderer';
import JsBarcode from 'jsbarcode';

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
            borderWidth: 3,
            borderPadding: 20,
            text: "Lorem Ipsum",
            fontSize: 20 }}>
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

export const BarcodeResize = () => (
    <div>
        <BarcodeRenderer data={"Resized Barcode"} ></BarcodeRenderer>
        <h3>75X30 resized:</h3>
        <BarcodeRenderer 
        data={"Resized Barcode"} 
        options={{
            fixedWidth: 75,
            fixedHeight: 30 }}>
        </BarcodeRenderer>
        <h3>75X30 resized with border:</h3>
        <BarcodeRenderer 
        data={"Resized Barcode"} 
        options={{
            fixedWidth: 75,
            fixedHeight: 30,
            border: true,
            borderWidth: 1 }}>
        </BarcodeRenderer>
        <h3>75X30 resized with border and a placeholder text:</h3>
        <BarcodeRenderer 
        data={"Resized Barcode"} 
        options={{
            fixedWidth: 75,
            fixedHeight: 30,
            border: true,
            borderWidth: 1,
            text: "Placeholder text",
            fontSize: 10 }}>
        </BarcodeRenderer>
    </div>
)

