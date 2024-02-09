import React from "react";
import ProductCard from "./components/ProductCard";
import ProductDetailsCard from "./components/ProductDetailsCard";


const ProductDetailsStaff: React.FC = () => {
  return (
    <div className="pt-2">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold">Product creation</h1>
        <span className="text-sm font-bold text-slate-500">new Quotation</span>
      </div>
      <div className="flex p-10">
        <ProductCard/>
      </div>
      <div className="flex p-10">
        <ProductDetailsCard/>
      </div>
    </div>
  );
};

export default ProductDetailsStaff;
