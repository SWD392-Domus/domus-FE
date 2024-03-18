import React, { useState } from "react";
import { Input } from "./Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/Command";
//   import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/Button/Button";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/Toast/use-toast";
import { getStaffs } from "../usecase/getStaffs";
import { StaffProps } from "../types";
import { editQuotation } from "../usecase/editQuotation";
import selector from "../slice/selector";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../slice";

interface Props{
    setEditStaff: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormSchema = z.object({
  staffId: z.string({
    required_error: "Please select a staff.",
  }),
});

const ChooseStaff: React.FC<Props> = ({
    setEditStaff,
}) => {
  const [staffList, setStaffList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const id: string = useSelector(selector.id);
  const customer: any = useSelector(selector.customer);
  const status: string = useSelector(selector.status);
  const products: any[] = useSelector(selector.products);
  const services: any = useSelector(selector.services);
  const dispatch = useDispatch();
  async function fetchStaffData() {
    try {
      const res = await getStaffs();
      if (res.isSuccess) {
        setStaffList(res.data);
        setIsLoading(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get staffs",
        variant: "destructive",
      });
    }
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
        const token = localStorage.getItem("Token") as string;
        const res = await editQuotation(id,token, {
            customerId: customer.id,
            staffId: data.staffId,
            status: status,
            productdetails: products,
            services: services,
        });
        const response = res.data;
        if (response.isSuccess) {
            const staffChange = staffList.find((staff) => staff.id === data.staffId);
            dispatch(actions.setStaff(staffChange));
            setEditStaff(false);
            toast({
                title: "Success",
                description: "Staff updated successfully.",
                variant: "success",
              });
        }
    } catch (error) {
        toast({
            title: "Error",
            description: "Failed to update staff",
            variant: "destructive",
        })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="staffId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Staff</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      onClick={fetchStaffData}
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        <div className="truncate">
                          {
                            staffList.find((staff) => staff.id === field.value)
                              ?.fullName
                          }
                        </div>
                      ) : (
                        "Select staff"
                      )}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    {isLoading ? (
                      <div className="text-sm pl-2 text-slate-500">Loading...</div>
                    ) : (
                      <>
                        <CommandInput
                          placeholder="Search Staff..."
                          className="h-9"
                        />
                        <CommandEmpty>No Staff found.</CommandEmpty>
                        <CommandGroup>
                          {staffList.map((staff: StaffProps) => (
                            <CommandItem
                              value={staff.fullName}
                              key={staff.id}
                              onSelect={() => {
                                form.setValue("staffId", staff.id);
                              }}
                            >
                              <div className="truncate">{staff.fullName}</div>

                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  staff.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </>
                    )}
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the staff that will be assign to quotation.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default ChooseStaff;
