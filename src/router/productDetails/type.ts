export interface SingleProductProps{
    "id": string;
    "productName": string;
    "productCategoryId": string;
    "brand": string;
    "description": string;
    "colors"?: string[];
    "sizes"?: string[];
    "images"?: string[];
    "material"?: string[];
    "details": ProductDetailsProps[];
}

export interface pricesProps{
    id: string;
    price: number;
    quantity: number;
    createdAt: Date;
}
export interface ProductDetailsProps{
    "id": string;
    "displayPrice":number;
    "attributes"?: AttributesProps[];
    "images": ImagesProps[];
    "prices": pricesProps[];
}

export interface AttributesProps{
    "name": string;
    "value": string;
}

export interface ImagesProps{
    "imageUrl": string;
}