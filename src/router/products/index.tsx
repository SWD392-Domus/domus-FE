import ProductCard from "@/router/products/components/ProductCard";
import React from "react";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { FaChevronDown } from "react-icons/fa6";
import ProductSkeleton from "./components/ProductSkeleton";

// const products = [
//     {
//       src: "https://image.fritzhansen.com/~/media/7B0950DE4DC2462F9A9778BF6119C0F4.ashx",
//       name: "Product 1",
//       description: "product 123 jkhldsa",
//       price: 100000
//     },
//   ];

const cate = [
  {
    name: "Sap xep",
  },
  {
    name: "Metrics",
  },
  {
    name: "Mau",
  },
  {
    name: "Loai",
  },
  {
    name: "Gia",
  },
  {
    name: "Kieu",
  },
  {
    name: "Vat Lieu",
  },
  {
    name: "Tat ca cac bo loc",
  },
];

const products = Array.from({ length: 9 }, (_, index) => ({
  src: `https://govi.vn/wp-content/uploads/2022/01/1-PA-201A.jpg`,
  name: `Product abdcjfdiajf ${index + 1}`,
  description: `This is product This is produnProduct abdcjfdiajfProduct abdcjfdiajfProduct abdcjfdiajfProduct abdcjfdiajfProduct abdcjfdiajf${
    index + 1
  }`,
  price: (index + 1) * 1000000000,
}));

const ProductList: React.FC = () => {
  return (
    <header className="flex justify-center">
      <div className="h-auto w-screen max-w-[1440px] px-10">
        <div className="flex justify-between items-center py-8">
          <div className="w-full md:w-[50%] lg:w-[40%]">
            <Input placeholder="Type a command or search" />
          </div>
          <div className="flex justify-center items-center gap-4">
            <div className="flex justify-center items-center">
              <p className="font-notoSans hidden">tim thay:</p>
            </div>
          </div>
        </div>

        <div
          className=" grid grid-cols-2 gap-4 pb-4
      md:grid-cols-4 md:gap-4 md:py-2
      lg:flex lg:items-center "
        >
          {cate.map((item, index) => (
            <div className="w-auto">
              <Badge key={index} variant={"gray"} className="flex gap-2">
                {item.name}
                <FaChevronDown />
              </Badge>
            </div>
          ))}
        </div>

        <div
          className="grid grid-cols-1 gap-4 pt-8
      md:grid-cols-3 md:py-2
      lg:grid-cols-4 lg:py-4 
      "
        >
          {products.map((product, index) => (
            <ProductCard
              key={index}
              src={product.src}
              name={product.name}
              description={product.description}
              price={product.price}
            />
          ))}
        </div>
        <div className="mb-5"></div>
      </div>
    </header>
  );
};

export default ProductList;
