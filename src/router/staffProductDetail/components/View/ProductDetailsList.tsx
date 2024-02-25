// import { productList } from "@/router/products/data";
import React from "react";

import ProductPopup from "./ProductPopup";
import { useSelector } from "react-redux";
import { productSelector } from "@/router/productDetails/slice/selector";
import { ProductDetailsProps } from "@/router/productDetails/type";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/Dialog";

const ProductDetailsList: React.FC = () => {
  const { product } = useSelector(productSelector);
  if (!product) {
    return <div>No product</div>;
  }
  const { details } = product;
  if (!details) {
    return <div>No details</div>;
  }
  return (
    <div
      className="pt-2 ring-1 ring-border h-[250px] overflow-scroll
    md:h-[320px]
    "
    >
      <div className="flex flex-wrap gap-2 p-2 justify-start items-center">
        {details.map((product: ProductDetailsProps) => (
          <Dialog key={"top"}>
            <DialogTrigger asChild>
              <div
                className="w-[40%] h-[30%] flex flex-col justify-center items-center gap-2 cursor-pointer py-2
                md:w-[20%] md:h-[20%] hover:bg-slate-100 rounded-full"
              >
                <div className="w-[50%]">
                  {product.images && product.images[0] && (
                    <img
                      src={product.images[0].imageUrl}
                      className="w-[100px] h-[100px] object-contain"
                    />
                  )}
                </div>
                <div className="w-full flex justify-center items-center">
                  <p className="truncate text-sm font-semibold">{product.id}</p>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[70%]" >
              <ProductPopup details={product} />
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailsList;
