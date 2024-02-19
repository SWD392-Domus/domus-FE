import React, { useState } from "react";

import { useSelector } from "react-redux";
import { productSelector } from "@/router/productDetails/slice/selector";
import ProductDetailsSection from "./ProductDetailsSection";

const EditProduct: React.FC = () => {
  const [name, setName] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [brandInput, setBrandInput] = useState("");
  const { product } = useSelector(productSelector);
  
  if (!product) {
    return (
      <div className="h-screen flex justify-center items-center text-2xl">
        Product not found
      </div>
    );
  }
  const { productName, brand, description } = product;
  return (
    <>
      <div className="w-full rounded-lg border h-auto">
        <div className="flex flex-col items-start justify-center p-6 gap-4 shrink">
          <input
            onChange={(e) => setName(e.target.value)}
            className="text-3xl font-semibold"
            placeholder={productName ? productName : "No name yet"}
          />
          <div className="text-xl">Description</div>
          <div className="text-slate-400">
            <input
              onChange={(e) => setDescriptionInput(e.target.value)}
              placeholder={description ? description : "No description yet"}
            />
          </div>
          <div className="flex gap-2">
            <div>Brand:</div>
            <input
              onChange={(e) => setDescriptionInput(e.target.value)}
              placeholder={brand ? brand : "No brand yet"}
              className="text-black"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
