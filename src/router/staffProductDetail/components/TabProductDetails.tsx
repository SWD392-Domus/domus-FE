import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import ProductDetailsList from "./ProductDetailsList";


const TabProductDetails: React.FC = () => {

  return (
    <Tabs defaultValue="variants" className="w-[80%]">
      <TabsList>
        <TabsTrigger value="variants">Variants</TabsTrigger>
        <TabsTrigger value="storage">Storage</TabsTrigger>
      </TabsList>
      <TabsContent value="variants">
        <ProductDetailsList/>
      </TabsContent>
      <TabsContent value="storage">Change your password here.</TabsContent>
    </Tabs>
  );
};

export default TabProductDetails;
