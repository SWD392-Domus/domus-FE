import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";
// import { productList } from "@/router/products/data";
import React from "react";

import ProductPopup from "./ProductPopup";
import { useSelector } from "react-redux";
import { productSelector } from "@/router/productDetails/slice/selector";
import { ProductDetailsProps } from "@/router/productDetails/type";

const ProductDetailsList: React.FC = () => {
  const { product } = useSelector(productSelector);
  if(!product){
    return <div>No product</div>
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
          <Sheet key={"top"}>
            <SheetTrigger asChild>
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
                  <p className="truncate text-sm font-semibold">
                    {product.id}
                  </p>
                </div>
              </div>
            </SheetTrigger>
            <SheetContent side={"top"}>
              <ProductPopup details={product}/>
            </SheetContent>
          </Sheet>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailsList;
