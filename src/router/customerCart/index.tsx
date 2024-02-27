import React from 'react'
import ProductsCart from './components/ProductsCart'
import ProductsSuggestion from './components/ProductsSuggestion/Suggestion'
import ServiceCombo from './components/ServiceCombo'
import { Button } from "@/components/ui/Button/Button";
import { ArrowRight } from 'lucide-react';
import { useSelector } from "react-redux";
// import { useDispatch, useSelector } from "react-redux";
import selector from "./slice/selector";
// import { actions } from "./slice";
import { ServiceProps, ProductDetailProps } from "./types";
import { createQuotation } from './usecase/createQuotation';
import { useToast } from "@/components/ui/Toast/use-toast";
import { ToastAction } from "@/components/ui/Toast/toast";


const CustomerCart: React.FC = () => {
  const { toast } = useToast();
  // const dispatch = useDispatch();
  const services: ServiceProps[] = useSelector(selector.services);
  const productDetails: any[] = useSelector(selector.productDetails);
  const totalPrice: number = useSelector(selector.totalPrice);
  const discount: number = useSelector(selector.discount);
  const handleClick = async () => {
    const servicesIds = services.map((service) => service.id)
    const res = await createQuotation(
      {
        customerId: "e403c308-274e-42f5-b5df-36ec234d6ee1",
        staffId: "c713aacc-3582-4598-8670-22590d837179",
        expireAt: "2024-09-24T06:54:12.762Z",
        services: servicesIds,
        productDetails: productDetails.map((productDetail: any) => {
          return {
            id: productDetail.id,
            quantity: productDetail.quantity,
          }
        })
      }
    );
    if (res === 200) {
      toast({
        variant: "success",
        title: "Request Successfully.",
        description: "A request was sent.",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
      localStorage.removeItem("cart");
      window.location.reload();
    } else {
      toast({
        variant: "destructive",
        title: "Fail to Request.",
        description: "There was a problem with your request.",
        action: (
          <ToastAction altText="Try again">Try again</ToastAction>
        ),
      });
    }
  }
  return (
    <div className='h-auto flex flex-col mb-20 mx-16'>
      <h1 className='flex justify-center text-4xl p-4 font-semibold'>Request For Quotation</h1>
      <div className='flex flex-wrap justify-between gap-20 mb-10'>
        <ProductsCart />
        <ProductsSuggestion />
      </div>
      <div className="flex flex-row items-center justify-between">
        <ServiceCombo></ServiceCombo>
        <div className='flex flex-col text-lg'>
          <div className='flex gap-2'>
            <div className=''>Total Price:</div>
            <div className='font-semibold text-red-600'>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "VND",
              }).format(totalPrice)}
            </div>
          </div>
          <div>Discount: {discount}%</div>
        </div>
        <Button
          variant={"yellowCustom"}
          className="cursor-pointer w-52 h-12 rounded-3xl font-semibold text-base"
          onClick={handleClick}
        >
          Request
          <ArrowRight className='ml-2 h-5'></ArrowRight>
        </Button>
      </div>
    </div>
  )
}

export default CustomerCart