export type ArticleProps = {
  id: string;
  name: string;
  discount: number;
  services: ServiceProps[];
  productDetails: ProductDetailProps[];
  articleImages: ArticleImageProps[];
};

export type ServiceProps = {
  id: string;
  name: string;
  price: number;
  monetaryUnit: string;
};
export type ArticleImageProps = {
  id: string;
  imageUrl: string;
  width: number;
  height: number;
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
