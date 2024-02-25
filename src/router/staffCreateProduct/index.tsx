import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createProductSchema } from "./components/createForm";
import { Button } from "@/components/ui/Button/Button";
import { BsBackspace } from "react-icons/bs";
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
import { FaPlus } from "react-icons/fa6";
import CreatePopup from "./components/CreatePopup";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { ProductDetailsPropsForCreate, ProductPropsForCreate } from "./type";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { createProducts } from "./usecases";
import { toast } from "@/components/ui/Toast/use-toast";
import { useNavigate } from "react-router-dom";

const CreateProduct: React.FC = () => {
  const navigate  = useNavigate();
  const [details, setDetails] = useState<ProductDetailsPropsForCreate[]>([]);
  const [product, setProduct] = useState<ProductPropsForCreate>();
  const addDetail = (detail: ProductDetailsPropsForCreate) => {
    setDetails(prevDetails => [...prevDetails, detail]);
  };
  const onSubmit = async (values: z.infer<typeof createProductSchema>) => {
    setProduct({
      'productName': values.name,
      'brand': values.brand,
      "productCategoryId": "c5e2952c-9448-454a-9ebf-d32f3cd8072b",
      "description": values.description,
      "productDetails": details,
    });
  }
  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      brand: "",
      description: "",
    },
  });
  // if (details) {
  //   console.log(details);
  // }
  const handleDeleteDetails = (indexToDelete: number) => {
    setDetails(prevDetails => prevDetails.filter((_, index) => index !== indexToDelete));
  }

  useEffect(() => {
    const makeApiCall = async () => {
      if (product) {
        const res = await createProducts(product);
        console.log(res); // Log the response to see its structure and properties
        if (res && res.isSuccess) {
          const id = res.data.id;
          console.log(id); // Log the id to see if it's undefined
          toast({
            variant: "success",
            title: "Create successfully",
            description: "Create successfully.",
          });
          navigate(`/staff/products/${id}`);
        } else {
          // Handle error cases
          console.error("API call failed:", res);
          toast({
            variant: "destructive",
            title: "API call failed",
            description: "Failed to create product.",
          });
        }
      }
    };
    makeApiCall();
  }, [product]);
  return (
    <div className="pt-2">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold">Product create</h1>
        <span className="text-sm font-bold text-slate-500">
          Creating new product
        </span>
        <div className="pt-4">
          <Form {...form}>
            <form
              id="callapi"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Name</FormLabel>
                    <FormControl>
                      <Input className="w-1/2" placeholder="name" {...field} />
                    </FormControl>
                    <FormDescription>This is product name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Brand</FormLabel>
                    <FormControl>
                      <Input className="w-1/2" placeholder="brand" {...field} />
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
                    <FormLabel className="font-bold">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="w-1/2"
                        placeholder="description"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is product description.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <div className="pt-4">
            <div className="pb-4">
              <Label className="font-bold">Product Details</Label>
              <Label className="text-slate-500 text-sm">
                This is product details
              </Label>
            </div>

            <ScrollArea className="h-40 w-auto rounded-md border">
              <div
                className="pt-2 h-[250px] flex flex-wrap gap-2 p-2 justify-start 
                  md:h-[320px]"
              >
                {details &&
                  details.map(
                    (product: ProductDetailsPropsForCreate, index) => (
                      <>
                        <Dialog>
                          <div className="flex justify-center h-1/6 items-center gap-1">
                            <DialogTrigger asChild>
                              <div
                                className="h-[10%] flex justify-center items-center gap-2 cursor-pointer
              hover:bg-slate-100 rounded-md border border-black shrink p-4"
                              >
                                <div className="font-semibold">Details {index + 1}</div>
                              </div>
                            </DialogTrigger>
                            <BsBackspace onClick={()=>handleDeleteDetails(index)} className="cursor-pointer  hover:text-red-500" />
                          </div>
                          <DialogContent>

                          </DialogContent>
                        </Dialog>
                      </>
                    )
                  )}
                <Dialog>
                  <DialogTrigger asChild>
                    <div
                      className=" h-1/6 flex justify-center items-center gap-2 cursor-pointer
              hover:bg-slate-100 rounded-md border border-black shrink p-4 ml-2"
                    >
                      <FaPlus className="shrink-0 text-2xl" />
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <CreatePopup addDetail={addDetail} />
                  </DialogContent>
                </Dialog>
              </div>
            </ScrollArea>
          </div>
          <div className="pt-4">
            <Button onClick={form.handleSubmit(onSubmit)}>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
