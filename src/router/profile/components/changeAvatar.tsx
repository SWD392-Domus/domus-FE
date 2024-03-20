import React from "react";
import {
    DialogDescription,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
interface Image {
    file: File | null;
    imageUrl: string | null;
    isUpload: boolean;
}
interface Props {
    uploadedImage: Image | null;
    setUploadedImage: React.Dispatch<React.SetStateAction<Image | null>>;
}

const ChangeAvatar: React.FC<Props> = ({ uploadedImage, setUploadedImage }) => {
    const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Get the first file only
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setUploadedImage({ file, imageUrl, isUpload: true });
        }
        console.log(file);
    };

    const handleDelete = () => {
        setUploadedImage(null);
    };
    return (
        <div className="w-[15px] h-[15px] flex items-center justify-center">
            <Dialog>
                <DialogTrigger className="underline" type="button">
                    <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] w-[800px]">
                    <DialogHeader>
                        <DialogTitle>Change password</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when
                            you're done.
                        </DialogDescription>
                    </DialogHeader>

                    <Input
                        className="mb-4"
                        id="picture"
                        type="file"
                        onChange={handleAddImage}
                    />
                    {uploadedImage ? (
                        <div className="flex flex-wrap">
                            <Card className="border m-2 p-2 relative">
                                <img
                                    src={uploadedImage.imageUrl as string}
                                    width={300}
                                    height={300}
                                    className="object-contain"
                                />
                                <div
                                    className="absolute rounded-xl top-0 bg-red-500 text-white p-1 right-0 cursor-pointer hover:bg-black"
                                    onClick={handleDelete}
                                >
                                    <svg
                                        width="15"
                                        height="15"
                                        viewBox="0 0 15 15"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                                            fill="currentColor"
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                            </Card>
                        </div>
                    ) : (
                        <div className="w-full text-center">
                            No Image uploaded
                        </div>
                    )}

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="submit">Save</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ChangeAvatar;
