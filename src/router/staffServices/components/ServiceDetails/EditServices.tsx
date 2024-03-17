import React, { useEffect, useState } from "react";
import { getServiceByIdService } from "../../service";
import { toast } from "@/components/ui/Toast/use-toast";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button/Button";
import { editServiceService } from "../../service/editService";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name is too short",
    })
    .max(50, {
      message: "Name is too long",
    }),
  price: z.coerce.number().gte(1, "Price must be bigger than 0"),
});

type Props = {
  id: string;
};
type ServiceProps = {
  id: string;
  name: string;
  price: number;
};
const EditServices: React.FC<Props> = ({ id }) => {
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0 || service?.price,
    },
  });
  useEffect(() => {
    getServiceDetails();
  }, []);

  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "VND",
  }).format(service?.price || 0);
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const dataToSend = {
        ...data,
        monetaryUnit: "VND",
      };
      const res = await editServiceService(id,dataToSend);
      const respones = res.data;
      if (respones.isSuccess) {
        window.location.reload();
        toast({
          variant: "success",
          title: "Edit Service Success",
          description: "Edit Service Success",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Errorr",
      });
    }
  };
  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit Service</DialogTitle>
        <DialogDescription>
          Make changes to your Service here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Name</FormLabel>
                <FormControl>
                <Input placeholder={service?.name || 'Name'} {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display service name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                <Input placeholder={formatted || 'Price'} {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display service price.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default EditServices;
