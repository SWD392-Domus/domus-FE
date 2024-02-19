export interface SingleProductProps{
    "id": string;
    "productName": string;
    "brand": string;
    "description": string;
    "colors"?: string[];
    "sizes"?: string[];
    "images"?: string[];
    "material"?: string[];
    "details": ProductDetailsProps[];
}

export interface ProductDetailsProps{
    "id": string;
    "displayPrice":number;
    "attributes"?: AttributesProps[];
    "images": ImagesProps[];
}

export interface AttributesProps{
    "name": string;
    "value": string;
}

export interface ImagesProps{
    "imageUrl": string;
}