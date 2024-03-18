// import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/Button/Button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    // CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/Command";

// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/Dropdown-menu";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/Popover";
import { useEffect, useState } from "react";
import { getAllStaff } from "@/router/adminQuotationDetail/usecase";
// import { Avatar } from "@/components/ui/Avatar";
// import { AvatarImage } from "@radix-ui/react-avatar";
import { actions } from "./slice"
import { useDispatch } from "react-redux";

export function ComboBoxResponsive() {
    const [staffs, setStaffs] = useState<any[]>();
    const fetchData = async () => {
        const token = localStorage.getItem("Token");
        const res = await getAllStaff(token as string);
        setStaffs(res);
        console.log(res);
    };

    useEffect(() => {
        fetchData();
    }, []);
    const [open, setOpen] = useState(false);
    const isDesktop = true;

    if (isDesktop) {
        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="default"
                        className="min-w-10 justify-start font-normal "
                    >
                        <div className="font-semibold">Assign</div>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="start">
                    <StatusList
                        setOpen={setOpen}
                        staffs={staffs as any[]}
                    />
                </PopoverContent>
            </Popover>
        );
    }
}

function StatusList({
    setOpen,
    staffs,
}: {
    setOpen: (open: boolean) => void;
    staffs: any[];
}) {
    const dispatch = useDispatch();

    return (
        <Command className="w-[250px]">
            {/* <CommandInput placeholder="Search..." /> */}
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                    {staffs &&
                        staffs.map((staff) => (
                            <CommandItem
                                key={staff.id}
                                value={staff.userName}
                                onSelect={() => {
                                    dispatch(actions.setStaff(staff));
                                    setOpen(false);
                                }}
                            >
                                {staff.userName}
                            </CommandItem>
                        ))}
                </CommandGroup>
            </CommandList>
        </Command>
    );
}
