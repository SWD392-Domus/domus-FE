import { Input } from "@/components/ui/Input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormMessage,
} from "@/components/ui/Form";

import React, { useState } from "react";
import ChangeAvatar from "./components/ChangeAvatar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button/Button";
import { CreateUserByAdmin } from "./usecases";
import { toast } from "@/components/ui/Toast/use-toast";

interface Image {
  file: File | null;
  imageUrl: string | null;
  isUpload: boolean;
}

const createUserSchema = z.object({
  // username: z.string().min(2).max(50),
  email: z.string().email(),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters",
    })
    .refine(
      (value) => {
        return /[A-Z]/.test(value) && /[!@#$%^&*(),.?":{}|<>]/.test(value);
      },
      {
        message:
          "Password must contain at least one uppercase letter and one special character",
      }
    ),
  fullName: z
    .string()
    .min(2, {
      message: "Full name must be at least 2 characters",
    })
    .max(50, {
      message: "Full name must be at most 50 characters",
    }),
  phoneNumber: z
    .string()
    .min(9, {
      message: "Phone number must be at least 9 characters",
    })
    .refine((value) => /^(?:[0-9-()/.]\s?){6,15}[0-9]{1}$/.test(value)),
  address: z
    .string()
    .min(2, {
      message: "Address must be at least 2 characters",
    })
    .max(100, {
      message: "Address must be at most 100 characters",
    }),
  role: z.string({
    required_error: "Please select a role.",
  }),
});

type Gender = "Male" | "Female" | "Others" | "";
const CreateUser: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<Image | null>(null);
  const [gender, setGender] = useState<Gender>("");
  // const [role, setRole] = useState<Role>("Client");
  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      phoneNumber: "",
      address: "",
    },
  });
  async function onSubmit(values: z.infer<typeof createUserSchema>) {
    const dataSent = {
      ...values,
      profileImage: uploadedImage?.imageUrl,
      userName: values.email,
      gender: gender,
    };
    console.log(dataSent);
    try {
      const res = await CreateUserByAdmin(dataSent);
      console.log(res.data.statusCode);
      if (res.data.isSuccess) {
        toast({
          variant: "success",
          title: "Create Successfully",
          description: "Create Successfully",
        });
      }
      if (res.data.statusCode === 409) {
        toast({
          variant: "destructive",
          title: "Error",
          description: `${res.data.messages[0].content}`,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
      });
    }
  }
  const handleGenderChange = (selectedGender: Gender) => {
    setGender(selectedGender);
    console.log(selectedGender);
  };
  return (
    <div>
      <h1 className="font-bold text-xl mt-2">Create User</h1>
      <h1 className="text-sm text-slate-500">
        Fill in some information about the user.
      </h1>
      <div className=" mr-72">
        <div className="flex container items-start my-10">
          <div className="w-full">
            <div className="mt-2">
              <div className="relative w-56">
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
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="mx-5 my-5"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <label className="relative block p-3 border-2 my-2 border-slate-300 rounded">
                          <span className="text-md font-semibold text-zinc-900">
                            Email
                          </span>
                          <FormControl>
                            <Input
                              {...field}
                              className="w-full border-none shadow-none bg-transparent p-0 text-sm  text-gray-500 focus-visible:ring-0 focus:outline-none"
                              id="name"
                              type="text"
                              placeholder="Your email"
                            />
                          </FormControl>
                          <FormMessage />
                        </label>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <label className="relative block p-3 border-2 my-2 border-slate-300 rounded">
                          <span className="text-md font-semibold text-zinc-900">
                            Password
                          </span>
                          <FormControl>
                            <Input
                              {...field}
                              className="w-full border-none shadow-none bg-transparent p-0 text-sm  text-gray-500 focus-visible:ring-0 focus:outline-none"
                              id="name"
                              type="text"
                              placeholder="Your password"
                            />
                          </FormControl>
                          <FormMessage />
                        </label>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <label className="relative block p-3 border-2 my-2 border-slate-300 rounded">
                          <span className="text-md font-semibold text-zinc-900">
                            Full Name
                          </span>
                          <FormControl>
                            <Input
                              {...field}
                              className="w-full border-none shadow-none bg-transparent p-0 text-sm  text-gray-500 focus-visible:ring-0 focus:outline-none"
                              id="name"
                              type="text"
                              placeholder="Your name"
                            />
                          </FormControl>
                          <FormMessage />
                        </label>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <label className="relative block p-3 border-2 my-2 border-slate-300 rounded">
                          <span className="text-md font-semibold text-zinc-900">
                            Phone number
                          </span>
                          <FormControl>
                            <Input
                              {...field}
                              className="w-full border-none shadow-none bg-transparent p-0 text-sm  text-gray-500 focus-visible:ring-0 focus:outline-none"
                              id="name"
                              type="text"
                              placeholder="Your name"
                            />
                          </FormControl>
                          <FormMessage />
                        </label>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <label className="relative block p-3 border-2 my-2 border-slate-300 rounded">
                          <span className="text-md font-semibold text-zinc-900">
                            Address
                          </span>
                          <FormControl>
                            <Input
                              {...field}
                              className="w-full border-none shadow-none bg-transparent p-0 text-sm  text-gray-500 focus:outline-none"
                              id="name"
                              type="text"
                              placeholder="Your address"
                            />
                          </FormControl>
                          <FormMessage />
                        </label>
                      </FormItem>
                    )}
                  />
                  <label className="relative block p-3 border-2 my-2 border-slate-300 rounded">
                    <span className="text-md font-semibold text-zinc-900">
                      Role
                    </span>
                    <div className="mt-2">
                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-[200px]">
                                  <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="CLIENT">Client</SelectItem>
                                <SelectItem value="STAFF">Staff</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </label>
                  <label className="relative block p-3 border-2 my-2 border-slate-300 rounded">
                    <span className="text-md font-semibold text-zinc-900">
                      Gender{" "}
                      <span className="text-xs text-zinc-900">(optional)</span>
                    </span>
                    <div className="mt-2">
                      <Select
                        onValueChange={(value: Gender) =>
                          handleGenderChange(value)
                        }
                      >
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Gender</SelectLabel>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Others">Others</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </label>
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
