import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";
// import { productList } from "@/router/products/data";
import React from "react";
import { FaPlus } from "react-icons/fa";

// import ProductPopup from "../View/ProductPopup";
import { useDispatch, useSelector } from "react-redux";
import { ProductDetailsProps } from "@/router/productDetails/type";
import EditPopup from "./EditPopup";
import { Label } from "@/components/ui/Label";
import CreateDetailsPopup from "./CreateDetails";
import { IoIosRemoveCircle } from "react-icons/io";
import { toast } from "@/components/ui/Toast/use-toast";
import { deleteDetails } from "../../usecase/deleteDetails";
import {
  deleteOneDetail,
} from "@/router/productDetails/slice";
import { productSelector } from "@/router/productDetails/slice/selector";
// import { editModeSelector } from "../../slice/selector";
// import { ProductDetailsPropsForCreate } from "@/router/staffCreateProduct/type";

// interface EditProductDetailsListProps {
//   product: SingleProductProps;
//   setProduct: (product: SingleProductProps) => void;
// }

const EditProductDetailsList: React.FC = () => {
  const { product } = useSelector(productSelector);
  const dispatch = useDispatch();
  //  const { isEditMode } = useSelector(editModeSelector);
  // const [details, setDetails] = React.useState<ProductDetailsProps[]>([]);
  if (!product) {
    return <div>No product</div>;
  }
  const handleDeleteDetails = async (id: string) => {
    const res = await deleteDetails(id);
    if (res) {
      dispatch(deleteOneDetail(id));
      // setProduct({...product, details: product.details?.filter(detail => detail.id !== id)})
      toast({
        variant: "success",
        title: "Delete successfully",
        description: "Delete successfully.",
      });
    }
  };
  const { details } = product;
  if (!details) {
    return <div>No details</div>;
  }
  return (
    <>
      <div>
        <Label>Product Details</Label>
      </div>
      <div
        className="pt-2 ring-1 ring-border h-[250px] overflow-scroll
    md:h-[320px]
    "
      >
        <div className="flex flex-wrap gap-2 p-2 justify-start items-center">
          {details.map((product: ProductDetailsProps) => (
            <div className="flex w-[1/4] justify-start" key={product.id}>
              {product.images && product.images.length > 0 ? (
                <Sheet key={"top"}>
                  <SheetTrigger asChild>
                    <div
                      className="w-full h-[60%] flex flex-col justify-center items-center gap-2 cursor-pointer py-2
                md:w-[40%] md:h-[40%] hover:bg-slate-100 rounded-full"
                    >
                      <div className="w-[70%]">
                        <img
                          src={product.images[0].imageUrl}
                          className="w-[100px] h-[100px] object-contain"
                        />
                      </div>
                      <div className="w-full flex justify-center items-center">
                        <p className="truncate text-sm font-semibold">
                          {product.id}
                        </p>
                      </div>
                    </div>
                  </SheetTrigger>
                  <SheetContent side={"top"}>
                    <EditPopup details={product} />
                  </SheetContent>
                </Sheet>
              ) : (
                <div className="w-[40%] h-[30%] flex justify-center items-center gap-2 cursor-pointer md:w-[20%] md:h-[20%] hover:bg-slate-100 rounded-md border border-black shrink px-12 py-16">
                  <p className="text-2xl">New details</p>
                </div>
              )}

              <div className="">
                <IoIosRemoveCircle
                  onClick={() => handleDeleteDetails(product.id)}
                  className="mt-2 text-2xl text-red-500 cursor-pointer"
                />
              </div>
            </div>
          ))}

          <Sheet key={"top"}>
            <SheetTrigger asChild>
              <div
                className="w-[40%] h-[30%] flex justify-center items-center gap-2 cursor-pointer
              md:w-[20%] md:h-[20%] hover:bg-slate-100 rounded-md border border-black shrink px-12 py-16"
              >
                <FaPlus className="shrink-0 text-2xl" />
              </div>
            </SheetTrigger>
            <SheetContent side={"top"}>
              <CreateDetailsPopup />
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="text-slate-500 text-xs">This is product details</div>
    </>
  );
};

export default EditProductDetailsList;
