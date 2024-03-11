import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { PiArmchair } from "react-icons/pi";

import { RecentImport } from "./components/RecentsImport";
import ImportProducts from "./components/ImportProducts";
import { getStorage } from "./usecase";
import { ProductsStorage } from "./types/type";
import { toast } from "@/components/ui/Toast/use-toast";
import { columns } from "./components/Table/column";
import { DataTable } from "./components/Table/data-table";
import StoragePagination from "./components/StoragePagination";

interface Props {
  // define your props here
}

const Storage: React.FC<Props> = (props) => {
  const [PageSize, setPageSize] = useState(10);
  const [PageIndex, setPageIndex] = useState(1);
  const [products, setProducts] = useState<ProductsStorage[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchField, setSearchField] = useState("productName");
  const [searchValue, setSearchValue] = useState("");
  const [sortField, setSortField] = useState("");
  const [descending, setDescending] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [sortedProducts, setSortedProducts] = useState(false);
  const fetchProductsDataInStorage = async () => {
    try {
      const res = await getStorage(PageSize, PageIndex, searchField, searchValue, sortField, descending);
      const response = res.data;
      if (response.isSuccess) {
        setProducts(response.data.items);
        setTotalItems(response.data.total);
        setTotalPages(response.data.lastPage);
        // const sortedProducts = response.data.items.map((product) => ({
        //   ...product,
        //   prices: product.prices.sort(
        //     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        //   ),
        // }));
        // setSortedProducts(sortedProducts);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
      });
    }
  };
  // if (sortedProducts) {
  //   console.log(sortedProducts);
  // }
  useEffect(() => {
    fetchProductsDataInStorage();
  }, [PageSize, PageIndex, totalPages, totalItems, searchValue, sortedProducts, descending]);
  return (
    <>
      <div className="flex-col md:flex">
        {/* <div className="border-b">
                    <div className="flex h-16 items-center px-4">
                        <TeamSwitcher />
                        <MainNav className="mx-6" />
                        <div className="ml-auto flex items-center space-x-4">
                            <Search />
                            <UserNav />
                        </div>
                    </div>
                </div> */}
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Storage</h2>
            {/* <div className="flex items-center space-x-2">
                            <CalendarDateRangePicker />
                            <Button>Download</Button>
                        </div> */}
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="import">Import Products</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Products
                    </CardTitle>
                    <PiArmchair className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+90</div>
                    <p className="text-xs text-muted-foreground">
                      With {totalItems} variants
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Import Cost
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$2350</div>
                    <p className="text-xs text-muted-foreground">
                      +180.1% from last month
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="flex flex-col gap-4 ">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <div className="flex flex-col gap-4">
                      <DataTable 
                      columns={columns} 
                      data={products} 
                      setSearchValue={setSearchValue} 
                      setDescending={setDescending}
                      setSortField={setSortField}
                      />
                      <div className="flex justify-end">
                        <StoragePagination
                          totalPages={totalPages}
                          totalItems={totalItems}
                          pageIndex={PageIndex}
                          setPageIndex={setPageIndex}
                          pageSize={PageSize}
                          setPageSize={setPageSize}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Recent Import Products</CardTitle>
                    <CardDescription>
                      You made 265 imports this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentImport />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="import">
              <ImportProducts />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Storage;
