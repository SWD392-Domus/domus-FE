export interface SingleProductProps{
    "id": string;
    "productName": string;
    "brand": string;
    "weightUnit"?: string;
    "description": string;
    // "productCategory"?: ProductCategoryProps;
    "details": ProductDetailsProps[];
}

// export interface ProductCategoryProps{
//     "id": string;
//     "name": string;
// }

export interface ProductDetailsProps{
    "id": string;
    "displayPrice":number;
    "attributes"?: AttributesProps[];
    "images"?: ImagesProps[];
}

export interface AttributesProps{
    "name": string;
    "value": string;
}

export interface ImagesProps{
    "imageUrl": string;
}