import React, { useEffect, useState } from "react";
import { getServiceByIdService } from "../../service";
import { toast } from "@/components/ui/Toast/use-toast";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Label } from "@/components/ui/Label";


type Props = {
  id: string;
};
type ServiceProps = {
  id: string;
  name: string;
  price: number;
};
const ServiceDetails: React.FC<Props> = ({ id }) => {
  const [service, setService] = useState<ServiceProps>();
  async function getServiceDetails() {
    try {
      const res = await getServiceByIdService(id);
      const response = res.data;
      console.log("response", response);
      if (response.isSuccess) {
        setService(response.data);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Errorr",
      });
    }
  }
  useEffect(() => {
    getServiceDetails();
  }, []);

  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "VND",
}).format(service?.price || 0);
  return (
    <>
       <DialogHeader>
          <DialogTitle>Service</DialogTitle>
          <DialogDescription>
            This is where the details of the service are displayed.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-center font-semibold">
              Name
            </Label>
            <Label className="text-thin col-span-3">{service?.name}</Label>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-center font-semibold">
              Price
            </Label>
            <Label className="text-thin col-span-3">{formatted}</Label>
          </div>
        </div>
    </>
      
  );
};

export default ServiceDetails;
