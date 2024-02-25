import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
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
// import { deleteDetails } from "../../usecase/deleteDetails";
import { deleteOneDetail } from "@/router/productDetails/slice";
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
  const handleDeleteDetails = (id: string) => {
    dispatch(deleteOneDetail(id));
    // setProduct({...product, details: product.details?.filter(detail => detail.id !== id)})
    toast({
      variant: "success",
      title: "Delete successfully",
      description: "Delete successfully.",
    });
  };

  const { productName, details } = product;
  if (!details) {
    return <div>No details</div>;
  }
  return (
    <>
      <div>
        <Label>Product Details</Label>
      </div>
      <div
        className="pt-2 ring-1 ring-border h-[250px] overflow-scroll w-full grid grid-cols-3 
    md:h-[320px]
    "
      >
        {details.map((product: ProductDetailsProps, index: number) => (
          <div className="" key={product.id}>
            {product.images && product.images.length > 0 ? (
              <Dialog key={"top"}>
                <DialogTrigger asChild>
                  <div className="flex flex-wrap">
                      <div className="w-[50%] flex flex-col gap-2 pl-2 pt-2">
                        <img
                          src={product.images[0].imageUrl}
                          className="w-[100px] h-[100px] object-contain"
                        />
                        <div className="w-full flex justify-center items-center">
                          <p className="truncate text-sm font-semibold">
                            {productName} Variants {index + 1}.{" "}
                          </p>
                        </div>
                      </div>
                      <div className="w-[10%]">
                        <IoIosRemoveCircle
                          onClick={() => handleDeleteDetails(product.id)}
                          className="mt-2 text-2xl text-red-500 cursor-pointer"
                        />
                      </div>
                  </div>
                </DialogTrigger>

                <DialogContent>
                  <EditPopup
                    productName={productName}
                    details={product}
                    index={index + 1}
                  />
                </DialogContent>
              </Dialog>
            ) : (
              <Dialog key={"top"}>
                <DialogTrigger asChild>
                  <div className="flex h-[20%] gap-2">
                    <div className="w-[70%] h-[30%] flex justify-center items-center gap-2 cursor-pointer md:w-[20%] md:h-[20%] hover:bg-slate-100 rounded-md border border-black shrink px-12 py-16">
                      <p className="text-xl">New variants</p>
                    </div>
                    <div className="w-[10%]">
                      <IoIosRemoveCircle
                        onClick={() => handleDeleteDetails(product.id)}
                        className="mt-2 text-2xl text-red-500 cursor-pointer"
                      />
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <EditPopup
                    productName={productName}
                    details={product}
                    index={index + 1}
                  />
                </DialogContent>
              </Dialog>
            )}

            {/* <div className="">
              <IoIosRemoveCircle
                onClick={() => handleDeleteDetails(product.id)}
                className="mt-2 text-2xl text-red-500 cursor-pointer"
              />
            </div> */}
          </div>
        ))}

        <Dialog key={"top"}>
          <DialogTrigger asChild>
            <div
              className="w-[40%] h-[30%] flex justify-center items-center gap-2 cursor-pointer
              md:w-[20%] md:h-[20%] hover:bg-slate-100 rounded-md border border-black shrink px-12 py-16"
            >
              <FaPlus className="shrink-0 text-2xl" />
            </div>
          </DialogTrigger>
          <DialogContent>
            <CreateDetailsPopup />
          </DialogContent>
        </Dialog>
      </div>
      <div className="text-slate-500 text-xs">This is product details</div>
    </>
  );
};

export default EditProductDetailsList;
