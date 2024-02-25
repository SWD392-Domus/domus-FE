import React from "react";
import OneProductDetail from "./OneProductDetail";

interface Props {
  productIds: string[];
}

const ProductComponents: React.FC<Props> = (props) => {

  return (
    <div className='h-[600px] w-[600px] overflow-scroll pr-5 flex flex-col gap-4 items-center pb-5'>
      {props.productIds.map((productId) => (
        <OneProductDetail productId={productId}></OneProductDetail>
      ))}
    </div>
  );
};

export default ProductComponents;
