import { productList } from "@/router/products/data";
import React from "react";
import ProductComponents from "./ProductComponents";

interface ProductProps {
  id: string;
  name: string;
  description: string;
  price: number;
  src: string;
}

const PackageCombo: React.FC = () => {
  const productData = productList;
  return (
    <div className="flex flex-col gap-5">
      <div className="font-semibold text-3xl p-4">Cart</div>
      <ProductComponents products={productData} />
    </div>
  );
};

export default PackageCombo;
