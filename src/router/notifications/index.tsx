import { Avatar, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button/Button";
import { notificationApi } from "@/utils/api/notificationApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Props {
    // define your props here
}
export type NotificationType = {
    content: string;
    image: string;
    recipientId: string;
    redirectString: string;
    sentAt: string;
    status: number;
};

const Notification: React.FC<Props> = () => {
    const [notifcations, setNotifications] = useState<NotificationType[]>([]);
    const [size, setSize] = useState(5);
    useEffect(() => {
        const fetchData = async () => {
            const token = `Bearer ${localStorage.getItem("Token")}`;
            const res = await notificationApi.getNotification(token, size);
            setNotifications(res.data.data.items);
        };
        fetchData();
    }, [size]);
    return (
        <div className="flex flex-col items-center ">
            <h1 className="font-medium text-3xl  uppercase  mb-8">
                Notification List
            </h1>
            <div className="flex flex-col items-center w-full">
                {notifcations.map((item) => {
                    return (
                        <Link
                            replace
                            to={"/" + item.redirectString}
                            key={item.sentAt}
                            className="h-[80px] w-[80%] flex  hover:bg-slate-100 rounded cursor-pointer items-center my-2 "
                        >
                            <Avatar className="h-[80px] w-[80px] mr-4">
                                <AvatarImage src={item.image} />
                            </Avatar>
                            <h1 className="font-medium text-xl">
                                {item.content}
                            </h1>
                        </Link>
                    );
                })}
            </div>
            <div className="w-full flex justify-center">
                <Button
                    variant={"yellowCustom"}
                    onClick={() => setSize(size + 5)}
                >
                    View More
                </Button>
            </div>
        </div>
    );
};

export default Notification;
