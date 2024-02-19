import TabNavigation from "./components/TabNavigation";
import { Button } from "@/components/ui/Button/Button";
import SizeToggle from "./components/SizeToggle";
import ColorToggle from "./components/ColorToggle";
import ProductAccordion from "./components/ProductAccordion";
import Suggestion from "./components/Suggestion";
import Slider from "@/components/PublicComponents/Slider";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductDetails } from "./usecases/getProductDetails";
import Loading from "@/components/PublicComponents/Loading";
import { useDispatch, useSelector } from "react-redux";
import { productSelector } from "./slice/selector";
import { setProduct } from "./slice";

type RouteParams = {
  id: string;
};

const ProductDetails: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { product } = useSelector(productSelector);

  useEffect(() => {
    const getProductDetailsData = async () => {
      if (id) {
        const res = await getProductDetails(id);
        if (res) {
          setIsLoading(false);
          dispatch(setProduct(res));}
      }
    };

    getProductDetailsData();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  if (!product) {
    return (
      <div className="h-screen flex justify-center items-center text-2xl">
        Product not found
      </div>
    );
  }

  const { productName, brand, description, details, sizes, colors, images, material } = product;

  const price = details && details.length > 0 ? details[0].displayPrice : 0;

  return (
    <div className="">
      <div className="h-auto pt-20 lg:flex lg:flex-wrap xl:justify-center ">
        <div className="flex flex-col">
          <nav className="flex justify-start ml-4 my-2">
            <TabNavigation name={productName} />
          </nav>

          <div
            className="w-auto h-auto p-10 flex justify-center items-center py-20
      lg:justify-start lg:ml-4 lg:gap-2"
          >
            <div
              className="w-[300px] h-[300px] shrink 
        md:w-[600px] md:h-[600px]
        xl:w-[700px] xl:h-[700px]"
            >
              <Slider images={images} />
              {/* <Slider images={productDetails.images.imageURL} /> */}
            </div>
          </div>
        </div>

        <div className="lg:w-[30%] flex flex-col gap-2 pl-4 pt-20">
          <div
            className="text-gray-600 text-sm font-thin
          md:text-xl 
        "
          >
            {brand}
          </div>
          <div
            className="text-black text-xl font-thin
          md:text-4xl
        "
          >
            {productName}
          </div>
          <div className="font-semibold md:text-2xl flex flex-col">
            <span className="text-sm font-thin">Estimated price: </span>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "VND",
            }).format(price)}
          </div>
          {material && material.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="text-black font-thin">Material</div>
              <div className="flex justify-start">
                <SizeToggle sizes={material} />
              </div>
            </div>
          )}
          {colors && colors.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="text-black font-thin">Color</div>
              <div className="flex justify-start">
                <ColorToggle colors={colors}/>
              </div>
            </div>
          )}
          {sizes && sizes.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="text-black font-thin">Size</div>
              <div className="flex justify-start">
                <SizeToggle sizes={sizes} />
              </div>
            </div>
          )}
          <div className="mt-10">
            <Button className="cursor-pointer">Request quotation</Button>
          </div>
          <div className="h-auto pr-2">
            <ProductAccordion sizes={sizes} title={description} />
          </div>
        </div>
        <div className="flex justify-center items-center py-20">
          <div className="max-md:hidden w-screen h-[300px] ">
            <Suggestion />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
