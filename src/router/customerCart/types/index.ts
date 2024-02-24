export type ProductsProps = {
  id: string;
  image: string;
  displayPrice: number;
  productName: string;
  category: string;
  brand: string;
  description: string;
  totalQuantity: number;
};

export type ServiceProps = {
  id: string;
  name: string;
  price: number;
  monetaryUnit: string;
};

export type ProductDetailProps = {
  id: string;
  productName: string;
  displayPrice: number;
  attributes: {
    name: string;
    value: string;
    valueType: string;
  }[];
  images: ProductImageProps[];
  prices: {
    price: number;
    monetaryUnit: string;
    quantity: number;
    quantityType: string;
  }[];
};

export type ProductImageProps = {
  imageUrl: string;
  width: number;
  height: number;
};
