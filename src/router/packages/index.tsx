// import PackageCard from "@/router/packages/components/PackageCard";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import PackageSkeleton from "./components/PackageSkeleton";
import PackagesPagination from "./components/PackagesPagination";
import { searchPackages } from "./usecases";
// import { PackageProps } from "@/router/packages/type";
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

const PackageList: React.FC = () => {
    const [packages, setPackages] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [searchValue, setSearchValue] = useState("");

    const PackageCard = React.lazy(
        () => import("@/router/packages/components/PackageCard")
    );
    const pageSize = 12;
    const [pageIndex, setPageIndex] = useState(1);

    async function getPackagesService(pageSize: number, pageIndex: number) {
        const res = await searchPackages(
            pageSize,
            pageIndex,
            searchValue,
            "name"
        );
        if (res) {
            const packagesData = res?.data;
            setLoading(false);
            setPackages(packagesData.items);
            setTotalPages(packagesData.lastPage);
            setTotalItems(packagesData.total);
            console.log(packagesData);
        }
    }
    useEffect(() => {
        getPackagesService(pageSize, pageIndex);
    }, [pageIndex]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            // Prevent the default form submission behavior
            event.preventDefault();
            // Trigger the search
            setLoading(true);
            getPackagesService(pageSize, pageIndex);
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
                                Found:{" "}
                                <span className="font-bold">{totalItems}</span>{" "}
                                packages
                            </p>
                        </div>
                    </div>

                    {packages?.length !== 0 ? ( // Check if packages array is not empty
                        <>
                            <div className="grid grid-cols-1 gap-4 pt-8 md:grid-cols-3 md:py-2 lg:grid-cols-4 lg:py-4 lg:px-10">
                                {loading
                                    ? Array(pageSize)
                                          .fill(null)
                                          .map((_, index) => (
                                              <PackageSkeleton key={index} />
                                          ))
                                    : packages?.map((packageOne: any) => (
                                          <React.Suspense
                                              key={packageOne.id}
                                              fallback={<PackageSkeleton />}
                                          >
                                              <PackageCard
                                                  packageA={packageOne}
                                              />
                                          </React.Suspense>
                                      ))}
                            </div>
                            <div className="py-20 w-full flex justify-center items-center border-gray-200">
                                <PackagesPagination
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
                                    No packages found
                                </p>
                            </div>
                        </div>
                    )}
                    {/* <div className="py-20 w-full flex justify-center items-center border-gray-200">
                        <PackagesPagination
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

export default PackageList;
