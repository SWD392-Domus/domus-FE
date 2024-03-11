import React from "react";
import { Button } from "@/components/ui/Button/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/Command";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/Avatar";
type ChooseDetailsProductsProps = {
  productDetailId: string;
  images: string;
  price: number;
  quantity: number;
};

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  products: any;
  selectedProducts: ChooseDetailsProductsProps[];
  setSelectedProduct: React.Dispatch<React.SetStateAction<ChooseDetailsProductsProps[]>>;
};

function handleSelectDetail(){
    
}

const DetailsList: React.FC<Props> = ({
  setOpen,
  products,
  setSelectedProduct,
}) => {
    const handleSelectDetail = (detailId: string) => {
        setSelectedProduct((prevSelectedProducts) => {
          // Check if the detail is already selected
          const isAlreadySelected = prevSelectedProducts.some(
            (product) => product.productDetailId === detailId
          );
    
          if (isAlreadySelected) {
            // If already selected, remove it from the selected list
            return prevSelectedProducts.filter(
              (product) => product.productDetailId !== detailId
            );
          } else {
            // If not selected, add it to the selected list
            const detail = products.flatMap((product) => product.details).find(
              (detail) => detail.id === detailId
            );
            if (!detail) return prevSelectedProducts;
    
            return [
              ...prevSelectedProducts,
              {
                productDetailId: detail.id,
                images: detail.images[0].imageUrl,
                price: 0,
                quantity: 0,
              },
            ];
          }
        });
      };
  return (
    <Command className="w-[500px]">
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {products &&
            products.map((product) => (
              <CommandItem key={product.id} value={product.id}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <h1>{product.productName}</h1>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-80">
                    <DropdownMenuLabel>
                      Select Product Details
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {product.details?.map((detail, index) => {
                      const imageUrl =
                        detail && detail.images && detail?.images[0]?.imageUrl;

                      return (
                        <DropdownMenuItem
                            onSelect={() => {
                                handleSelectDetail(detail.id)
                                setOpen(false);
                            }}
                        >
                          <div className="flex items-center">
                            <Avatar className="mr-4">
                              <AvatarImage
                                src={
                                  imageUrl
                                    ? imageUrl
                                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC_FigtTf1OwQIczsZeHn8c-OAzhePbMXj1Bouo1YTWg&s"
                                }
                              ></AvatarImage>
                            </Avatar>
                            <h4>
                              {product.productName + " Variant " + index + 1}
                            </h4>
                          </div>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </CommandItem>
            ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default DetailsList;
