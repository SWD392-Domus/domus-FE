export interface ProductProps {
    id: string;
    productName: string;
    description?: string;
    details: ProductDetails[];
  }
  
export interface ProductDetails {
    images: {
      imageUrl: string;
    }[];
    attributes:{
      name: string;
      value: string;
    }[];
    displayPrice: number;
  }