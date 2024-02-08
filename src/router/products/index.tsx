// import ProductCard from "@/router/products/components/ProductCard";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import ProductSkeleton from "./components/ProductSkeleton";
import ProductsPagination from "./components/ProductsPagination";
import { getProducts } from "./usecases";
import { ProductProps } from "@/router/products/type";
import CategorySelection from "./components/CategorySelection";


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


const ProductList: React.FC = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const ProductCard = React.lazy(
    () => import("@/router/products/components/ProductCard")
  );
  const pageSize = 12;
  const [pageIndex, setPageIndex] = useState(1);

  async function getProductsService(pageSize: number, pageIndex: number) {
    const res = await getProducts(pageSize, pageIndex);
    if(res){
      const productsData = res?.data;
      setLoading(false);
      setProducts(productsData.items);
      setTotalPages(productsData.lastPage);
      setTotalItems(productsData.total);
    }
  }
  useEffect(() => {
    getProductsService(pageSize, pageIndex);
  }, [pageIndex]);
  return (
    <header className="flex justify-center">
      <div className="h-auto w-screen max-w-[1440px] px-10">
        <div
          className="flex justify-between items-center py-8 
        max-md:flex-col max-md:gap-4 max-md:items-start
        lg:px-40"
        >
          <div className="w-full md:w-[50%] lg:w-[40%]">
            <Input placeholder="Type a command or search" />
          </div>

          <div className="flex justify-center items-center gap-4">
            <p className="font-notoSans text-sm text-gray-500">
              Found: <span className="font-bold">{totalItems}</span> products
            </p>
          </div>
        </div>

        <div
          className=" grid grid-cols-2 gap-4 pb-4
      md:grid-cols-4 md:gap-4 md:py-4
      lg:flex lg:items-center lg:justify-center"
        >
          {cate.map((item) => (
            <div className="w-auto">
              <CategorySelection name={item.name} />
            </div>
          ))}
        </div>

        <div
          className="grid grid-cols-1 gap-4 pt-8 
      md:grid-cols-3 md:py-2
      lg:grid-cols-4 lg:py-4 lg:px-10
      "
        >
          {loading
            ? Array(pageSize)
                .fill(null)
                .map((_, index) => <ProductSkeleton key={index} />)
            : products.map((product: ProductProps) => (
                <>
                  <React.Suspense
                    key={product.id}
                    fallback={<ProductSkeleton />}
                  >
                    <ProductCard product={product} />
                  </React.Suspense>
                </>
              ))}
        </div>
        <div className="py-20 w-full flex justify-center items-center border-gray-200">
          <ProductsPagination
            totalPages={totalPages}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
          />
        </div>
      </div>
    </header>
  );
};

export default ProductList;
