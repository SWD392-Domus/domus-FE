import React from "react";
import { DataTable } from "./Table/quotationNew";
import { columns, data } from './Table/quotationNew/column'
import { userInfo, quotationInfo, staffInfo } from "../constants"
// import { EnvelopeClosedIcon, HomeIcon, PersonIcon } from "@radix-ui/react-icons"
import { DatePickerWithPresets } from "./DateInput"
// import { Textarea } from "@/components/ui/Textarea"
import { CreateButton } from "./Button";
import { ComboBoxResponsive } from "./ComboBox";

interface Props {
    // define your props here
}

const StaffNewQuotation: React.FC<Props> = () => {
    return (
        <>
            <div className="flex flex-row flex-wrap justify-center mb-5">
                <div className="right-side-2 basis-2/3">
                    <div className="">
                        <div className="general-info">
                            <div className="my-7 text-2xl font-semibold">
                                New Quotation
                            </div>
                            <div className="flex flex-row flex-wrap">
                                <div className="left-side-3 basis-1/3">
                                    <div className="text-sm font-semibold mr-5 mb-1 pb-1 border-solid border-b-2 border-zinc-400">
                                        Sales Information
                                    </div>
                                    <div className="text-xs mb-1 ">
                                        <div className="flex flex-row">
                                            <div className="font-semibold mr-1 my-auto w-[100px]">Beginning Date</div>
                                            <DatePickerWithPresets></DatePickerWithPresets>
                                        </div>
                                    </div>
                                    <div className="text-xs">
                                        <div className="flex flex-row">
                                            <div className="font-semibold mr-1 my-auto w-[100px]">Ending Date</div>
                                            <DatePickerWithPresets></DatePickerWithPresets>
                                        </div>
                                    </div>
                                </div>
                                <div className="right-side-3 basis-1/3">
                                    <div className="text-sm font-semibold mr-5 mb-1 pb-1 border-solid border-b-2 border-zinc-400">
                                        Customer
                                    </div>
                                    <div className="ava-header flex flex-row mb-1">
                                        <img src={userInfo.avaLink} alt="" className="h-10 w-10 bg-gray-300 mr-2" />
                                        <ComboBoxResponsive></ComboBoxResponsive>
                                    </div>
                                    {/* <div className="user-info-body text-sm">
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
                                    </div> */}
                                </div>
                                <div className="right-side-3 basis-1/3">
                                    <div className="text-sm font-semibold mr-5 mb-1 pb-1 border-solid border-b-2 border-zinc-400">
                                        Assigned Staff
                                    </div>
                                    <div className="ava-header flex flex-row mb-1">
                                        <img src={staffInfo.avaLink} alt="" className="h-10 w-10 bg-gray-300 mr-2" />
                                        <span className="my-auto font-medium">{staffInfo.name}</span>
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
                    </div>
                    <div className="flex justify-end">
                        <CreateButton></CreateButton>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StaffNewQuotation