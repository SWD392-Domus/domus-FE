import { Button } from "@/components/ui/Button/Button";
// import { FaDeleteLeft } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import { getArticleById } from "./usecase";
import { useParams } from "react-router-dom";
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
import { updateArticle } from "./usecase";
import { useToast } from "@/components/ui/Toast/use-toast";
import { ToastAction } from "@/components/ui/Toast/toast";
import { Input } from "@/components/ui/Input";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from "react-router-dom";

interface Props { }

const ArticleDetails: React.FC<Props> = () => {
    const navigate = useNavigate();
    const { articleId } = useParams();
    const dispatch = useDispatch();
    const id: string = useSelector(selector.id);
    const name: string = useSelector(selector.title);
    const description: string = useSelector(selector.content);
    const [desValue, setDesValue] = useState("");
    const [updated, setUpdated] = useState(false);
    const { toast } = useToast();

    async function fetchData() {
        if (articleId) {
            try {
                const response = await getArticleById(articleId);
                if (response) {
                    dispatch(actions.setArticle(response));
                    // console.log(response)
                    // dispatch(actions.getArticleInfo());
                    form.setValue("name", response.title);
                    setDesValue(response.content);
                    form.setValue("description", response.content);
                    setUpdated(true);
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

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
        const res = await updateArticle(id, { title: values.name, content: desValue });
        if (res === 200) {
            toast({
                variant: "success",
                title: "Update Successfully.",
                description: "A article was updated.",
                action: <ToastAction altText="Close">Close</ToastAction>,
            });
            navigate(`/staff/articles/${articleId}`)
        } else {
            toast({
                variant: "destructive",
                title: "Fail to Update.",
                description: "There was a problem with your request.",
                action: (
                    <ToastAction altText="Try again">Try again</ToastAction>
                ),
            });
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {updated && (
                    <div className="min-h-[550px]">
                        <div className="flex flex-col gap-2 pl-4">
                            <div className="mt-7 mb-5 text-2xl font-semibold">
                                Update Article - {name}
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
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {/* Article Name Input End*/}
                            <div className="flex flex-col mb-4 gap-4">
                                <div className="flex justify-between">
                                    <div className="font-semibold text-xl">Content</div>
                                    <div className="">
                                        <Button
                                            variant={"yellowCustom"}
                                            className="cursor-pointer w-40"
                                            type="submit"
                                        >
                                            Update
                                        </Button>
                                    </div>
                                </div>
                                <div className='w-full'>
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <ReactQuill
                                                        theme="snow"
                                                        placeholder="Content..."
                                                        {...field}
                                                    ></ReactQuill>
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </Form>
    );
};

export default ArticleDetails;
