import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/Resizable";
import { useSelector } from "react-redux";
import { productSelector } from "@/router/productDetails/slice/selector";


const ProductCard: React.FC= () => {
 const { product } = useSelector(productSelector);
  if (!product) {
    return (
      <div className="h-screen flex justify-center items-center text-2xl">
        Product not found
      </div>
    );
  }
  const { productName, brand, description, sizes, colors, images } = product;
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full rounded-lg border h-auto"
    >
      <ResizablePanel defaultSize={70}>
        <div className="flex flex-col items-start justify-center p-6 gap-4 shrink">
          <div className="text-3xl font-semibold">{productName}</div>
          <div className="text-xl">Description</div>
          <div className="text-slate-400">
            {description ? description : "No description available"}
          </div>
          <div className="flex gap-2">
            <div>Brand:</div>
            <div className="text-slate-400">{brand}</div>
          </div>
          <div className="flex gap-2">
            <div>Size:</div>
            {sizes
              ? sizes.map((size: string) => (
                  <div className="text-slate-400">{size}</div>
                ))
              : "No sizes available"}
          </div>
          <div className="flex justify-center items-center gap-2">
            <div>Colors:</div>
            {colors ? (
              colors.map((color: string) => (
                <div
                  key={color}
                  className={
                    color === "black" ? "bg-black p-4" : `bg-${color}-600 p-4`
                  }
                />
              ))
            ) : (
              <div>No colors available</div>
            )}
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle className="bg-white" />
      <ResizablePanel defaultSize={30}>
        <div className="flex w-full h-full items-center justify-center p-6">
          {images ? (
            <img className="object-cover" src={images[0]} />
          ) : (
            <div>No image available</div>
          )}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ProductCard;
