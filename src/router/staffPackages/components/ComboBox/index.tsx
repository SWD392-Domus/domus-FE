import * as React from "react"

// import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/Button/Button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/Command"
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/Drawer"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/Popover"

type Status = {
    value: string
    label: string
}

const statuses: Status[] = [
    {
        value: "abcdef",
        label: "Abcdef",
    },
    {
        value: "bbcdef",
        label: "Bbcdef",
    },
    {
        value: "cbcdef",
        label: "Cbcdef",
    },
    {
        value: "dbcdef",
        label: "Dbcdef",
    },
    {
        value: "ebcdef",
        label: "Ebcdef",
    },
]

export function ComboBoxResponsive() {
    const [open, setOpen] = React.useState(false)
    const isDesktop = true
    // const isDesktop = useMediaQuery("(min-width: 768px)")
    const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
        null
    )

    if (isDesktop) {
        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="min-w-10 justify-start hover:text-blue-600 font-normal">
                        {selectedStatus ? <>{selectedStatus.label}</> : <div className="font-semibold">+ select</div>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="start">
                    <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
                </PopoverContent>
            </Popover>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" className="min-w-10 justify-start hover:text-blue-600">
                    {selectedStatus ? <>{selectedStatus.label}</> : <>+ select</>}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mt-4 border-t">
                    <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
                </div>
            </DrawerContent>
        </Drawer>
    )
}

function StatusList({
    setOpen,
    setSelectedStatus,
}: {
    setOpen: (open: boolean) => void
    setSelectedStatus: (status: Status | null) => void
}) {
    return (
        <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                    {statuses.map((status) => (
                        <CommandItem
                            key={status.value}
                            value={status.value}
                            onSelect={(value) => {
                                setSelectedStatus(
                                    statuses.find((priority) => priority.value === value) || null
                                )
                                setOpen(false)
                            }}
                        >
                            {status.label}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    )
}
