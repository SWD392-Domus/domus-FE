import { RequestQuotationButton } from './components/Button/RequestQuotationButton';
import { CustomizePackageButton } from './components/Button/CustomizePackageButton';
import Slider from './components/ImagesPackageSlider';
import { ProductDetailProps, PackageImageProps, ServiceProps } from './types';
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
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
// import { FaCartArrowDown } from "react-icons/fa6";
import React, { useEffect, useState } from 'react'
import { getPackageById } from "./usecase";
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import selector from "./slice/selector";
import { actions } from "./slice";
// import { useNavigate, useLocation } from "react-router-dom"
import HTMLReactParser from 'html-react-parser/lib/index';

interface Props { }

const PackageDetails: React.FC<Props> = () => {
  const { packageId } = useParams();
  const dispatch = useDispatch();
  const packageA: any = useSelector(selector.packageA);
  // const id: string = useSelector(selector.id);
  // const name: string = useSelector(selector.name);
  // const estimatedPrice: number = useSelector(selector.estimatedPrice);
  // const discount: number = useSelector(selector.discount);
  // const services: ServiceProps[] = useSelector(selector.services);
  // const productDetails: ProductDetailProps[] = useSelector(selector.productDetails);
  // const packageImages: PackageImageProps[] = useSelector(selector.packageImages);

  const [updated, setUpdated] = useState(false);

  // const location = useLocation();
  // const navigate = useNavigate();

  async function fetchData() {
    if (packageId) {
      try {
        const response = await getPackageById(packageId);
        if (response) {
          dispatch(actions.setPackage(response))
          // console.log(response)
          // dispatch(actions.getPackageInfo());
          setUpdated(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <>

      {updated &&
        <>
          <div className="my-7 font-semibold text-black text-xl md:text-4xl">
            Package - {packageA?.name}
          </div>
          <div className="">
            <div className="flex flex-row justify-center gap-10">
              <div className="flex flex-col">
                <div
                  className="w-auto h-auto flex justify-center items-center
      lg:justify-start lg:ml-4 lg:gap-2"
                >
                  <div
                    className="w-[300px] shrink md:w-[600px] xl:w-[700px] mb-10"
                  >
                    <Slider images={packageA?.packageImages.map((item: PackageImageProps) => item?.imageUrl)} />
                  </div>
                </div>
              </div>

              <div className="lg:w-[30%] flex flex-col gap-2 pl-4 pt-20">
                <div
                  className="mb-5 font-semibold text-black text-xl md:text-4xl
        "
                >
                  {packageA?.name}
                </div>
                {/* <div className="font-semibold md:text-2xl flex flex-col">
                <span className="text-sm font-thin">Estimated price: </span>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "VND",
                }).format(estimatedPrice)}
              </div> */}
                {/* <div className="font-semibold md:text-2xl flex flex-col">
                <span className="text-sm font-thin">Discount: </span>
                {discount}%
              </div> */}
                <div className="mt-2">
                  <RequestQuotationButton id={packageA?.id}></RequestQuotationButton>
                </div>
                <div className="mt-2">
                  <CustomizePackageButton id={packageA?.id}></CustomizePackageButton>
                </div>
                <div className="h-auto pr-2 pb-10 w-[70%]">
                  <Accordion type="single" defaultValue="item-1" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger className='text-xl'>Services</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-2 shrink">
                          {packageA?.services.map((service: ServiceProps) =>
                            <div className="flex flex-row justify-between">
                              <div className='font-semibold'>{service.name}</div>
                              {/* <div>{new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "VND",
                              }).format(service.price)}</div> */}
                            </div>)}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
            {packageA?.description &&
              <div className="w-[61%] mx-auto mb-10 border-2 py-7 px-10 rounded-2xl">
                <div>
                  <p className="text-xl font-bold border-b-2 border-slate-400 w-fit mb-4">Description</p>
                </div>
                <div className='flex flex-col items-center justify-center gap-4'>
                  {HTMLReactParser(packageA?.description)}
                </div>
              </div>
            }
            <div className='flex justify-center items-center'>
              <div className="flex flex-col gap-8 justify-center items-center px-2 w-[80%] rounded-md">
                <div>
                  <p className="text-2xl font-thin pb-4 border-b-2 border-slate-400">Products In This Package</p>
                </div>
                <div
                  className="grid grid-cols-1 gap-4 pt-8 md:grid-cols-3 lg:grid-cols-4"
                >
                  {packageA?.productDetails.map((product: ProductDetailProps) => (
                    <>
                      <Card className="w-[auto] h-[auto]">
                        <CardHeader className="w-full">
                          <div className="flex justify-center h-[200px]">
                            <img
                              src={product.images[0]?.imageUrl}
                              className="w-[288px] object-contain"
                            // loading="lazy"
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
                                  Materials
                                </p>
                              )}
                            </p>
                          </CardDescription> */}
                          {/* <CardTitle>
                          <p className="text-2xl truncate mb-1">
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "VND",
                            }).format(product.displayPrice )}
                          </p>
                        </CardTitle> */}
                          <CardTitle>
                            <p className="truncate mt-2">
                              Quantity: <span className='text-red-600'>{product.quantity}</span>
                            </p>
                          </CardTitle>
                        </CardContent>
                        {/* <CardFooter className="">
                        <div
                          className="w-10 h-10 bg-yellowCustom flex justify-center items-center rounded-full cursor-pointer hover:opacity-80"
                        >
                          <FaCartArrowDown className="text-black" />
                        </div>
                      </CardFooter> */}
                      </Card>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </>
  )
}

export default PackageDetails;