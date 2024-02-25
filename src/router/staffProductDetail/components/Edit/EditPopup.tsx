import {
  ImagesProps,
  ProductDetailsProps,
  AttributesProps,
} from "@/router/productDetails/type";
import React, { useState } from "react";
import EditCard from "./EditCard";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { BsBackspace } from "react-icons/bs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./FormSchema";
import { useToast } from "@/components/ui/Toast/use-toast";
import { addPhoto } from "../../usecase";
import { useDispatch } from "react-redux";
import { SheetClose } from "@/components/ui/Sheet";
import {
  setOrUpdateDetail,
  setProductDetails,
} from "@/router/productDetails/slice";
interface DetailsProps {
  productName: string;
  details: ProductDetailsProps;
  index: number;
}
const EditPopup: React.FC<DetailsProps> = ({ productName, details, index }) => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [attributes, setAttributes] = useState<AttributesProps[]>(() => {
    if (details && details.attributes) {
      return details.attributes;
    } else {
      return [];
    }
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      value: "",
    },
  });
  const handleAddAttribute = (values: z.infer<typeof formSchema>) => {
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
        },
      ]);
    }
  };
  const handleRemoveAttribute = (index: number) => {
    setAttributes((prevAttributes) =>
      prevAttributes.filter((_, i) => i !== index)
    );
  };
  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setUploadedImages((prevImages) => [...prevImages, ...newFiles]);
    }
  };
  const uploadFunc = async () => {
    if (uploadedImages.length === 0) {
      toast({
        variant: "destructive",
        title: "No images selected",
        description: "Please select one or more images to upload.",
      });
      return;
    }
    const id = details.id;
    const formData = new FormData();
    uploadedImages.forEach((image) => {
      formData.append("images", image);
    });
    try {
      const res = await addPhoto(id, formData);
      if (res) {
        const photo = res.data;
        console.log("photo", photo);
        photo.forEach((image: string) => {
          dispatch(
          setOrUpdateDetail({
            ...details,
            images: [...details.images, {
              imageUrl: image,
            }],
          })
        );
        })
        
        toast({
          variant: "success",
          title: "Upload successful",
          description: "Images uploaded successfully.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Upload failed",
          description: "Failed to upload images.",
        });
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "An error occurred while uploading images.",
      });
    }
  };
  const handleSave = () => {
    dispatch(
      setProductDetails({
        updatedDetail: {
          ...details,
          attributes: attributes,
        },
      })
    );
  };
  const images = details.images.map((image: ImagesProps) => image.imageUrl);
  return (
    <div
      className="flex flex-col gap-8 h-auto pb-10
    
    "
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-xl ">Product Details</h1>
        <span className=" text-sm text-slate-500">
          This is a detail dialog of a product.
        </span>
      </div>

      <div className="flex flex-wrap justify-between gap-5">
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-2xl pb-2">
            {productName} Variant {index}
          </h1>
          {attributes &&
            attributes.map((attribute, index) => (
              <div className="flex justify-between items-center gap-4">
                <Label className="pr-4">{attribute.name}</Label>
                <Input defaultValue={attribute.value} />
                <BsBackspace
                  className="text-xl cursor-pointer"
                  onClick={() => handleRemoveAttribute(index)}
                />
              </div>
            ))}
          <div className=" pt-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className=" flex justify-center items-center"
                  variant={"default"}
                >
                  Add more attribute
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 ml-4">
                <Form {...form}>
                  <form
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
        </div>
        <div
          className="w-full
         pr-10 flex flex-col gap-3 px-2"
        >
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Picture</Label>
            <div className="flex gap-2 justify-between">
              <Input
                id="picture"
                multiple
                type="file"
                onChange={handleAddImage}
              />
              <Button onClick={() => uploadFunc()} variant={"default"}>
                Upload
              </Button>
            </div>
          </div>
          <div className="h-[200px] rounded-lg ring-1 ring-border w-full overflow-scroll">
            <div className="flex flex-col w-full h-full p-6">
              {images && images.length > 0 ? (
                <div className="pt-5 ">
                  <EditCard images={images} />
                </div>
              ) : (
                <div className="pt-5 ">No images available</div>
              )}
            </div>
          </div>
          <SheetClose asChild>
            <Button onClick={() => handleSave()} variant={"default"}>
              Save
            </Button>
          </SheetClose>
        </div>
      </div>
    </div>
  );
};

export default EditPopup;
