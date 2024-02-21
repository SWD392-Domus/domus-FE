import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
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
import { productSelector } from "@/router/productDetails/slice/selector";
import { setProduct } from "@/router/productDetails/slice";
// import { SingleProductProps } from "@/router/productDetails/type";

const EditProduct: React.FC = () => {
  const dispatch = useDispatch();
  const { product } = useSelector(productSelector);
  const { productName, brand, description } = product;
  // const [productCopy, setProductCopy] = React.useState<SingleProductProps | null>(product);
  const [name, setName] = React.useState<string>(productName);
  const [productBrand, setBrand] = React.useState<string>(brand);
  const [productDescription, setDescription] =
    React.useState<string>(description);
  // const [productDetails, setProductDetails] = React.useState<string[]>([]);
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: productName,
      brand: brand,
      description: description,
    },
  });
  useEffect(() => {
    // Dispatch setProduct action when name, productBrand, or productDescription changes
    dispatch(setProduct({ ...product, productName: name, brand: productBrand, description: productDescription }));
  }, [name, productBrand, productDescription]);
  if (!product) {
    return (
      <div className="h-screen flex justify-center items-center text-2xl">
        Product not found
      </div>
    );
  }
  // if(productCopy){
  //   console.log(productCopy)
  // }
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
                      <Input
                        placeholder={name}
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setName(e.target.value);
                        }}
                      />
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
                      <Input
                        placeholder={productBrand}
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setBrand(e.target.value);
                        }}
                      />
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
                      <Textarea
                        placeholder={productDescription}
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setDescription(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      This is product description.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <EditProductDetailsList />
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
