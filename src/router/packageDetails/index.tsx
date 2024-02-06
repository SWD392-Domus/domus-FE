import { Button } from '@/components/ui/Button/Button';
import React from 'react'
import PackageAccordion from './components/PackageAccordion';
import TabNavigation from './components/TabNavigation';
import Slider from '@/components/PublicComponents/Slider';
import { productDetail } from '../products/data';
import Suggestion from '../productDetails/components/Suggestion';

interface Props {}

const PackageDetails: React.FC<Props> = () => {
  const product = productDetail;

  return (
    <div className="h-[2500px] pt-20 lg:flex lg:flex-wrap">
        <div className="flex flex-col">
          <nav className="flex justify-start ml-4 my-2">
            <TabNavigation name="Square Cantilever Parasol" />
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

          <div className="mt-10">
            <Button className="cursor-pointer">Add to package</Button>
          </div>
          <div className="h-auto pr-2">
            <PackageAccordion />
          </div>
        </div>
        <div className="flex justify-center items-center py-32">
          <div className="max-md:hidden w-screen h-[300px] ">
            <Suggestion />
          </div>
        </div>
      </div>
  )
}

export default PackageDetails;