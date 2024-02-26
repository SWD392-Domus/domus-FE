import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/Accordion/Accordion";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/Dialog";
import { PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import ServiceList from "./ServiceList";
import { useSelector } from "react-redux";
import selector from "../../slice/selector";
import { ServiceProps } from "../../types";

const PackageCombo: React.FC = () => {
    const services: ServiceProps[] = useSelector(selector.services);
    return (
        <div className="h-auto flex justify-between gap-10 w-[600px]">
            <div className="w-[70%]">
                <Accordion type="single" collapsible defaultValue="item-1">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="font-semibold text-3xl py-4">Services</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col gap-2 shrink">
                                {services.map((service: ServiceProps) => (
                                    <div className="flex flex-row justify-between">
                                        <div className="font-semibold">
                                            {service.name}
                                        </div>
                                        <div>
                                            {new Intl.NumberFormat("en-US", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(service.price)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="mt-4 bg-variant text-black h-9 border-2 border-zinc-500 bg-zinc-50 rounded hover:text-white pl-2">
                        <PencilIcon className="h-3.5 pr-2 my-auto"></PencilIcon>
                        Services
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[700px]">
                    <ServiceList data={services} />
                    <DialogFooter></DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PackageCombo;
