import OneProductDetail from "./OneProductDetail";
import React, { useState } from "react";
import { actions as actionsCart } from "@/router/customerCart/slice"
import selector from "@/router/customerCart/slice/selector"
import { useSelector, useDispatch } from "react-redux";

interface Props {
  // productIdQuans: any;
}

const ProductComponents: React.FC<Props> = (props) => {
  const [updatedS, setUpdatedS] = useState(0);
  const packageA: any = useSelector(selector.package);
  const productIdQuans = packageA.productDetails;
  return (
    <div className='h-[600px] w-[600px] overflow-scroll pr-5 flex flex-col gap-4 items-center pb-5'>
      {productIdQuans.map((productIdQuan) => (
        <OneProductDetail updatedS={updatedS} setUpdatedS={setUpdatedS} productIdQuan={productIdQuan}></OneProductDetail>
      ))}
    </div>
  );
};

export default ProductComponents;
