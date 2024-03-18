import { Button } from "@/components/ui/Button/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { ClipboardIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/Input";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"
import { createService } from "../../usecase/createService";
import { toast } from "@/components/ui/Toast/use-toast";

const createServiceSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  price: z.coerce.number().positive(),
})
function onPrint() { }

export const CreateButton = () => {
  const form = useForm<z.infer<typeof createServiceSchema>>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: {
      name: "",
      price: 0,
    },
  })
  const onSubmit = async (data: z.infer<typeof createServiceSchema>) => {
    try {
      const dataToSend = {
        ...data,
        monetaryUnit: "VND",
      }
      const res = await createService(dataToSend);
      const respones = res.data;
      if (respones.isSuccess) {
        window.location.reload();
        toast({
          variant: "success",
          title: "Create Service Success",
          description: "Create Service Success",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Errorr",
      })
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="">
          <PlusCircledIcon className="my-auto mr-2" />
          Service
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Services</DialogTitle>
          <DialogDescription>
            Creating Services here. Click create when you're done.
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
                    <Input placeholder="Name..." {...field} />
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
                    <Input placeholder="Price..." {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display service price.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit">Create</Button>
            </div>

          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export const PrintButton = () => {
  return (
    <Button onClick={onPrint} className="h-8">
      <ClipboardIcon className="my-auto mr-1" /> Print
    </Button>
  );
};
