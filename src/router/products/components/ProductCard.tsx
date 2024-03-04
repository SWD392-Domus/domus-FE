import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { FaCartArrowDown } from "react-icons/fa6";

import React from "react";
import { Link } from "react-router-dom";
import { ProductProps } from "@/router/products/type";

interface Product {
  product: ProductProps;
}

const ProductCard: React.FC<Product> = ({ product }) => {
  const productImage = product.details[0]?.images[0]?.imageUrl;
  const productId = product?.id;
  const productName = product?.productName;
  // const productPrice = product?.details[0]?.displayPrice * 1000;
  const productDescription = product?.description;
  return (
    <Link to={`/product/${productId}`}>
      <Card className="w-[auto] h-[auto]">
        <CardHeader className="w-full">
          <div className="flex justify-center">
            <img
              src={productImage}
              className="w-[288px] h-[288px] object-contain"
              loading="lazy"
            />
          </div>
        </CardHeader>
        <CardContent className="overflow-hidden">
          <CardTitle className="">
            <h2 className="truncate">{productName}</h2>
          </CardTitle>
          <CardDescription className="pb-2 pt-1 shrink">
            <p className="truncate">
              {productDescription ? (
                productDescription
              ) : (
                <p className="truncate">
                  Materials:Powder-coated aluminum frame. Marine grade Sunbrella
                  fabric canopy. Protective cover included. Parasol base covers
                  will display a slight color difference compared to the pole.
                  This is in order to offer an improved resistance to
                  scratching.
                </p>
              )}
            </p>
          </CardDescription>
          {/* <CardTitle>
            <p className="text-2xl truncate">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "VND",
              }).format(productPrice)}
            </p>
          </CardTitle> */}
        </CardContent>
        <CardFooter className="">
          <div
            className="w-10 h-10 bg-yellowCustom flex justify-center items-center 
          rounded-full cursor-pointer hover:opacity-80"
          >
            <FaCartArrowDown className="text-black" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
