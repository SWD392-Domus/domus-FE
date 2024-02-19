import React from "react";

import { useSelector } from "react-redux";
import { productSelector } from "@/router/productDetails/slice/selector";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// import ProductDetailsSection from "./ProductDetailsSection";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";

import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import EditProductDetailsList from "./EditProductDetailsList";
import { productSchema } from "../ProductForm";

const EditProduct: React.FC = () => {
  const { product } = useSelector(productSelector);
  const { productName, brand, description } = product;
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: productName,
      brand: brand,
      description: description,
    },
  });
  if (!product) {
    return (
      <div className="h-screen flex justify-center items-center text-2xl">
        Product not found
      </div>
    );
  }
  return (
    <>
      <div className="w-full rounded-lg border h-auto">
        <div className="flex flex-col items-start justify-center p-6 gap-4 shrink">
          <Form {...form}>
            <form className="space-y-8 w-[70%]">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">Product name</FormLabel>
                    <FormControl>
                      <Input placeholder={productName} {...field} />
                    </FormControl>
                    <FormDescription>
                      This is product display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product brand</FormLabel>
                    <FormControl>
                      <Input placeholder={brand} {...field} />
                    </FormControl>
                    <FormDescription>This is product brand.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product description</FormLabel>
                    <FormControl>
                      <Textarea placeholder={description} {...field} />
                    </FormControl>
                    <FormDescription>
                      This is product description.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <EditProductDetailsList/>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
