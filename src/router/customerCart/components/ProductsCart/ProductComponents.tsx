import React from "react";
import OneProductDetail from "./OneProductDetail";

interface Props {
  productIdQuans: any;
}

const ProductComponents: React.FC<Props> = (props) => {

  return (
    <div className='h-[600px] w-[600px] overflow-scroll pr-5 flex flex-col gap-4 items-center pb-5'>
      {props.productIdQuans.map((productIdQuan) => (
        <OneProductDetail productIdQuan={productIdQuan}></OneProductDetail>
      ))}
    </div>
  );
};

export default ProductComponents;
