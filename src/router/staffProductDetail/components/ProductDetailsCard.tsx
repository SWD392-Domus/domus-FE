import React from 'react'
import TabProductDetails from './TabProductDetails'


const ProductDetailsCard: React.FC = () => {
  return (
    <div className='h-[500px] rounded-lg ring-1 ring-border w-full'>
        <div className='flex flex-col w-full h-full p-6'>
            <h1 className='text-xl'>Product Details</h1>
            <h1 className='text-sm text-slate-400'>Products may have differents variants, atributes.So this is a section that can help us  manage  our details</h1>
            <div className='pt-5'>
                <TabProductDetails/>
            </div>
        </div>
    </div>
  )
}

export default ProductDetailsCard