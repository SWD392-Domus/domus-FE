// import { useEffect } from "react";
import { productDetail } from "../products/data";
import TabNavigation from "./components/TabNavigation";
// import CarouselProducts from "./components/Carousel";
import { Button } from "@/components/ui/Button/Button";
import SizeToggle from "./components/SizeToggle";
import ColorToggle from "./components/ColorToggle";
import ProductAccordion from "./components/ProductAccordion";
import Suggestion from "./components/Suggestion";
import Slider from "./components/Slider";

// type RouteParams = {
//    id: string;
// };

const ProductDetails: React.FC = () => {
  // const [size, setSize] = useState("");
  // const { id } = useParams<RouteParams>();
  // const productId = parseInt(id, 10);
  // useEffect(() => {
  const product = productDetail;
  // }, [id]);
  return (
      <div className="h-[2500px] pt-20 lg:flex lg:flex-wrap">
        <div className="flex flex-col">
          <nav className="flex justify-start ml-4 my-2">
            <TabNavigation name={product.name} />
          </nav>

          <div
            className="w-auto h-auto p-10 flex justify-center items-center
      lg:justify-start lg:ml-4 lg:gap-2"
          >
            <div
              className="w-[300px] h-[300px] shrink
        md:w-[600px] md:h-[600px]
        xl:w-[700px] xl:h-[700px]"
            >
              {/* <CarouselProducts src={product.src} /> */}
              <Slider images={product.src} />
            </div>
          </div>
        </div>

        <div className="lg:w-[30%] flex flex-col justify-center gap-2 pl-4">
          <div
            className="text-gray-600 text-sm font-thin
          md:text-xl 
        "
          >
            Gloster
          </div>
          <div
            className="text-black text-xl font-thin
          md:text-4xl
        "
          >
            {product.name}
          </div>
          <div className="font-semibold md:text-2xl">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "VND",
            }).format(product.price)}
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-black font-thin">Size</div>
            <div className="flex justify-start">
              <SizeToggle />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-black font-thin">Color</div>
            <div className="flex justify-start">
              <ColorToggle />
            </div>
          </div>

          <div className="mt-10">
            <Button className="cursor-pointer">Add to package</Button>
          </div>
          <div className="h-auto pr-2">
            <ProductAccordion />
          </div>
        </div>
        <div className="flex justify-center items-center py-32">
          <div className="max-md:hidden w-screen h-[300px] ">
            <Suggestion />
          </div>
        </div>
      </div>
  );
};

export default ProductDetails;
