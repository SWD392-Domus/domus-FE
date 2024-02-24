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
