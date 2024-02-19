// import { ProductProps } from '@/router/products/type'
import Slider from "@/components/PublicComponents/Slider";
import { ImagesProps, ProductDetailsProps } from "@/router/productDetails/type";
import React from "react";

interface DetailsProps {
  details: ProductDetailsProps;
}
const ProductPopup: React.FC<DetailsProps> = ({ details }) => {
  console.log(details);
  const images = details.images.map((image: ImagesProps) => image.imageUrl);
  return (
    <div
      className="flex flex-col gap-8 h-[100vh]
    md:h-[80vh]
    "
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-xl ">Product Details</h1>
        <span className=" text-sm text-slate-500">
          This is a detail dialog of a product.
        </span>
      </div>

      <div className="flex flex-wrap justify-between gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-2xl">{details.id}</h1>
          <div>
            Favorable Price :{" "}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "VND",
            }).format(details.displayPrice)}{" "}
          </div>
          <div>
            {details.attributes &&
              details.attributes.map((attribute) => (
                <div key={attribute.name}>
                  {attribute.name} : {attribute.value}
                </div>
              ))}
          </div>
        </div>
        <div className="w-full
        lg:w-[30%] lg:h-[30%] pr-5">
          <Slider images={images} />
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;
