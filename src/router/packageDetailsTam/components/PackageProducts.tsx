import ProductCard from "@/router/products/components/ProductCard";
import { ProductProps } from "@/router/products/type";
import { getProducts } from "@/router/products/usecases";
import React, { useEffect, useState } from "react";

// interface Product {
//     product: ProductProps;
//   }

const PackageProducts: React.FC = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  async function getProductsService() {
    const res = await getProducts(10, 1);
    if (res) {
      const productsData = res?.data;
      setProducts(productsData.items);
    }
  }
  useEffect(() => {
    getProductsService();
  }, []);
  return (
    <div className="flex flex-col gap-8 justify-center items-center px-2 w-[90%] rounded-md">
      <div>
        <p className="text-2xl font-thin pt-8 pb-4 border-b-2 border-slate-400">Our Products in this package</p>
      </div> 
      <div
        className="overflow-scroll h-[1000px] grid grid-cols-1 gap-4 pt-8 
    md:grid-cols-3
    lg:grid-cols-4
    "
      >
        {products.map((product: ProductProps) => (
          <>
            <ProductCard product={product} />
          </>
        ))}
      </div>
    </div>
  );
};

export default PackageProducts;
