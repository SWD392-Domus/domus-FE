import React, { useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
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
import {
    DialogClose,
  } from "@/components/ui/Dialog"
  
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/Toast/use-toast";
import { formSchema } from "@/router/staffProductDetail/components/Edit/FormSchema";
import { createDetailsSchema } from "./createForm";
import {
  AttributesPropsForCreate,
  ProductDetailsPropsForCreate,
} from "../type";
interface DetailsProps {
    addDetail: (detail: ProductDetailsPropsForCreate) => void;
}
const CreatePopup: React.FC<DetailsProps> = ({ addDetail }) => {
  const { toast } = useToast();
  const [attributes, setAttributes] = useState<AttributesPropsForCreate[]>([]);
  

  const form2 = useForm<z.infer<typeof createDetailsSchema>>({
    resolver: zodResolver(createDetailsSchema),
    defaultValues: {
      price: "1",
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      value: "",
    },
  });
const handleAddDetails = (values: z.infer<typeof createDetailsSchema>) => {
    addDetail({
        displayPrice: Number(values.price),
        attributes: attributes,
        monetaryUnit: "usd",
    });
};
  const handleAddAttribute = (values: z.infer<typeof formSchema>) => {
    // Check if an attribute with the same name already exists
    const isDuplicate = attributes.some(
      (attribute) => attribute.name.toLowerCase() === values.name.toLowerCase()
    );
    if (isDuplicate) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Attribute with the same name already exists",
      });
    }

    if (!isDuplicate) {
      setAttributes((prev) => [
        ...prev,
        {
          name: values.name,
          value: values.value,
          valueType: "string",
        },
      ]);
    }
  };
  const handleRemoveAttribute = (index: number) => {
    setAttributes((prevAttributes) =>
      prevAttributes.filter((_, i) => i !== index)
    );
  };
  return (
    <div
      className="flex flex-col gap-8 h-auto pb-10"
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-xl ">Product Details</h1>
        <span className=" text-sm text-slate-500">
          This is a detail dialog of a product.
        </span>
      </div>
      <div className="">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      className="w-auto flex justify-center items-center"
                      variant={"default"}
                    >
                      Add more attribute
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 ml-4">
                    <Form {...form}>
                      <form
                        id="attributeForm" 
                        onSubmit={form.handleSubmit(handleAddAttribute)}
                        className="grid gap-4"
                      >
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Details</h4>
                          <p className="text-sm text-muted-foreground">
                            Set the details for the product.
                          </p>
                        </div>

                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="value"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Value</FormLabel>
                              <FormControl>
                                <Input placeholder="value" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                            variant={"default"}
                        >
                            Add
                        </Button>
                      </form>
                    </Form>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-wrap justify-between gap-5">
            <div className="flex flex-col gap-2">
              {attributes &&
                attributes.map((attribute, index) => (
                  <div className="grid grid-cols-8 items-center gap-4">
                    <Label className="pr-4 truncate col-span-2">
                      {attribute.name}
                    </Label>
                    <div className="flex justify-center items-center gap-4 col-span-6">
                      <Input defaultValue={attribute.value} />
                      <BsBackspace
                        className="text-xl cursor-pointer"
                        onClick={() => handleRemoveAttribute(index)}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
      <Form {...form2}>
        <form
          onSubmit={form2.handleSubmit(handleAddDetails)}
          className="space-y-8"
          id="add-details"
        >
          <FormField
            control={form2.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display price.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogClose asChild>
            <Button type="submit">Submit</Button>
          </DialogClose>
          
        </form>
      </Form>
    </div>
  );
};

export default CreatePopup;
