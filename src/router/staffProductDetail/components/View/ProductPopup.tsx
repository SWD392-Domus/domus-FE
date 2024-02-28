// import { ProductProps } from '@/router/products/type'
import { ImagesProps, ProductDetailsProps } from "@/router/productDetails/type";
import React from "react";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Label } from "@/components/ui/Label";
import { Card, CardContent } from "@/components/ui/Card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";
import { useSelector } from "react-redux";
import { productSelector } from "@/router/productDetails/slice/selector";

interface DetailsProps {
  details: ProductDetailsProps;
  index: number;
}
const ProductPopup: React.FC<DetailsProps> = ({ 
  details ,
  index
}) => {
  const images = details.images.map((image: ImagesProps) => image.imageUrl);
  const { product } = useSelector(productSelector);
  const indexRender = index + 1;
  return (
    <div className="flex justify-between gap-10">
      <DialogHeader>
        <DialogTitle>Product Details</DialogTitle>
        <DialogDescription>
          This is a detail dialog of a product.{" "}
        </DialogDescription>
        <div className="grid gap-4 py-4">
        <div className="flex items-center gap-4">
            <Label htmlFor="name" className="text-left font-bold w-auto text-2xl">
              {product?.productName} Variant {indexRender}
            </Label>
          </div>
          {/* <div className="grid grid-cols-8 items-center gap-4">
            <Label htmlFor="name" className="text-left font-bold">
              Id
            </Label>
            <h1 className="col-span-7  font-openSans text-xl">{details.id}</h1>
          </div> */}
          <div className="grid grid-cols-8 items-center gap-4">
            <Label htmlFor="username" className="font-bold text-left col-span-3">
              Favorable Price
            </Label>
            <div className="col-span-5 font-openSans">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(details.displayPrice)}{" "}
            </div>
          </div>
          {details.attributes &&
            details.attributes.map((attribute) => (
              <div className="grid grid-cols-8 items-center gap-4">
                <Label htmlFor="name" className="text-left font-bold col-span-3">
                  {attribute.name}:{" "}
                </Label>
                <span className="col-span-5 font-openSans">
                  {attribute.value}
                </span>
              </div>
            ))}
        </div>
      </DialogHeader>
      <div className="w-full flex justify-center items-center h-auto">
        {images.length > 0 && (
          <Carousel className="w-full max-w-sm">
          <CarouselContent className="-ml-1">
            {images.map((image, index) => (
              <CarouselItem key={index} className="">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <img
                        src={image}
                        className="w-full h-full object-contain"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        )}
        
      </div>
    </div>
  );
};

export default ProductPopup;
