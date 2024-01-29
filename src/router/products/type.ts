export interface ProductProps {
    id: string;
    productName: string;
    description?: string;
    productDetails: ProductDetails[];
  }
  
export interface ProductDetails {
    productImages: {
      imageUrl: string;
    }[];
    displayPrice: number;
  }