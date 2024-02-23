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
    "quantity": number;
    "attributes"?: AttributesPropsForCreate[];
}

export interface AttributesPropsForCreate{
    "name": string;
    "value": string;
    "valueType": string;
}