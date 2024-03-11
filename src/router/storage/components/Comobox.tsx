import * as React from "react";

// import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/Button/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/Command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/Drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";

import { getAllProducts } from "@/router/staffQuotationDetail/usecase";
import DetailsList from "./DetailsList";
import { Input } from "@/components/ui/Input";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/Toast/use-toast";
import { importStorage } from "../usecase";
export interface ProductDetails {
  productDetailId?: string;
  images: {
    imageUrl: string;
  }[];
  attributes: {
    name: string;
    value: string;
  }[];
}

type Products = {
  id?: string;
  productName?: string;
  description?: string;
  details?: ProductDetails[];
  price?: string;
};
type ChooseDetailsProductsProps = {
  productDetailId: string;
  price: number;
  images: string;
  quantity: number;
};
// const handleSelectDetail = (
//     detail: ProductDetails,
//     product: Status,
//     index: number,
//     setSelectedStatus: any
// ) => {
//     setSelectedStatus({
//         id: detail.id,
//         price: detail.displayPrice,
//         monetaryUnit: "VND",
//         quantity: 1,
//         quantityType: "Unit",
//         priceSum: new Intl.NumberFormat("en-US", {
//             style: "currency",
//             currency: "VND",
//         }).format(detail.displayPrice * 1000),
//     });
// };

export function ComboBoxResponsive() {
  const [open, setOpen] = React.useState(false);
  const [products, setProducts] = React.useState<Products[]>();
  const [selectedProducts, setSelectedProducts] = React.useState<
    ChooseDetailsProductsProps[]
  >([]);
  const [selectedProductToSend, setSelectedProductToSend] = React.useState([]);
  // const [quantity, setQuantity] = React.useState(0);
  // const [price, setPrice] = React.useState(0);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const handleSubmit = async () => {
    let isValid = true;
    const newErrors: { [key: string]: string } = {};

    selectedProducts.forEach((product, index) => {
      if (product.quantity <= 0 || isNaN(product.quantity)) {
        newErrors[`quantity.${index}`] =
          "Quantity must be integer and greater than 0";
        isValid = false;
      }
      if (product.price <= 0 || isNaN(product.price)) {
        newErrors[`price.${index}`] =
          "Price must be integer and greater than 0";
        isValid = false;
      }
    });

    setErrors(newErrors);

    if (isValid) {
      try {
        const importProduct = selectedProducts.map((product) => {
          return {
            productDetailId: product.productDetailId,
            price: product.price,
            quantity: product.quantity,
            monetaryUnit: "string"
          };
        });
        console.log(importProduct);
        const res = await importStorage(importProduct);
        if(res.data.isSuccess){
          toast({
            variant: "success",
            title: "Success",
            description: "Import products successfully",
          })
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong",
        })
      }
    }
  };

  const fetchData = async () => {
    const res = await getAllProducts();
    const productsList = res.data.data;
    setProducts(productsList);
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  // if (selectedProducts) {
  //   console.log(selectedProducts);
  // }

  // const handleProductSelect = (product: ChooseDetailsProductsProps) => {
  //   setSelectedProducts([...selectedProducts, product]);
  // };

  const handleQuantityChange = (index: number, value: string) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index].quantity = parseInt(value);
    setSelectedProducts(updatedProducts);
  };

  const handlePriceChange = (index: number, value: string) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index].price = parseInt(value);
    setSelectedProducts(updatedProducts);
  };
  return (
    <div className="overflow-scroll h-screen">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="default"
            className="min-w-10 justify-start font-normal "
          >
            <div className="font-semibold">+ select</div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <DetailsList
            selectedProducts={selectedProducts}
            setOpen={setOpen}
            setSelectedProduct={setSelectedProducts}
            products={products as Products[]}
          />
        </PopoverContent>
      </Popover>

      {selectedProducts.length > 0 && (
        <div className="space-y-4">
          {selectedProducts.map((product, index) => (
            <>
              <div key={product.productDetailId}>
                <Avatar className="w-20 h-20">
                  <AvatarImage src={product.images} />
                  <AvatarFallback>NONE</AvatarFallback>
                </Avatar>
                <div className="mb-2">
                  <div className="font-semibold mb-2">Quantity</div>
                  <Input
                    className=""
                    placeholder="Quantity"
                    type="number"
                    value={product.quantity}
                    onChange={(e) =>
                      handleQuantityChange(index, e.target.value)
                    }
                  />
                  {errors[`quantity.${index}`] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors[`quantity.${index}`]}
                    </p>
                  )}
                </div>
                <div className="mb-2">
                  <div className="font-semibold mb-2">Price</div>
                  <Input
                    placeholder="Price"
                    type="number"
                    value={product.price}
                    onChange={(e) => handlePriceChange(index, e.target.value)}
                  />
                  {errors[`price.${index}`] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors[`price.${index}`]}
                    </p>
                  )}
                </div>
              </div>
            </>
          ))}
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      )}
    </div>
  );
}
