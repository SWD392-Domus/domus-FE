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

interface ProductProps {
  name: string;
  description: string;
  price: number;
  src: string;
}

const ProductCard: React.FC<ProductProps> = ({
  name,
  description,
  price,
  src,
}) => {
  return (
    <div>
      <Card className="w-[auto] h-[auto]">
        <CardHeader className="w-full">
          <div className="flex justify-center">
             <img src={src} className="w-[288px] h-[288px] object-cover" loading="lazy"/>
          </div>
           
        </CardHeader>
        <CardContent className="overflow-hidden">
          <CardTitle className="">
          <h2 className="truncate">{name}</h2>

          </CardTitle>
          <CardDescription className="pb-2 shrink">
          <p className="truncate">{description}</p>

          </CardDescription>
          <CardTitle>
            <p className="text-2xl truncate">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "VND",
              }).format(price)}
            </p>
          </CardTitle>
        </CardContent>
        <CardFooter className="">
          <div
            className="w-10 h-10 bg-blue-600 flex justify-center items-center 
          rounded-full cursor-pointer hover:opacity-80"
          >
            <FaCartArrowDown className="text-white" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCard;
