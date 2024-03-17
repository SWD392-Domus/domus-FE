import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button/Button";
import { Card } from "@/components/ui/Card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/Select";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/AlertDialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectValue } from "@radix-ui/react-select";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import { getOwnProfile } from "./usecases";
import { toastError } from "@/components/Toast";
// import ChangePasswordForm from "./components/ChangePasswordForm";
import ChangeAvatar from "./components/ChangeAvatar";
// import { changeProfile } from "./usecases/ChangeProfile";
import { toast } from "@/components/ui/Toast/use-toast";
import { useParams } from "react-router-dom";
import { getUserById } from "./usecase";
import { UpdateUserById } from "./usecase/updateUserById";

interface Props {
  // define your props here
}
interface Image {
  file: File | null;
  imageUrl: string | null;
  isUpload: boolean;
}
const UserDetails: React.FC<Props> = () => {
  const { id } = useParams<string>();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();
      formData.append("FullName", values.fullName);
      formData.append("Gender", sex);
      formData.append("Address", values.address);
      formData.append("PhoneNumber", values.phoneNumber);
      if (uploadedImage?.isUpload) {
        formData.append("ProfileImage", uploadedImage.file as any);
      }
      const res = await UpdateUserById(id || "", formData);
      if (res.data.isSuccess) {
        toast({
          variant: "success",
          title: "Update Successfully.",
          description: "A  profile have been updated.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update UnSuccessfully.",
        description: "A  profile have not been updated.",
      });
    }
  }
  const [uploadedImage, setUploadedImage] = useState<Image | null>(null);
  // const [user, setUser] = useState<any | null>(null);
  const fetchData = async () => {
    const res = await getUserById(id ?? "");
    if (res.status != 200) {
      toastError("Fail to fetch Information");
    } else {
      if (res.data.isSuccess) {
        const { fullName, address, phoneNumber, email, profileImage, role } =
          res.data.data;
        form.setValue("fullName", fullName);
        form.setValue("address", address);
        form.setValue("phoneNumber", phoneNumber);
        form.setValue("email", email);
        // setUser(res.data.data);
        setRole(role);
        setUploadedImage({
          file: null,
          imageUrl: profileImage,
          isUpload: false,
        });
      } else {
        toastError("Faild to fetch Information");
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [sex, setSex] = useState("");
  const [role, setRole] = useState("");

  const formSchema = z.object({
    fullName: z.string().nonempty({
      message: "Name is required.",
    }),
    email: z.string().email({
      message: "Invalid email format.",
    }),
    phoneNumber: z
      .string()
      .min(10)
      .max(15)
      .regex(/^\+?\d+$/, {
        message: "Invalid phone number format.",
      }),
    address: z.string().nonempty({
      message: "Address is required.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      address: "",
    },
  });
  const { handleSubmit, watch } = form;
  const watchedValues = watch(); // Watch all fields

  useEffect(() => {
    // This will run every time any watched value changes
  }, [watchedValues]);
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full h-full flex items-start justify-between mt-5"
        >
          <Card className="w-[28%] flex flex-col items-center justify-center border h-[80%] p-4">
            <div className="relative mb-4">
              <Avatar className="w-56 h-56 ">
                <AvatarImage
                  src={uploadedImage?.imageUrl as string}
                  alt="Avatar"
                />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div className="absolute bottom-5 right-5 bg-black text-white p-2 rounded-3xl cursor-pointer hover:bg-white hover:text-black">
                <ChangeAvatar
                  setUploadedImage={setUploadedImage}
                  uploadedImage={uploadedImage}
                />
              </div>
            </div>

            <h1 className="font-sans text-2xl mb-2">
              {form.getValues("fullName")}
            </h1>

            <h2 className="font-sans text-m mb-2">{form.getValues("email")}</h2>
            <div className="flex items-center  mb-2">
              <Label className=" mr-2">Phone: </Label>
              <p className="font-sans text-sm text-center">
                {form.getValues("phoneNumber")}
              </p>
            </div>
            <div className="flex items-center  mb-2">
              <Label className=" mr-2">Role: </Label>
              <p className="font-sans text-sm text-center font-bold">{role}</p>
            </div>
          </Card>
          <Card className="w-[68%] flex flex-col items-start justify-start h-[90%] border p-10">
            {/* <Label className="mb-4">Staff Information</Label> */}
            <div className="flex flex-col mb-4">
              <Label className="text-xl font-semibold">
                Personal Information
              </Label>
              <div className="text-slate-500 text-sm">
                This is some information about the user.
              </div>
            </div>

            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="border-yellowCustom text-white mb-2 text-m">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="shadcn@gmail.com"
                      {...field}
                      className="text-black mb-4"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between w-full">
              <div className="w-[48%]">
                <Label className="border-yellowCustom text-white mb-2 text-m">
                  Sex
                </Label>
                <Select value={sex} onValueChange={setSex}>
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder="Select your sex"
                      aria-label={sex}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[48%]">
                <Label className="border-yellowCustom text-white mb-2 text-m">
                  Role
                </Label>
                <Select value={role} onValueChange={setRole} disabled>
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder="Select your Role"
                      aria-label={role}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Staff">Staff</SelectItem>
                      <SelectItem value="Client">Client</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="border-yellowCustom text-white mb-2 text-m">
                    Phone
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0838631706"
                      {...field}
                      className="text-black mb-4"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="border-yellowCustom text-white mb-2 text-m">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="shadcn@gmail.com"
                      {...field}
                      className="text-black mb-4"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="w-full mb-4">
                  <FormLabel className="border-yellowCustom text-white mb-2 text-m">
                    Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="20A Le Lai"
                      {...field}
                      className="text-black mb-4"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Label className="text-m  mb-2">Password </Label>
            <div className="flex justify-between w-full items-center">
              <Input
                className="text-m mb-2 w-full"
                value={"20 A Le Lai"}
                type="password"
                readOnly
              />
              {/* <ChangePasswordForm /> */}
            </div>
            <div className="flex justify-end w-full">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="bg-black text-white hover:bg-slate-700">Save</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleSubmit(onSubmit)()}>
                    Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </Card>
        </form>
      </Form>
    </>
  );
};

export default UserDetails;
