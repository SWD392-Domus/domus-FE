import React, { useState, useEffect } from "react";
import QuantityInput from "./QuantityInput.tsx";
import { TooltipDes } from '../Tooltip/index.tsx';

interface Products {
  products: ProductProps[];
}
interface ProductProps {
  id: string;
  name: string;
  description: string;
  price: number;
  src: string;
}

const ProductComponents: React.FC<Products> = ({ products }) => {
  const [productList, setProductList] = useState<ProductProps[]>([]);

  useEffect(() => {
    setProductList(products);
  }, [products]);

  if (productList) console.log(productList)

  const handleRemoveProduct = (productId: string) => {
    setProductList((prevList) => prevList.filter((product) => product.id !== productId));
  };



  return (
    <div className='h-[600px] w-[600px] overflow-scroll pr-5 flex flex-col gap-4 items-center pb-5'>
      {productList.map((product, index) => (
        <div className="flex gap-5 items-center" key={index}>
          <div className="w-[150px]">
            <img src={product.src} className="" alt={product.name} />
          </div>
          <div className="w-[400px] flex flex-col justify-between">
            <h1 className="font-semibold text-lg">{product.name}</h1>
            <TooltipDes description="a"></TooltipDes>
            <div className="flex justify-between items-center">
              <h1 className="font-semibold">{new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "VND",
              }).format(product.price)}</h1>
              <div className="flex justify-end items-center gap-4">
                <div className="hover:bg-slate-50 p-2 rounded-lg" onClick={() => handleRemoveProduct(product.id)}>Remove</div>
                <QuantityInput
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductComponents;
