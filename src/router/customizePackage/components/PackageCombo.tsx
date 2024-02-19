import { productList } from "@/router/products/data";
import React from "react";
import ProductComponents from "./ProductComponents";

// type Props = {}

const PackageCombo: React.FC = () => {
  const productData = productList;
  return (
    <div className="flex flex-col gap-5 justify-start shrink">
      <div className="font-semibold text-3xl p-4">Your combo</div>
      <div className="w-auto pb-8">
        <ProductComponents products={productData} />
      </div>
    </div>
  );
};

export default PackageCombo;
