import { Button } from '@/components/ui/Button/Button';
import { DeleteButton } from './components/DeleteButton';
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updatePackage } from './usecase';
import { useToast } from "@/components/ui/Toast/use-toast"
import { ToastAction } from "@/components/ui/Toast/toast"
import { Input } from "@/components/ui/Input";

interface Props { }

const PackageDetails: React.FC<Props> = () => {
  const { packageId } = useParams();
  const dispatch = useDispatch();
  const id: string = useSelector(selector.id);
  const name: string = useSelector(selector.name);
  const estimatedPrice: number = useSelector(selector.estimatedPrice);
  const discount: number = useSelector(selector.discount);
  const services: ServiceProps[] = useSelector(selector.services);
  const productDetails: ProductDetailProps[] = useSelector(selector.productDetails);
  const packageImages: PackageImageProps[] = useSelector(selector.packageImages);

  const [updated, setUpdated] = useState(false);
  const { toast } = useToast()

  async function fetchData() {
    if (packageId) {
      try {
        const response = await getPackageById(packageId);
        if (response) {
          dispatch(actions.setPackage(response))
          // console.log(response)
          dispatch(actions.getPackageInfo());
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

  const formSchema = z.object({
    name: z.string(),
    // discount: z.number(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      // discount: 0,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append('Name', values.name);
    formData.append('ServiceIds', "6c745475-6b46-41c2-2ae6-08dc3155b379");
    formData.append('ProductDetailIds', "6368e5df-c2d9-4d7f-9263-045a8afc26f9");

    const res = await updatePackage(id, formData);
    if (res === 200) {
      toast({
        variant: "success",
        title: "Update Successfully.",
        description: "A package was updated.",
        action: <ToastAction altText="Close">Close</ToastAction>,
      })
    } else {
      toast({
        variant: "destructive",
        title: "Fail to Update.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="my-7 text-2xl font-semibold">
          Package - {name}
        </div>
        {updated &&
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
                    <Slider images={packageImages.map((item: PackageImageProps) => item?.imageUrl)} />
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

                  {/* Package Name Input Start */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="border-yellowCustom text-xl text-black mb-2">
                          Package Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={name}
                            {...field}
                            // value={name}
                            className="mb-4"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Package Name Input End*/}
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
                  <DeleteButton id={id}></DeleteButton>
                </div>
                <div className="mt-2">
                  <Button variant={'yellowCustom'} className="cursor-pointer w-40">Update</Button>
                </div>
                <div className="mt-2">
                  <Button variant={'yellowCustom'} className="cursor-pointer w-40" type="submit">Save</Button>
                </div>
                <div className="h-auto pr-2 pb-10 w-[70%]">
                  <Accordion type="multiple">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Services</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-2 shrink">
                          {services.map((service: ServiceProps) =>
                            <div className="flex flex-row justify-between">
                              <div className='font-semibold'>{service.name}</div>
                              <div>{new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "VND",
                              }).format(service.price)}</div>
                            </div>)}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
            <div className='flex justify-center items-center'>
              <div className="flex flex-col gap-8 justify-center items-center px-2 w-[80%] rounded-md">
                <div>
                  <p className="text-2xl font-thin pb-4 border-b-2 border-slate-400">Products In This Package</p>
                </div>
                <div
                  className="grid grid-cols-1 gap-4 pt-8 md:grid-cols-3 lg:grid-cols-4"
                >
                  {productDetails.map((product: ProductDetailProps) => (
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
        }
      </form>
    </Form>

  )
}

export default PackageDetails;