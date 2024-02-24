import React from 'react'
import ProductsCart from './components/ProductsCart'
import ProductsSuggestion from './components/ProductsSuggestion/Suggestion'
import ServiceCombo from './components/ServiceCombo'
import { Button } from "@/components/ui/Button/Button";
import { ArrowRight } from 'lucide-react';

// interface Props = {}

const CustomerCart: React.FC = () => {

  return (
    <div className='h-auto flex flex-col mb-20 mx-16'>
      <h1 className='flex justify-center text-4xl p-4 font-semibold'>Request For Quotation</h1>
      <div className='flex flex-wrap justify-between gap-20 mb-10'>
        <ProductsCart />
        <ProductsSuggestion />
      </div>
      <div className="flex flex-row items-center justify-between">
        <ServiceCombo></ServiceCombo>
        <Button
          variant={"yellowCustom"}
          className="cursor-pointer w-52 h-12 rounded-3xl font-semibold text-base"
          type="submit"
        >
          Request
          <ArrowRight className='ml-2 h-5'></ArrowRight>
        </Button>
      </div>
    </div>
  )
}

export default CustomerCart