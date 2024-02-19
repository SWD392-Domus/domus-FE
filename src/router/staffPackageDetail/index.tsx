import { Button } from '@/components/ui/Button/Button';
import React from 'react'
import PackageAccordion from './components/PackageAccordion';
import Slider from '@/components/PublicComponents/Slider';
import { productDetail } from '../products/data';
import PackageProducts from './components/PackageProducts';

interface Props { }

const PackageDetails: React.FC<Props> = () => {
  const product = productDetail;

  return (
    <div className="h-auto lg:flex lg:flex-wrap xl:justify-center ">
      <div className="flex flex-col">
        <div
          className="w-auto h-auto p-10 flex justify-center items-center
      lg:justify-start lg:ml-4 lg:gap-2"
        >
          <div
            className="w-[300px] h-[300px] shrink 
        md:w-[600px] md:h-[600px]
        xl:w-[700px] xl:h-[700px]"
          >
            <Slider images={product.src} />
            {/* <Slider images={productDetails.images.imageURL} /> */}
          </div>
        </div>
      </div>

      <div className="lg:w-[30%] flex flex-col gap-2 pl-4 pt-20">
        <div
          className="text-black text-xl font-thin
          md:text-4xl
        "
        >
          Square Cantilever Parasol
        </div>
        <div className="font-semibold md:text-2xl flex flex-col">
          <span className="text-sm font-thin">Estimated price: </span>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "VND",
          }).format(100000)}
        </div>
        <div className="mt-2">
          <Button className="cursor-pointer w-40">Delete</Button>
        </div>
        <div className="mt-2">
          <Button variant={'yellowCustom'} className="cursor-pointer w-40">Update</Button>
        </div>
        <div className="h-auto pr-2 pb-10">
          <PackageAccordion />
        </div>
      </div>
      <div className='flex justify-center items-center'>
        <PackageProducts />
      </div>

    </div>
  )
}

export default PackageDetails;