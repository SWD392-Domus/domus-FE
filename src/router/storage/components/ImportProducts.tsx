import React from 'react'
import { ComboBoxResponsive } from './Comobox';

type Props = {}
export interface ProductDetails {
  productDetailId?: string;
  id?: string;
  images: {
      imageUrl: string;
  }[];
  attributes: {
      name: string;
      value: string;
  }[];
  displayPrice: number;
}

const ImportProducts: React.FC<Props>= () => {
  return (
    <div>
      <h1 className='text-xl font-bold pb-4'>Import Products</h1>
      <ComboBoxResponsive/>
    </div>
  )
}

export default ImportProducts