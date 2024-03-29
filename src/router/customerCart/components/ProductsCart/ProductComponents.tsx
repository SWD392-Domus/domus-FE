import OneProductDetail from "./OneProductDetail";
import React, { useState } from "react";

interface Props {
  productIdQuans: any;
}

const ProductComponents: React.FC<Props> = (props) => {
  const [updatedS, setUpdatedS] = useState(0);
  return (
    <div className='h-[600px] w-[600px] overflow-scroll pr-5 flex flex-col gap-4 items-center pb-5'>
      {props.productIdQuans.map((productIdQuan) => (
        <OneProductDetail updatedS={updatedS} setUpdatedS={setUpdatedS} productIdQuan={productIdQuan}></OneProductDetail>
      ))}
    </div>
  );
};

export default ProductComponents;
