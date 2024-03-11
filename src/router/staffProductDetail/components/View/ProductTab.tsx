import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import ProductDetailsList from "./ProductDetailsList";
import ProductStorage from './ProductStorage';

const ProductTab:React.FC = () => {
  return (
    <Tabs defaultValue="variants" className="w-[80%] h-auto">
            <TabsList>
              <TabsTrigger value="variants">Variants</TabsTrigger>
              <TabsTrigger value="storage">Storage</TabsTrigger>
            </TabsList>
            <TabsContent value="variants">
              <ProductDetailsList />
            </TabsContent>
            <TabsContent value="storage">
              <ProductStorage/>
            </TabsContent>
          </Tabs>
  )
}

export default ProductTab