import React from "react";
import { useParams } from "react-router-dom"
import { DataTable } from "@/components/ui/Table";
import { columns, data } from './Table/quotationDetail/column'
import { userInfo, quotationInfo, negoNum, staffInfo, negoList } from "../constants"
import { EnvelopeClosedIcon, HomeIcon, PersonIcon, ChatBubbleIcon } from "@radix-ui/react-icons"
import { Textarea } from "@/components/ui/Textarea"
import { AcceptButton, DeclineButton, NegotiateButton, SendButton } from "./Button";

interface Props {
    // define your props here
}

const QuotationDetail: React.FC<Props> = () => {
    const { quotationId } = useParams();
    return (
        <>
            <div className="flex flex-row flex-wrap">
                <div className="left-side-2 basis-1/3">
                    <div className="my-7 text-2xl font-semibold">
                        {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "VND",
                        }).format(quotationInfo.totalPrice)}
                    </div>
                    <AcceptButton></AcceptButton>
                    <div className="staff-assigned-info my-7">
                        <div className="mb-2">Your assigned staff</div>
                        <div className="flex flex-row mb-2">
                            <img src={staffInfo.avaLink} alt="" className="h-10 w-10 bg-gray-300 mr-2" />
                            <span className="my-auto font-medium">{staffInfo.name}</span>
                        </div>
                    </div>
                </div>
                <div className="right-side-2 basis-2/3">
                    <div className="border-solid border-b-2 border-zinc-400">
                        <div className="general-info">
                            <div className="my-7 text-2xl font-semibold">
                                Quotation - {quotationId}
                            </div>
                            <div className="flex flex-row flex-wrap">
                                <div className="left-side-3 basis-1/3">
                                    <div className="text-sm font-semibold mr-5 mb-1 pb-1 border-solid border-b-2 border-zinc-400">
                                        Sales Information
                                    </div>
                                    <div className="text-xs mb-1 ">
                                        <div className="flex flex-row">
                                            <div className="font-semibold mr-1">Beginning Date</div>
                                            <p>{quotationInfo.beginDate}</p>
                                        </div>
                                    </div>
                                    <div className="text-xs">
                                        <div className="flex flex-row">
                                            <div className="font-semibold mr-1">Ending Date</div>
                                            <p>{quotationInfo.endDate}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="right-side-3 basis-2/3">
                                    <div className="text-sm font-semibold mr-5 mb-1 pb-1 border-solid border-b-2 border-zinc-400">
                                        Shipping Point
                                    </div>
                                    <div className="ava-header flex flex-row mb-1">
                                        <img src={userInfo.avaLink} alt="" className="h-10 w-10 bg-gray-300 mr-2" />
                                        <span className="my-auto font-medium">{userInfo.name}</span>
                                    </div>
                                    <div className="user-info-body text-sm">
                                        <div className="mail-info flex flex-row mb-1">
                                            <HomeIcon className="my-auto mr-2" />
                                            <span className="">{userInfo.address}</span>
                                        </div>
                                    </div>
                                    <div className="user-info-body text-sm">
                                        <div className="mail-info flex flex-row mb-1">
                                            <EnvelopeClosedIcon className="my-auto mr-2" />
                                            <span className="">{userInfo.email}</span>
                                        </div>
                                    </div>
                                    <div className="user-info-body text-sm">
                                        <div className="phone-info flex flex-row mb-1">
                                            <PersonIcon className="my-auto mr-2" />
                                            <span className="">{userInfo.phone}</span>
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
                                <DataTable columns={columns} data={data} />
                                <div className="p-2 flex flex-row justify-between font-semibold border-b-2 border-zinc-100">
                                    <div className="total-price-title mx-11">Total Price</div>
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
                            <AcceptButton></AcceptButton>
                            <NegotiateButton></NegotiateButton>
                            <DeclineButton></DeclineButton>
                        </div>

                    </div>
                    <div className="nego-info">
                        <div className="my-3 text-2xl font-semibold">
                            Negotiation History
                        </div>
                        <div className="nego-info-body text-sm">
                            <div className="mail-info flex flex-row mb-1">
                                <ChatBubbleIcon className="my-auto mr-2" />
                                <span className="">{negoNum} negotiation chats</span>
                            </div>
                        </div>
                        <div className="my-5">
                            <div className="flex flex-row mb-2">
                                <img src={userInfo.avaLink} alt="" className="h-10 w-10 bg-gray-300 mr-2" />
                                <Textarea>
                                </Textarea>
                            </div>
                            <div className="flex justify-end">
                                <SendButton></SendButton>
                            </div>
                        </div>

                        {negoList.map((nego) => (
                            <div className="flex flex-row my-5">
                                <img src={nego.staffInfo.avaLink} alt="" className="h-10 w-10 bg-gray-300 mr-2" />
                                <div className="nego-detail">
                                    <span className="my-auto font-medium">{nego.staffInfo.name}</span>
                                    <div className="date-info text-xs">Published on{nego.time}</div>
                                    <div className="cmt-info text-sm">{nego.content}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default QuotationDetail