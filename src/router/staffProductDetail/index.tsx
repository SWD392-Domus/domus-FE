import React, { useEffect } from "react";
import ProductCard from "./components/View/ProductCard";
import { useParams } from "react-router-dom";
import { getProductDetails } from "@/router/productDetails/usecases";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../productDetails/slice";
import EditProduct from "./components/Edit/EditProduct";
import ProductDetailsSection from "./components/View/ProductDetailsSection";
import { editModeSelector } from "./slice/selector";
import { changeMode, changeToFalse } from "./slice";
import { setProductCopy } from "./slice2";
import { Button } from "@/components/ui/Button/Button";
import { toast } from "@/components/ui/Toast/use-toast";
import { editProduct } from "./usecase/editProduct";
import { productSelector } from "../productDetails/slice/selector";
// import { productSelector } from "../productDetails/slice/selector";
// import { productCopySelector } from "./slice2/selector";

type RouteParams = {
  id: string;
};

const ProductDetailsStaff: React.FC = () => {
  const { id } = useParams<RouteParams>();
  // const [isEditMode, setIsEditMode] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeToFalse());
  }, []);
  const { isEditMode } = useSelector(editModeSelector);

  const { product } = useSelector(productSelector);
  // const { productCopy } = useSelector(productCopySelector);
  // console.log(product);
  // console.log(productCopy);

  const handleSave = async () => {
    const res = await editProduct(id!, product);
    if (res) {
      dispatch(changeMode());
      toast({
        variant: "success",
        title: "Update successfully",
        description: "Update successfully.",
      });
      }
      else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Update failed.",
        });
      }
    }
  
  const toggleEditMode = () => {
    dispatch(changeMode()); // Toggle edit mode
  };
  const getProductDetailsData = async () => {
    if (id) {
      const res = await getProductDetails(id);
      if (res) {
        dispatch(setProduct(res));
        dispatch(setProductCopy(res));
      }
    }
  };

  useEffect(() => {
    getProductDetailsData();
  }, [id]);
  // Call the API when isEditMode becomes false
  useEffect(() => {
    if (!isEditMode) {
      getProductDetailsData();
    }
  }, [isEditMode]);
  return (
    <div className="pt-2">
      <div className="flex flex-col pb-4">
        <h1 className="text-xl font-bold">Product details</h1>
        <span className="text-sm font-bold text-slate-500">
          All of information of a product
        </span>
      </div>
      <div className="flex justify-end pr-10">
        {isEditMode ? (
          <div className="flex gap-2">
            <Button onClick={toggleEditMode}>Cancel</Button>
            <Button variant={"green"} onClick={handleSave}>Save</Button>
          </div>
        ) : (
          <Button onClick={toggleEditMode}>Edit</Button>
        )}{" "}
        {/* Button to toggle edit mode */}
      </div>

      {isEditMode ? (
        <>
          <div className="flex p-10 h-auto">
            <EditProduct />
          </div>
        </>
      ) : (
        <>
          <div className="flex p-10 h-auto">
            <ProductCard />
          </div>
          <div className="flex p-10">
            <ProductDetailsSection />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetailsStaff;
