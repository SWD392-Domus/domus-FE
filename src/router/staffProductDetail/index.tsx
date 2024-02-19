import React, { useEffect } from "react";
import ProductCard from "./components/ProductCard";
import { useParams } from "react-router-dom";
import { getProductDetails } from "@/router/productDetails/usecases";
import { useDispatch, useSelector } from "react-redux";
import { productSelector } from "../productDetails/slice/selector";
import { setProduct } from "../productDetails/slice";
import EditProduct from "./components/EditProduct";
import ProductDetailsSection from "./components/ProductDetailsSection";
import { editModeSelector } from "./slice/selector";
import { changeMode } from "./slice";
type RouteParams = {
  id: string;
};

const ProductDetailsStaff: React.FC = () => {
  const { id } = useParams<RouteParams>();
  // const [isEditMode, setIsEditMode] = useState(false);
  const dispatch = useDispatch();
  const { isEditMode } = useSelector(editModeSelector);
  const { product } = useSelector(productSelector);

  const toggleEditMode = () => {
    dispatch(changeMode()); // Toggle edit mode
  };

  const getProductDetailsData = async () => {
    if (id) {
      const res = await getProductDetails(id);
      if (res) {
        dispatch(setProduct(res));
      }
    }
  };

  if (product) {
    console.log(product);
    console.log(isEditMode);
  }
  useEffect(() => {
    getProductDetailsData();
  }, [id]);
  return (
    <div className="pt-2">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold">Product details</h1>
        <span className="text-sm font-bold text-slate-500">new Quotation</span>
        <button onClick={toggleEditMode}>
          {isEditMode ? "Cancel" : "Edit"} {/* Button to toggle edit mode */}
        </button>
      </div>
      {isEditMode ? (
        <>
          <div className="flex p-10 h-auto">
            <EditProduct />
          </div>
          <div className="flex p-10">
            <ProductDetailsSection />
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
