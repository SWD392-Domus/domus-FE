import { DataTable } from "./components/Table";
import { columns, data } from "./components/Table/column";
import {
    userInfo,
    quotationInfo,
    negoNum,
    staffInfo,
    negoList,
} from "./constants";
import {
    EnvelopeClosedIcon,
    HomeIcon,
    PersonIcon,
    ChatBubbleIcon,
} from "@radix-ui/react-icons";
import { Textarea } from "@/components/ui/Textarea";
import {
    SendButton,
    UpdateButton,
    DeleteButton,
    MakeContractButton,
} from "./components/Button";

import React, { useEffect, useState } from "react";
import { getQuotationById } from "./usecase";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import selector from "./slice/selector";
import { actions } from "./slice";
import { Avatar } from "@/components/ui/Avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

interface Props {
    // define your props here
}

const QuotationDetail: React.FC<Props> = () => {
    const { quotationId } = useParams();
    const dispatch = useDispatch();
    const id: string = useSelector(selector.id);
    const customer: any = useSelector(selector.customer);
    const staff: any = useSelector(selector.staff);
    const status: string = useSelector(selector.status);
    const totalPrice: number = useSelector(selector.totalPrice);
    const expireAt: string = useSelector(selector.expireAt);
    const products: any[] = useSelector(selector.products);
    const negotiationLog: any = useSelector(selector.negotiationLog);

    const [updated, setUpdated] = useState(false);

    // const location = useLocation();
    // const navigate = useNavigate();

    async function fetchData() {
        if (quotationId) {
            try {
                const response = await getQuotationById(quotationId);
                console.log(response);

                if (response) {
                    dispatch(actions.setQuotation(response));
                    // console.log(response)
                    dispatch(actions.getQuotationInfo());
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

    return (
        <>
            {updated && (
                <div className="flex flex-row flex-wrap">
                    <div className="left-side-2 basis-1/3">
                        <div className="my-7 text-2xl font-semibold">
                            {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "VND",
                            }).format(totalPrice)}
                        </div>
                        <MakeContractButton></MakeContractButton>
                        <div className="staff-assigned-info my-7">
                            <div className="mb-2">Assigned Staff</div>
                            <div className="flex flex-row mb-2">
                                <Avatar>
                                    <AvatarImage src={staff.profileImage} />
                                </Avatar>

                                <span className="my-auto font-medium">
                                    {staff.userName}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="right-side-2 basis-2/3">
                        <div className="border-solid border-b-2 border-zinc-400">
                            <div className="general-info">
                                <div className="my-7 text-2xl font-semibold">
                                    Quotation - {id}
                                </div>
                                <div className="flex flex-row flex-wrap">
                                    <div className="left-side-3 basis-1/3">
                                        <div className="text-sm font-semibold mr-5 mb-1 pb-1 border-solid border-b-2 border-zinc-400">
                                            Sales Information
                                        </div>
                                        <div className="text-xs mb-1 ">
                                            <div className="flex flex-row">
                                                <div className="font-semibold mr-1">
                                                    Request Date
                                                </div>
                                                <p>
                                                    {new Date(
                                                        expireAt
                                                    ).toDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-xs">
                                            <div className="flex flex-row">
                                                <div className="font-semibold mr-1">
                                                    Exprie Date
                                                </div>
                                                <p>
                                                    {" "}
                                                    {new Date(
                                                        expireAt
                                                    ).toDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="right-side-3 basis-2/3 font-sans">
                                        <div className="text-sm font-semibold mr-5 mb-1 pb-1 border-solid border-b-2 border-zinc-400">
                                            Customer Information
                                        </div>
                                        <div className=" flex flex-row mb-1">
                                            <Avatar className="mr-2">
                                                <AvatarImage
                                                    className="w-full"
                                                    src={customer.profileImage}
                                                />
                                            </Avatar>
                                            <span className="my-auto font-medium font-sans">
                                                {customer.fullName}
                                            </span>
                                        </div>
                                        <div className="user-info-body text-sm">
                                            <div className="mail-info flex flex-row mb-1">
                                                <HomeIcon className="my-auto mr-2" />
                                                <span className="font-sans">
                                                    {customer.address
                                                        ? customer.address
                                                        : "N/A"}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="user-info-body text-sm">
                                            <div className="mail-info flex flex-row mb-1">
                                                <EnvelopeClosedIcon className="my-auto mr-2" />
                                                <span className="">
                                                    {customer.email}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="user-info-body text-sm">
                                            <div className="phone-info flex flex-row mb-1">
                                                <PersonIcon className="my-auto mr-2" />
                                                <span className="">
                                                    {customer.phoneNumber}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="detail-table">
                                <div className="mt-7 text-xl font-semibold">
                                    Details
                                </div>
                                <div className="mx-auto py-5">
                                    <DataTable
                                        columns={columns}
                                        data={products}
                                    />
                                    <div className="p-2 flex flex-row justify-between font-semibold border-b-2 border-zinc-100">
                                        <div className="total-price-title mx-11">
                                            Total Price
                                        </div>
                                        <div className="total-price-amount">
                                            {new Intl.NumberFormat("en-US", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(quotationInfo.totalPrice)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="action-buttons mb-2 flex flex-row justify-center space-x-2">
                                <UpdateButton></UpdateButton>
                                <DeleteButton></DeleteButton>
                                <MakeContractButton></MakeContractButton>
                            </div>
                        </div>
                        <div className="nego-info">
                            <div className="my-3 text-2xl font-semibold">
                                Negotiation History
                            </div>
                            <div className="nego-info-body text-sm">
                                <div className="mail-info flex flex-row mb-1">
                                    <ChatBubbleIcon className="my-auto mr-2" />
                                    <span className="">
                                        {negotiationLog?.messages?.length}{" "}
                                        negotiation chats
                                    </span>
                                </div>
                            </div>
                            <div className="my-5">
                                <div className="flex flex-row mb-2">
                                    <img
                                        src={staff.profileImage}
                                        alt=""
                                        className="h-10 w-10 bg-gray-300 mr-2"
                                    />
                                    <Textarea></Textarea>
                                </div>
                                <div className="flex justify-end">
                                    <SendButton></SendButton>
                                </div>
                            </div>

                            {negotiationLog?.messages?.map((nego: any) =>
                                nego.isCustomerMessage ? (
                                    <div className="flex flex-row my-5">
                                        <img
                                            src={customer.profileImage}
                                            alt=""
                                            className="h-10 w-10 bg-gray-300 mr-2"
                                        />

                                        <div className="nego-detail">
                                            <span className="my-auto font-medium">
                                                {customer.userName}
                                            </span>

                                            <div className="date-info text-xs">
                                                Published on {nego.sentAt}
                                            </div>

                                            <div className="cmt-info text-sm">
                                                {nego.content}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-row my-5">
                                        <img
                                            src={staff.profileImage}
                                            alt=""
                                            className="h-10 w-10 bg-gray-300 mr-2"
                                        />

                                        <div className="nego-detail">
                                            <span className="my-auto font-medium">
                                                {staff.userName}
                                            </span>

                                            <div className="date-info text-xs">
                                                Published on {nego.sentAt}
                                            </div>

                                            <div className="cmt-info text-sm">
                                                {nego.content}
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default QuotationDetail;
