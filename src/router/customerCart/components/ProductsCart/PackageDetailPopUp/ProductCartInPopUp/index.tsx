// import { productList } from "@/router/products/data";
import React from "react";
import ProductComponents from "./ProductComponents";
// import { actions as actionsCart } from "@/router/customerCart/slice"
// import selector from "@/router/customerCart/slice/selector"
// import { useSelector, useDispatch } from "react-redux";

const ProductCartInPopUp: React.FC = () => {

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="font-semibold text-3xl py-4">Products</div>
        <ProductComponents />
      </div>
    </>
  );
};

export default ProductCartInPopUp;
