import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "@/components/ui/Toast/use-toast";
import { Label } from "@radix-ui/react-label";
import React, { useRef, useState, ChangeEvent } from "react";

interface Props {
    // define your props here
}
function base64ToBlob(base64String: string, contentType: string): Blob {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
}

// Convert Blob to File
function blobToFile(blob: Blob, fileName: string): File {
    const file = new File([blob], fileName, { type: blob.type });
    return file;
}

import SignatureCanvas from "react-signature-canvas";
import { signContract } from "../usecase/signContract";
import { useParams } from "react-router-dom";
const SignatureComponents: React.FC<Props> = () => {
    const { contractId } = useParams();
    const [fullName, setFullName] = useState("");
    const signatureRef = useRef<SignatureCanvas>(null);
    const clearSignature = () => {
        signatureRef?.current?.clear();
    };
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFullName(e.target.value);
    };
    const saveSignature = async () => {
        const signatureData = signatureRef?.current?.toDataURL();
        if (!signatureData && !fullName.trim()) {
            toast({
                variant: "destructive",
                title: "Signature and Full Name are missing",
                description: "Please provide your signature and full name.",
            });
            return;
        }

        if (!signatureData) {
            toast({
                variant: "destructive",
                title: "Your Signature seems to be missing",
                description: "Try again with your signature.",
            });
            return;
        }

        if (!fullName.trim()) {
            toast({
                variant: "destructive",
                title: "Your Full Name seems to be missing",
                description: "Please provide your full name.",
            });
            return;
        }
        const base64Data = signatureData.split(",")[1]; // Remove the prefix
        const blob = base64ToBlob(base64Data, "image/png"); // Adjust content type as per your base64 string
        const file = blobToFile(blob, "filename.png"); // Provide a filename for the file
        // Both signature and full name are not empty, proceed with saving
        const formData = new FormData();
        formData.append("FullName", fullName);
        formData.append("Signature", file);
        try {
            const res = await signContract(contractId as string, formData);
            if (res.data.isSuccess) {
                toast({
                    variant: "success",
                    title: `Sign Contract Sucessfully`,
                    description: "",
                });
                setTimeout(() => { window.location.reload(); }, 1500);
            } else {
                toast({
                    variant: "destructive",
                    title: `${res.data.messages[0].content}`,
                    description: "There was a problem with your request.",
                });
            }
        } catch {
            toast({
                variant: "destructive",
                title: "There is something wrong, please try again",
                description: "There was a problem with your request.",
            });
        }
    };

    return (
        <div className="flex flex-col items-center w-full">
            <SignatureCanvas
                ref={signatureRef}
                canvasProps={{
                    className: "border border-gray-400 mt-4 ",
                    width: 500, // Adjust width as needed
                    height: 300, // Adjust height as needed
                }}
            />
            <div className="w-[80%] mt-4">
                <Label className="text-black font-medium text-md mt-4">
                    Your Full Name
                </Label>
                <Input
                    className="text-black"
                    value={fullName}
                    onChange={handleChange}
                />
            </div>
            <div className="flex mt-4 w-full justify-center">
                <Button
                    onClick={clearSignature}
                    variant={"default"}
                    className="mr-2"
                >
                    Clear
                </Button>
                <Button
                    variant={"yellowCustom"}
                    onClick={saveSignature}
                    className="text-black"
                >
                    Confirm
                </Button>
            </div>
        </div>
    );
};

export default SignatureComponents;
