export interface ProductsStorage {
    id: string;
    productName: string;
    brand: string;
    totalQuantity: number;
    attributes: AttributesProps[];
    images: ImagesProps[];
    prices: PriceProps[];
}

export interface PriceProps {
    id: string;
    price: number;
    createdAt: Date
}
export interface AttributesProps {
    attributeId: string;
    name: string;
    value: string;
}
export interface ImagesProps {
    imageUrl: string;
}