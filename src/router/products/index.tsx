// import ProductCard from "@/router/products/components/ProductCard";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import ProductSkeleton from "./components/ProductSkeleton";
import ProductsPagination from "./components/ProductsPagination";
import { searchProducts } from "./usecases";
import { ProductProps } from "@/router/products/type";
// import { toast } from "@/components/ui/Toast/use-toast";
// import CategorySelection from "./components/CategorySelection";

// const cate = [
//   {
//     name: "Sap xep",
//   },
//   {
//     name: "Metrics",
//   },
//   {
//     name: "Mau",
//   },
//   {
//     name: "Loai",
//   },
//   {
//     name: "Gia",
//   },
//   {
//     name: "Kieu",
//   },
//   {
//     name: "Vat Lieu",
//   },
//   {
//     name: "Tat ca cac bo loc",
//   },
// ];

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const ProductCard = React.lazy(
    () => import("@/router/products/components/ProductCard")
  );
  const pageSize = 12;
  const [pageIndex, setPageIndex] = useState(1);

  async function getProductsService(pageSize: number, pageIndex: number) {
    const res = await searchProducts(
      pageSize,
      pageIndex,
      searchValue,
      "productName"
    );
    if (res) {
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // Prevent the default form submission behavior
      event.preventDefault();
      // Trigger the search
      setLoading(true);
      getProductsService(pageSize, pageIndex);
    }
  };
  return (
    <>
      <header className="flex justify-center">
        <div className="h-auto w-screen max-w-[1440px] px-10">
          <div
            className="flex justify-between items-center py-8 
        max-md:flex-col max-md:gap-4 max-md:items-start
        lg:px-40"
          >
            <div className="w-full md:w-[50%] lg:w-[40%]">
              <Input
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Type a command or search"
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className="flex justify-center items-center gap-4">
              <p className="font-notoSans text-sm text-gray-500">
                Found: <span className="font-bold">{totalItems}</span> products
              </p>
            </div>
          </div>

          {products.length !== 0 ? ( // Check if products array is not empty
            <>
              <div className="grid grid-cols-1 gap-4 pt-8 md:grid-cols-3 md:py-2 lg:grid-cols-4 lg:py-4 lg:px-10">
                {loading
                  ? Array(pageSize)
                      .fill(null)
                      .map((_, index) => <ProductSkeleton key={index} />)
                  : products.map((product: ProductProps) => (
                      <React.Suspense
                        key={product.id}
                        fallback={<ProductSkeleton />}
                      >
                        <ProductCard product={product} />
                      </React.Suspense>
                    ))}
              </div>
              <div className="py-20 w-full flex justify-center items-center border-gray-200">
                  <ProductsPagination
                    totalPages={totalPages}
                    pageIndex={pageIndex}
                    setPageIndex={setPageIndex}
                  />
                </div>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center ">
              <div className="h-screen w-full flex justify-center items-center">
                <p className="text-2xl font-bold text-gray-500">
                  No products found
                </p>
              </div>
            </div>
          )}
          {/* <div className="py-20 w-full flex justify-center items-center border-gray-200">
            <ProductsPagination
              totalPages={totalPages}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
            />
          </div> */}
        </div>
      </header>
    </>
  );
};

export default ProductList;
