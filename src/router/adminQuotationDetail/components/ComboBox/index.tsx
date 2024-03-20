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

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/Popover";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../usecase";
import { ProductProps } from "@/router/products/type";
import { Avatar } from "@/components/ui/Avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
export interface ProductDetails {
    productDetailId?: string;
    id?: string;
    images: {
        imageUrl: string;
    }[];
    attributes: {
        name: string;
        value: string;
    }[];
    displayPrice: number;
}
type Status = {
    value: string;
    label: string;
    id?: string;
    productName?: string;
    description?: string;
    details?: ProductDetails[];
    price?: string;
};
const handleSelectDetail = (
    detail: ProductDetails,
    product: Status,
    index: number,
    setSelectedStatus: any
) => {
    setSelectedStatus({
        productDetailId: detail.id,
        productName: product.productName + " Variant " + index + 1,
        price: detail.displayPrice,
        monetaryUnit: "VND",
        quantity: 1,
        quantityType: "Unit",
        priceSum: new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "VND",
        }).format(detail.displayPrice),
    });
};
interface Props {
    selectedStatus: Status;
    setSelectedStatus: (value: Status | null) => void;
    value: string;
}
export function ComboBoxResponsive(props: Props) {
    const [products, setProducts] = useState<Status[]>();
    const fetchData = async () => {
        const res = await getAllProducts();
        const productsList = res.data.data;
        const labledItem = productsList.map((item: ProductProps) => {
            return {
                value: item.id,
                label: item.productName,
                ...item,
            };
        });
        setProducts(labledItem);
    };

    useEffect(() => {
        fetchData();
    }, []);
    const [open, setOpen] = useState(false);
    const isDesktop = true;
    // const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="default"
                        className="min-w-10 justify-start font-normal "
                    >
                        <div className="font-semibold">+ select</div>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="start">
                    <StatusList
                        setOpen={setOpen}
                        setSelectedStatus={props.setSelectedStatus}
                        products={products as Status[]}
                    />
                </PopoverContent>
            </Popover>
        );
    }
}

function StatusList({
    setOpen,
    setSelectedStatus,
    products,
}: {
    setOpen: (open: boolean) => void;
    setSelectedStatus: (status: Status | null) => void;
    products: Status[];
}) {
    return (
        <Command className="w-[500px]">
            <CommandInput placeholder="Search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                    {products &&
                        products.map((product) => (
                            <CommandItem
                                key={product.value}
                                value={product.value}
                            >
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <h1>{product.label}</h1>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-80">
                                        <DropdownMenuLabel>
                                            Select Product Details
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        {product.details?.map(
                                            (detail, index) => {
                                                const imageUrl =
                                                    detail &&
                                                    detail.images &&
                                                    detail?.images[0]?.imageUrl;

                                                return (
                                                    <DropdownMenuItem
                                                        onSelect={() => {
                                                            handleSelectDetail(
                                                                detail,
                                                                product,
                                                                index,
                                                                setSelectedStatus
                                                            );
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
                                                                {product.productName +
                                                                    " Variant " +
                                                                    index +
                                                                    1}
                                                            </h4>
                                                        </div>
                                                    </DropdownMenuItem>
                                                );
                                            }
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </CommandItem>
                        ))}
                </CommandGroup>
            </CommandList>
        </Command>
    );
}
