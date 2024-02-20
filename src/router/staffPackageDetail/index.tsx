import { Button } from '@/components/ui/Button/Button';
import Slider from './components/ImagesPackageSlider';
// import Slider from '@/components/PublicComponents/Slider';

import { PackageProps, ProductProps } from './types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion/Accordion";
import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { FaCartArrowDown } from "react-icons/fa6";
import React, { useEffect, useState } from 'react'
import { getPackageById } from "./usecase";
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import selector from "./slice/selector";
import { actions } from "./slice";

interface Props { }

const PackageDetails: React.FC<Props> = () => {
  const { packageId } = useParams();
  const dispatch = useDispatch();

  const id: any = useSelector(selector.id);
  const name: any = useSelector(selector.name);
  const estimatedPrice: any = useSelector(selector.estimatedPrice);
  const discount: any = useSelector(selector.discount);
  const services: any = useSelector(selector.services);
  const productDetails: any = useSelector(selector.productDetails);
  const packageImages: any = useSelector(selector.packageImages);

  async function fetchData() {
    try {
      if (packageId) {
        const response = await getPackageById(packageId);
        if (response) {
          dispatch(actions.setPackage(response))
          // console.log(response)
          dispatch(actions.getPackageInfo());
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

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
            <Slider images={packageImages.map((item: any) => item.imageUrl)} />
          </div>
        </div>
      </div>

      <div className="lg:w-[30%] flex flex-col gap-2 pl-4 pt-20">
        <div
          className="text-black text-xl font-thin
          md:text-4xl
        "
        >
          {name}
        </div>
        <div className="font-semibold md:text-2xl flex flex-col">
          <span className="text-sm font-thin">Estimated price: </span>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "VND",
          }).format(estimatedPrice)}
        </div>
        <div className="font-semibold md:text-2xl flex flex-col">
          <span className="text-sm font-thin">Discount: </span>
          {discount}%
        </div>
        <div className="mt-2">
          <Button className="cursor-pointer w-40">Delete</Button>
        </div>
        <div className="mt-2">
          <Button variant={'yellowCustom'} className="cursor-pointer w-40">Update</Button>
        </div>
        <div className="h-auto pr-2 pb-10">
          <Accordion type="multiple">
            <AccordionItem value="item-1">
              <AccordionTrigger>Services</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2 shrink">
                  {services.map((service: any) => <p>{service.name}</p>)}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className='flex justify-center items-center'>
        <div className="flex flex-col gap-8 justify-center items-center px-2 w-[90%] rounded-md">
          <div>
            <p className="text-2xl font-thin pb-4 border-b-2 border-slate-400">Products In This Package</p>
          </div>
          <div
            className="overflow-scroll h-[1000px] grid grid-cols-1 gap-4 pt-8 
    md:grid-cols-3
    lg:grid-cols-4
    "
          >
            {productDetails.map((product: any) => (
              <>
                <Card className="w-[auto] h-[auto]">
                  <CardHeader className="w-full">
                    <div className="flex justify-center">
                      <img
                        src={product.images[0].imageUrl}
                        className="w-[288px] h-[288px] object-contain"
                        loading="lazy"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="overflow-hidden">
                    <CardTitle className="">
                      <h2 className="truncate">{product.productName}</h2>
                    </CardTitle>
                    {/* <CardDescription className="pb-2 pt-1 shrink">
                      <p className="truncate">
                        {productDescription ? (
                          productDescription
                        ) : (
                          <p className="truncate">
                            Materials:Powder-coated aluminum frame. Marine grade Sunbrella
                            fabric canopy. Protective cover included. Parasol base covers
                            will display a slight color difference compared to the pole.
                            This is in order to offer an improved resistance to
                            scratching.
                          </p>
                        )}
                      </p>
                    </CardDescription> */}
                    <CardTitle>
                      <p className="text-2xl truncate">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "VND",
                        }).format(product.displayPrice * 1000)}
                      </p>
                    </CardTitle>
                  </CardContent>
                  <CardFooter className="">
                    <div
                      className="w-10 h-10 bg-yellowCustom flex justify-center items-center rounded-full cursor-pointer hover:opacity-80"
                    >
                      <FaCartArrowDown className="text-black" />
                    </div>
                  </CardFooter>
                </Card>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PackageDetails;