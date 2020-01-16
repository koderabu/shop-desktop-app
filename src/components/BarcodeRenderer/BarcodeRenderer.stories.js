import React from 'react';
import BarcodeRenderer from './BarcodeRenderer';


export default { 
    title: 'Barcode Renderer'
};

export const SimpleBarcode = () => (
    <BarcodeRenderer data={"Simple Barcode"}></BarcodeRenderer>
);

export const UseTimeAsData = () => (
    <BarcodeRenderer useTimeAsData>Use Time As Data</BarcodeRenderer>
);

export const WithPrefix = () => (
    <BarcodeRenderer useTimeAsData prefix={"MV"}>Use Time As Data</BarcodeRenderer>
)

export const UndefinedBarcode = () => (
    <BarcodeRenderer></BarcodeRenderer>
)

