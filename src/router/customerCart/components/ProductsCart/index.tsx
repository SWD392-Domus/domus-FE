import { productList } from "@/router/products/data";
import React from "react";
import ProductComponents from "./ProductComponents";

const Cart: React.FC = () => {
  const productData = productList;
  return (
    <div className="flex flex-col gap-5">
      <div className="font-semibold text-3xl p-4">Cart</div>
      <ProductComponents products={productData} />
    </div>
  );
};

export default Cart;
