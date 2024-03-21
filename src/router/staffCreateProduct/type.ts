export interface ProductPropsForCreate {
    productName: string;
    brand: string;
    productCategoryId: string;
    description?: string;
    productDetails: ProductDetailsPropsForCreate[];
  }
  

export interface ProductDetailsPropsForCreate{
    "displayPrice":number;
    "monetaryUnit": string,
    "attributes"?: AttributesPropsForCreate[];
    quantity: number;
}

export interface AttributesPropsForCreate{
    "name": string;
    "value": string;
    "valueType": string;
}