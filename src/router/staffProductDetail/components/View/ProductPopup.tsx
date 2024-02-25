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

interface DetailsProps {
  details: ProductDetailsProps;
}
const ProductPopup: React.FC<DetailsProps> = ({ details }) => {
  console.log(details);
  const images = details.images.map((image: ImagesProps) => image.imageUrl);
  return (
    <>
      <DialogHeader>
        <DialogTitle>Product Details</DialogTitle>
        <DialogDescription>
          This is a detail dialog of a product.{" "}
        </DialogDescription>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-8 items-center gap-4">
            <Label htmlFor="name" className="text-left font-bold">
              Id
            </Label>
            <h1 className="col-span-7  font-openSans text-xl">{details.id}</h1>
          </div>
          <div className="grid grid-cols-8 items-center gap-4">
            <Label htmlFor="username" className="font-bold text-left">
              Favorable Price
            </Label>
            <div className="col-span-7 font-openSans">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(details.displayPrice)}{" "}
            </div>
          </div>
          {details.attributes &&
            details.attributes.map((attribute) => (
              <div className="grid grid-cols-8 items-center gap-4">
                <Label htmlFor="name" className="text-left font-bold">
                  {attribute.name}:{" "}
                </Label>
                <span className="col-span-7 font-openSans">
                  {attribute.value}
                </span>
              </div>
            ))}
        </div>
      </DialogHeader>
      <div className="w-full flex justify-center items-center h-auto">
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
      </div>
    </>
  );
};

export default ProductPopup;
