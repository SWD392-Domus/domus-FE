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
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/Popover";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../usecase";
import { ProductProps } from "@/router/products/type";
import { getAllService } from "../../usecase/getAllService";
import { ServiceProps } from "../../types";

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
    id: string;
    name: string;
    price: number;
    monetaryUnit: string;
};

interface Props {
    selectedStatus: Status;
    setSelectedStatus: (value: Status | null) => void;
    value: string;
}
export function ServiceComboBox(props: Props) {
    const [services, setServices] = useState<Status[]>();
    const fetchData = async () => {
        const res = await getAllService();
        const productsList = res.data.data;
        const labledItem = productsList.map((item: ServiceProps) => {
            return {
                value: item.id,
                label: item.name,
                ...item,
            };
        });
        setServices(labledItem);
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
                        services={services as Status[]}
                    />
                </PopoverContent>
            </Popover>
        );
    }
}

function StatusList({
    setOpen,
    setSelectedStatus,
    services,
}: {
    setOpen: (open: boolean) => void;
    setSelectedStatus: (status: Status | null) => void;
    services: Status[];
}) {
    const handleSelect = (service: Status) => {
        console.log("123");
        setOpen(false);
        setSelectedStatus(service);
    };
    return (
        <Command className="w-[500px]">
            <CommandInput placeholder="Search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                    {services &&
                        services.map((service) => (
                            <CommandItem key={service.id} value={service.value}>
                                <div onClick={() => handleSelect(service)}>
                                    {service.name}
                                </div>
                            </CommandItem>
                        ))}
                </CommandGroup>
            </CommandList>
        </Command>
    );
}
