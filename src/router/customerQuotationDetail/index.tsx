import {
    EnvelopeClosedIcon,
    HomeIcon,
    PersonIcon,
} from "@radix-ui/react-icons";

import { DeleteButton, MakeContractButton } from "./components/Button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select";
import React, { useEffect, useState } from "react";
import { getQuotationById } from "./usecase";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import selector from "./slice/selector";
import { actions } from "./slice";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { DataTable } from "./components/ServiceTable";
import { column } from "./components/Table/column";

import { serviceColums } from "./components/ServiceTable/column";

import { ProductDetailProps, ServiceProps } from "./types";
import { Badge } from "@/components/ui/Badge";
import QuotationEdit from "./components/QuotationEdit";

import Negotiation from "./components/Neogitation";
import Loading from "@/components/PublicComponents/Loading";
import { getQuotationRevisions } from "./service/getQuotationRevisions";
import { getQuotationDetailByVersionService } from "./service/getQuotationByVersionService";

interface Props {
    // define your props here
}
export interface CellValues {
    [key: string]: {
        [key: string]: string;
    };
}
export interface VersionType {
    id: string;
    version: number;
    createdAt: string;
}
const QuotationDetail: React.FC<Props> = () => {
    const [set, setSet] = useState<any>(null);
    const [isEdit, setEdit] = useState(false);
    const { quotationId, versionId } = useParams();
    const dispatch = useDispatch();
    const id: string = useSelector(selector.id);
    const customer: any = useSelector(selector.customer);
    const staff: any = useSelector(selector.staff);
    const status: string = useSelector(selector.status);
    const totalPrice: number = useSelector(selector.totalPrice);
    const expireAt: string = useSelector(selector.expireAt);
    const products: any[] = useSelector(selector.products);
    const negotiationLog: any = useSelector(selector.negotiationLog);
    const services: any = useSelector(selector.services);
    const [updated, setUpdated] = useState(false);
    const initalValues: CellValues = {};
    const serviceInitialValues: CellValues = {};
    const [render, setRender] = useState(1);
    const navigate = useNavigate();
    const [versions, setVersions] = useState<VersionType[]>([]);
    useEffect(() => {
        let isMounted = true;

        const fetchDataAndUpdateCellValues = async () => {
            if (quotationId && isMounted) {
                try {
                    var response;
                    const token = `${localStorage.getItem("Token")}`;
                    if (versionId) {
                        response = await getQuotationDetailByVersionService(
                            quotationId,
                            versionId,
                            token as string
                        );
                    } else {
                        response = await getQuotationById(quotationId);
                    }

                    if (response) {
                        setSet(response.package);
                        dispatch(actions.setQuotation(response));
                        dispatch(actions.getQuotationInfo());
                        setUpdated(true);
                        const fetchedProducts: ProductDetailProps[] =
                            response.products;
                        const fetchedServices: ServiceProps[] =
                            response.services;

                        fetchedProducts.forEach((product, index) => {
                            const productCellValues: any = {}; // Use 'any' for dynamic keys
                            Object.entries(product).forEach(([key, value]) => {
                                productCellValues[key] = String(value); // Convert all values to strings
                            });
                            initalValues[index.toString()] = productCellValues;
                        });
                        fetchedServices.forEach((service, index) => {
                            const serviceCellValues: any = {}; // Use 'any' for dynamic keys
                            Object.entries(service).forEach(([key, value]) => {
                                serviceCellValues[key] = String(value); // Convert all values to strings
                            });
                            serviceInitialValues[index.toString()] =
                                serviceCellValues;
                        });
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        };

        const fetchVersions = async () => {
            const token = localStorage.getItem("Token");
            const res = await getQuotationRevisions(
                quotationId as string,
                token as string
            );

            setVersions(res.data.data);
        };
        fetchVersions();
        fetchDataAndUpdateCellValues();

        // Cleanup function to prevent memory leaks
        return () => {
            isMounted = false;
        };
    }, [quotationId, render, versionId]);

    return (
        <>
            {updated && (
                <div className="flex flex-row ">
                    <div className="left-side-2 basis-1/3">
                        <div className="my-7 text-2xl font-semibold">
                            {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "VND",
                            }).format(totalPrice)}
                        </div>
                        <div className="my-4 flex ">
                            <Badge className="text-sm">{status}</Badge>
                        </div>

                        {!versionId && (
                            <MakeContractButton
                                id={id}
                                status={status}
                            ></MakeContractButton>
                        )}
                        <div className="staff-assigned-info my-7">
                            <div className="mb-2">Assigned Staff</div>
                            <div
                                className="flex flex-row 
                            "
                            >
                                <Avatar className="mr-2">
                                    <AvatarImage src={staff.profileImage} />
                                    <AvatarFallback>Staff</AvatarFallback>
                                </Avatar>

                                <h2 className="my-auto font-medium">
                                    {staff.userName}
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="right-side-2 basis-2/3">
                        <div className="border-solid border-b-2 border-zinc-400">
                            <div className="general-info flex flex-col items-center">
                                <div className="flex justify-between items-center w-full">
                                    <div className="my-7 text-2xl font-semibold w-full">
                                        Quotation #{quotationId?.slice(0, 3)}
                                    </div>
                                    {versions && (
                                        <Select
                                            onValueChange={(value) => {
                                                if (value != "back") {
                                                    navigate(
                                                        `/customer/settings/quotations/${quotationId}/versions/${value}`,
                                                        {
                                                            replace: true,
                                                        }
                                                    );
                                                } else {
                                                    navigate(
                                                        `/customer/settings/quotations/${quotationId}`
                                                    );
                                                }
                                            }}
                                            defaultValue={versionId}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select a Version" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>
                                                        Versions
                                                    </SelectLabel>
                                                    <SelectItem value={"back"}>
                                                        Back to Negotiating
                                                        Quotation
                                                    </SelectItem>
                                                    {versions.map(
                                                        (
                                                            version: VersionType,
                                                            index: number
                                                        ) => {
                                                            let name =
                                                                "Version " +
                                                                version.version +
                                                                " " +
                                                                new Date(
                                                                    version.createdAt
                                                                ).toISOString() +
                                                                new Date(
                                                                    versions[
                                                                        versions.length -
                                                                            1
                                                                    ].createdAt
                                                                ).toLocaleTimeString();
                                                            if (
                                                                index ==
                                                                versions.length -
                                                                    1
                                                            ) {
                                                                name =
                                                                    "Current version " +
                                                                    " " +
                                                                    new Date(
                                                                        version.createdAt
                                                                    ).toISOString() +
                                                                    new Date(
                                                                        versions[
                                                                            versions.length -
                                                                                1
                                                                        ].createdAt
                                                                    ).toLocaleTimeString();
                                                            }
                                                            return (
                                                                <SelectItem
                                                                    key={
                                                                        version.id
                                                                    }
                                                                    value={
                                                                        version.id
                                                                    }
                                                                >
                                                                    {name}
                                                                </SelectItem>
                                                            );
                                                        }
                                                    )}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                </div>
                                {set && (
                                    <div className="w-full m-4 font-medium text-l flex">
                                        <h1>Modfied from package :</h1>{" "}
                                        <Link
                                            to={"/package/" + set.id}
                                            className="text-yellowCustom underline"
                                        >
                                            {set.name}
                                        </Link>
                                    </div>
                                )}

                                {!isEdit ? (
                                    <div className="flex flex-row flex-wrap w-full">
                                        <div className="left-side-3 basis-1/3 ">
                                            <div className="text-md font-semibold mr-5 mb-1 pb-1 border-solid border-b-2 border-zinc-400">
                                                Sales Information
                                            </div>
                                            <div className="text-md">
                                                <div className="flex flex-row">
                                                    <div className="font-semibold mr-1">
                                                        Expire Date
                                                    </div>
                                                    <p>
                                                        {new Date(
                                                            expireAt
                                                        ).toDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="right-side-3 basis-2/3 font-sans text-md">
                                            <div className="text-md font-semibold mr-5 mb-1 pb-1 border-solid border-b-2 border-zinc-400">
                                                Customer Information
                                            </div>
                                            <div className=" flex flex-row mb-1">
                                                <Avatar className="mr-2">
                                                    <AvatarImage
                                                        className=""
                                                        src={
                                                            customer.profileImage
                                                        }
                                                    />
                                                    <AvatarFallback>
                                                        C
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="my-auto font-medium font-sans text-md">
                                                    {customer.fullName}
                                                </span>
                                            </div>
                                            <div className="user-info-body text-md">
                                                <div className="mail-info flex flex-row mb-1">
                                                    <HomeIcon className="my-auto mr-2" />
                                                    <span className="font-sans text-md">
                                                        {customer.address
                                                            ? customer.address
                                                            : "N/A"}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="user-info-body text-md">
                                                <div className="mail-info flex flex-row mb-1">
                                                    <EnvelopeClosedIcon className="my-auto mr-2" />
                                                    <span className="">
                                                        {customer.email}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="user-info-body text-md">
                                                <div className="phone-info flex flex-row mb-1">
                                                    <PersonIcon className="my-auto mr-2" />
                                                    <span className="">
                                                        {customer.phoneNumber}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <QuotationEdit
                                        expireAt={expireAt}
                                        customer={customer}
                                        isEdit={isEdit}
                                        setEdit={setEdit}
                                    />
                                )}
                            </div>
                            <div className="detail-table">
                                <div className="mt-7 text-xl font-semibold flex items-center">
                                    <h1 className="mr-4">Details</h1>
                                </div>
                                <div className="mx-auto py-5">
                                    <DataTable
                                        columns={column}
                                        data={products as any}
                                        status={status}
                                    />
                                </div>
                            </div>
                            <div className="detail-table">
                                <div className="mt-7 text-xl font-semibold  flex items-center">
                                    <h1 className="mr-4">Services</h1>
                                </div>
                                <div className="mx-auto py-5">
                                    <DataTable
                                        columns={serviceColums}
                                        data={services as any}
                                        status={status}
                                    />
                                    <div className="p-2 flex flex-row justify-between font-semibold border-b-2 border-zinc-100 mt-2">
                                        <div className="total-price-title">
                                            Total Price
                                        </div>
                                        <div className="total-price-amount">
                                            {status != "Requested"
                                                ? new Intl.NumberFormat(
                                                      "en-US",
                                                      {
                                                          style: "currency",
                                                          currency: "VND",
                                                      }
                                                  ).format(totalPrice)
                                                : "Unknown"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="action-buttons mb-2 flex flex-row justify-center space-x-2">
                                {!versionId && (
                                    <MakeContractButton
                                        id={id}
                                        status={status}
                                    ></MakeContractButton>
                                )}

                                {!versionId &&
                                    status != "Accepted" &&
                                    status != "Cancelled" && (
                                        <DeleteButton
                                            id={id}
                                            setRender={setRender}
                                        ></DeleteButton>
                                    )}
                            </div>
                        </div>
                        <Negotiation
                            staff={staff}
                            negotiationLog={negotiationLog}
                            customer={customer}
                        />
                    </div>
                </div>
            )}
            {!updated && <Loading variant="light" />}
        </>
    );
};

export default QuotationDetail;
