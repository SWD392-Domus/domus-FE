import { Button } from "@/components/ui/Button/Button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/Dialog";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/Accordion/Accordion";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
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
import { PencilIcon } from "lucide-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from "react-router-dom";

interface Props { }

const ArticleDetails: React.FC<Props> = () => {
    const navigate = useNavigate();
    const { articleId } = useParams();
    const dispatch = useDispatch();
    const id: string = useSelector(selector.id);
    const name: string = useSelector(selector.name);
    const description: string = useSelector(selector.description);
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
                    dispatch(actions.getArticleInfo());
                    form.setValue("name", response.title);
                    setDesValue(response.content);
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
                <div className="my-7 text-2xl font-semibold">
                    Update Article - {name}
                </div>
                {updated && (
                    <div className="">
                        <div className="flex flex-row justify-between gap-10 min-h-[550px]">
                            <div className="lg:w-[30%] flex flex-col gap-2 pl-4">
                                <div className="mb-7 font-semibold text-black text-xl md:text-4xl">
                                    Update {name}
                                </div>
                                {/* Article Name Input Start */}
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="border-yellowCustom text-xl text-black mb-2">
                                                Article Title
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={name}
                                                    {...field}
                                                    className="mb-4"
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Article Name Input End*/}
                                <div className="mt-2">
                                    <Button
                                        variant={"yellowCustom"}
                                        className="cursor-pointer w-40"
                                        type="submit"
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col mb-10 gap-4">
                            <div className="font-semibold text-xl">Content</div>
                            <div className='w-full'>
                                <ReactQuill className="" theme="snow" value={desValue} placeholder="Content..."
                                    onChange={setDesValue}
                                ></ReactQuill>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </Form>
    );
};

export default ArticleDetails;
