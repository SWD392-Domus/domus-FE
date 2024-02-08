import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/Card";
  
  import React from "react";
  import { Link } from "react-router-dom";
  
  interface ProductProps {
    id: number,
    name: string;
    description: string;
    src: string;
  }
  
  const ProductCard: React.FC<ProductProps> = ({
    id,
    name,
    description,
    src,
  }) => {
    return (
      <Link to={`/product/${id}`}>
        <Card className="w-[auto] h-[auto]">
          <CardHeader className="w-full">
            <div className="flex justify-center">
               <img src={src} className="w-[200px] h-[200px] object-cover" loading="lazy"/>
            </div>
             
          </CardHeader>
          <CardContent className="overflow-hidden">
            <CardTitle className="">
            <h2 className="truncate">{name}</h2>
  
            </CardTitle>
            <CardDescription className="pb-2 shrink">
            <p className="truncate">{description}</p>
  
            </CardDescription>
          </CardContent>
        </Card>
      </Link>
    );
  };
  
  export default ProductCard;
  