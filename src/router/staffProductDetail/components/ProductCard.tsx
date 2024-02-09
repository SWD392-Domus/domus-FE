import React from 'react'

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/Resizable";
  
const ProductCard: React.FC = () => {
  return (
    <ResizablePanelGroup
          direction="horizontal"
          className="w-full rounded-lg border"
        >
          <ResizablePanel defaultSize={70}>
            <div className="flex flex-col h-[400px] items-start justify-center p-6 gap-4 shrink">
              <div className="text-3xl">IKEA Professional Chair</div>
              <div className="text-2xl">Description</div>
              <div className="text-slate-400">20A Le Lai , Dong Ha city,Quang Tri Province Viet Nam</div>
              <div className="flex gap-2">
                <div>
                    Created at: 
                </div>
                <div className="text-slate-400">
                  10/02/2024
                </div>
              </div>
              <div className="flex gap-2">
                <div>
                Total quantity on storage: 
                </div>
                <div className="text-slate-400">
                2020 (items)    
                </div>
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle className="bg-white" />
          <ResizablePanel defaultSize={30}>
            <div className="flex w-full h-full items-center justify-center p-6">
              <img
                className="object-cover"
                src="https://www.ikea.com/ca/en/images/products/sektion-wall-cabinet-with-2-doors-white-tistorp-brown-walnut-effect__1200985_pe905310_s5.jpg?f=xxs"
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
  )
}

export default ProductCard