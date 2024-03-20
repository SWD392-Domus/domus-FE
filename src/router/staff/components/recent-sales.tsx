import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";

interface Props {
    // define your props here
    contracts: any[],
}

export const RecentSales: React.FC<Props> = (props) => {
    return (
        <div className="space-y-8">
            {
                props.contracts.map((contract) => {
                    return (
                        <div className="flex items-center">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={contract?.staff?.profileImage} alt="Avatar" />
                                <AvatarFallback>OM</AvatarFallback>
                            </Avatar>
                            <div className="ml-4 space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {contract?.staff?.fullName || "Anonymous Name"}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {contract?.staff?.email || "anonymous@gmail.com"}
                                </p>
                            </div>
                            <div className="ml-auto font-medium">
                                {
                                    new Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(contract?.totalPrice) || ""}đ</div>
                        </div>
                    )
                })
            }
        </div>
    );
}
