export type PackageProps = {
  id: string;
  name: string;
  discount: number;
  services: {
    id: string;
    name: string;
    price: number;
    monetaryUnit: string;
  }[];
  productDetails: ProductProps[];
  packageImages: {
    id: string;
    imageUrl: string;
    width: number;
    height: number;
  }[];
};

export type ProductProps = {
  id: string;
  displayPrice: number;
  attributes: {
    name: string;
    value: string;
    valueType: string;
  }[];
  images: {
    imageUrl: string;
    width: number;
    height: number;
  }[];
  prices: {
    price: number;
    monetaryUnit: string;
    quantity: number;
    quantityType: string;
  }[];
};
