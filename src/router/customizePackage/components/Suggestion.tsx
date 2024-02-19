import { Input } from '@/components/ui/Input'
import { ProductProps } from '@/router/products/type';
import { getProducts } from '@/router/products/usecases';
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';

// interface ProductsProps {} 

const Suggestion: React.FC = () => {
    const [products, setProducts] = useState<ProductProps[]>([]);
    async function getProductsService(pageSize: number, pageIndex: number) {
        const res = await getProducts(pageSize, pageIndex);
        if(res){
          const productsData = res?.data;
          setProducts(productsData.items);
        }
      }

      useEffect(() => {
        getProductsService(50, 1);
      });


  return (
    <div className='flex flex-col gap-4 p-4 shrink'>
        <div className='p-4'>
            <h1 className="font-semibold text-3xl">You might also <span className='text-yellowCustom'>like</span></h1>
        </div>
        
        <div className='pt-4'>
             <Input placeholder="Type a command or search" />
        </div>
       
        <div className='h-[400px] overflow-scroll '>
            <div className='h-[40%]'>
                <ProductCard/> 
            </div>
           
        </div>
    </div>
  )
}

export default Suggestion