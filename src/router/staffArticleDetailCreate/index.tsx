import { Button } from "@/components/ui/Button/Button";
import React, { useState } from "react";
import { createArticle } from "./usecase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import selector from "./slice/selector";
import { actions } from "./slice";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/components/ui/Toast/use-toast";
import { ToastAction } from "@/components/ui/Toast/toast";
import { Input } from "@/components/ui/Input";
// import { PencilIcon } from "lucide-react";
// import { Label } from "@/components/ui/Label";
// import { Label } from "@/components/ui/Label";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Props { }

const StaffArticleDetailCreate: React.FC<Props> = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const name: string = useSelector(selector.name);
    const description: string = useSelector(selector.description);
    const [desValue, setDesValue] = useState("");

    const { toast } = useToast();

    const formSchema = z.object({
        name: z.string().nonempty({ message: "Title is required" }),
        description: z.string().nonempty({ message: "Content is required" }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: name,
            description: description,
        },
    });
    async function onSubmit(values: z.infer<typeof formSchema>) {

        const res = await createArticle({
            articleCategoryId: "F3EE89E5-F0C0-4854-A29B-B67EAB41CAC3",
            title: values.name,
            content: desValue
        });
        if (res === 200) {
            toast({
                variant: "success",
                title: "Update Successfully.",
                description: "An article was created.",
                action: <ToastAction altText="Close">Close</ToastAction>,
            });
            dispatch(actions.resetArticle());
            navigate(`/staff/articles`);
        } else {
            toast({
                variant: "destructive",
                title: "Fail to Update.",
                description: "There was a problem with your request.",
                action: (
                    <ToastAction altText="Try again">Try again</ToastAction>
                ),
            });
            dispatch(actions.resetArticle());
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {true && (
                    <div className="min-h-[550px]">
                        <div className="flex flex-col gap-2 pl-4">
                            <div className="mt-7 mb-5 text-2xl font-semibold">
                                Create new Article
                            </div>
                            {/* Article Name Input Start */}
                            <div className="max-w-96 mb-7">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="border-yellowCustom text-xl text-black">
                                                Article Title
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={"Title..."}
                                                    {...field}
                                                    className=""
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {/* Article Name Input End*/}
                            <div className="flex flex-col mb-4 gap-4">
                                <div className="flex justify-between max-w-96">
                                    <div className="font-semibold text-xl">Content</div>
                                    <div className="">
                                        <Button
                                            variant={"yellowCustom"}
                                            className="cursor-pointer w-40"
                                            type="submit"
                                        >
                                            Save Article
                                        </Button>
                                    </div>
                                </div>
                                <div className='w-full'>
                                    <ReactQuill className="" theme="snow" value={desValue} placeholder="Content..."
                                        onChange={setDesValue}
                                    ></ReactQuill>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </Form>
    );
};

export default StaffArticleDetailCreate;
