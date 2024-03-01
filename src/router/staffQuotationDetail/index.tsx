import { EditDataTable } from "./components/Table";
import { editColums } from "./components/Table/editColumn";
import {
    EnvelopeClosedIcon,
    HomeIcon,
    PersonIcon,
    ChatBubbleIcon,
    Pencil1Icon,
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
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import selector from "./slice/selector";
import { actions } from "./slice";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

import { Button } from "@/components/ui/Button/Button";
import { DataTable } from "./components/ServiceTable";
import { column } from "./components/Table/column";
import { EditTableService } from "./components/ServiceTable/editTableService";
import { serviceColums } from "./components/ServiceTable/column";
import { editServiceColumns } from "./components/ServiceTable/editColumn";
import { ProductDetailProps, ServiceProps } from "./types";
import { Badge } from "@/components/ui/Badge";
import QuotationEdit from "./components/QuotationEdit";
import { editQuotation } from "./usecase/editQuotation";
import { PencilIcon } from "lucide-react";
import { toast } from "@/components/ui/Toast/use-toast";
import { pushNegotitaionService } from "./service";
import Negotiation from "./components/Neogitation";
import { toastError } from "@/components/Toast";

interface Props {
    // define your props here
}
export interface CellValues {
    [key: string]: {
        [key: string]: string;
    };
}
const QuotationDetail: React.FC<Props> = () => {
    const navigate = useNavigate();
    const [isEditTable, setEditTable] = useState(false);
    const [isEditService, setEditService] = useState(false);
    const [isEdit, setEdit] = useState(false);
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
    const services: any = useSelector(selector.services);
    const [updated, setUpdated] = useState(false);
    const initalValues: CellValues = {};
    const serviceInitialValues: CellValues = {};
    const [cellValues, setCellValues] = useState<CellValues>(initalValues);
    const [serviceCellValues, setserviceCellValues] =
        useState<CellValues>(services);

    const handleAddProduct = () => {
        dispatch(actions.addRow());
    };
    const handleAddSerive = () => {
        dispatch(actions.addRowService());
    };
    const handleUpdate = async () => {
        const sentProducts = products.map((product) => {
            const { price, monetaryUnit, quantity, quantityType } = product;
            return {
                productDetailId: product.productDetailId,
                price: parseFloat(price),
                monetaryUnit,
                quantity: parseFloat(quantity),
                quantityType,
            };
        });
        const sentServices = services.map((service: any) => {
            return service.id;
        });

        const data = {
            customerId: customer.id,
            staffId: staff.id,
            status: "Sent",
            ExpireAt: expireAt,
            productdetails: sentProducts,
            services: sentServices,
        };
        const token = localStorage.getItem("Token");
        const res = await editQuotation(id, token as string, data);
        if (res.status != 200) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Please Try again",
            });
        } else {
            if (res.data.isSuccess) {
                toast({
                    variant: "success",
                    title: "Update Successfully",
                    description: "",
                });
                await pushNegotitaionService(id, token as string, {
                    content:
                        "Hi, I just updated the quotation , please feel free to discuss through this chat",
                    isCustomerMessage: false,
                });

                window.location.replace(`/staff/quotations/${id}`);
            } else {
                toast({
                    variant: "destructive",
                    title: `${res.data.messages[0].content}`,
                    description: "",
                });
            }
        }
    };
    useEffect(() => {
        let isMounted = true;

        const fetchDataAndUpdateCellValues = async () => {
            if (quotationId && isMounted) {
                try {
                    const response = await getQuotationById(quotationId);

                    if (response) {
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
                        setCellValues(initalValues);
                        setserviceCellValues(serviceInitialValues);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        };

        fetchDataAndUpdateCellValues();

        // Cleanup function to prevent memory leaks
        return () => {
            isMounted = false;
        };
    }, [quotationId]);
    const handleSave = () => {
        function validateCellValues(cellValues: CellValues): boolean {
            for (let key in cellValues) {
                let nestedObject = cellValues[key];
                for (let nestedKey in nestedObject) {
                    if (
                        !nestedObject[nestedKey] ||
                        nestedObject[nestedKey] === ""
                    ) {
                        return false; // Validation fails if any value is undefined, null, or empty
                    }
                }
            }
            return true; // All values have values
        }
        if (validateCellValues(cellValues)) {
            const productsArray = Object.values(cellValues);

            dispatch(actions.addProduct(productsArray as any));
            setEditTable(false);
        } else {
            toastError("1 or more fields are invalid");
        }
    };
    const handleSaveService = () => {
        const servicesArray = Object.values(serviceCellValues);
        dispatch(actions.addService(servicesArray as any));
        setEditService(false);
    };
    return (
        <>
            {updated && (
                <div className="flex flex-row ">
                    <div className="left-side-2 basis-1/3">
                        <div className="my-7 text-2xl font-semibold">
                            {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "VND",
                            }).format(totalPrice * 1000)}
                        </div>
                        <div className="my-4 flex ">
                            <Badge className="text-sm">{status}</Badge>
                        </div>

                        <MakeContractButton></MakeContractButton>
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
                                <div className="my-7 text-2xl font-semibold w-full">
                                    Quotation - {id}
                                </div>
                                {!isEdit ? (
                                    <div className="flex flex-row flex-wrap w-full">
                                        <div className="left-side-3 basis-1/3 ">
                                            <div className="text-md font-semibold mr-5 mb-1 pb-1 border-solid border-b-2 border-zinc-400">
                                                Sales Information
                                            </div>
                                            <div className="text-md">
                                                <div className="flex flex-row">
                                                    <div className="font-semibold mr-1">
                                                        Exprie Date
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

                                {!isEdit && (
                                    <Button
                                        variant={"default"}
                                        className="w-[80px]"
                                        onClick={() => setEdit(!isEdit)}
                                    >
                                        Edit
                                    </Button>
                                )}
                            </div>
                            <div className="detail-table">
                                <div className="mt-7 text-xl font-semibold flex items-center">
                                    <h1 className="mr-4">Details</h1>
                                    <Button
                                        variant={"default"}
                                        onClick={() =>
                                            setEditTable(!isEditTable)
                                        }
                                        className="mr-2"
                                    >
                                        {isEditTable ? "Cancel" : "Edit"}
                                    </Button>
                                    {isEditTable && (
                                        <Button
                                            variant={"default"}
                                            onClick={handleSave}
                                        >
                                            Save
                                        </Button>
                                    )}
                                </div>
                                <div className="mx-auto py-5">
                                    {isEditTable ? (
                                        <>
                                            <EditDataTable
                                                columns={editColums}
                                                data={products as any}
                                                cellValues={cellValues}
                                                setCellValues={setCellValues} // Corrected prop name
                                            />
                                            <Button
                                                variant={"ghost"}
                                                className="mt-2 text-blue-00"
                                                onClick={handleAddProduct}
                                            >
                                                Add product
                                            </Button>
                                        </>
                                    ) : (
                                        <DataTable
                                            columns={column}
                                            data={products as any}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="detail-table">
                                <div className="mt-7 text-xl font-semibold  flex items-center">
                                    <h1 className="mr-4">Services</h1>
                                    <Button
                                        variant={"default"}
                                        onClick={() =>
                                            setEditService(!isEditService)
                                        }
                                        className="mr-2"
                                    >
                                        {isEditService ? "Cancel" : "Edit"}
                                    </Button>
                                    {isEditService && (
                                        <Button
                                            variant={"default"}
                                            onClick={handleSaveService}
                                        >
                                            Save
                                        </Button>
                                    )}
                                </div>
                                <div className="mx-auto py-5">
                                    {isEditService ? (
                                        <>
                                            <EditTableService
                                                columns={
                                                    editServiceColumns as any
                                                }
                                                data={services as any}
                                                serviceCellValues={
                                                    serviceCellValues
                                                }
                                                setServiceCellValues={
                                                    setserviceCellValues
                                                }
                                            />
                                            <Button
                                                variant={"ghost"}
                                                className="mt-2 text-blue-00"
                                                onClick={handleAddSerive}
                                            >
                                                Add Service
                                            </Button>
                                        </>
                                    ) : (
                                        <DataTable
                                            columns={serviceColums}
                                            data={services as any}
                                        />
                                    )}
                                    <div className="p-2 flex flex-row justify-between font-semibold border-b-2 border-zinc-100 mt-2">
                                        <div className="total-price-title">
                                            Total Price
                                        </div>
                                        <div className="total-price-amount">
                                            {new Intl.NumberFormat("en-US", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(totalPrice * 1000)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="action-buttons mb-2 flex flex-row justify-center space-x-2">
                                <Button
                                    onClick={handleUpdate}
                                    className="bg-variant text-black h-9 border-2 border-zinc-500 bg-zinc-50 rounded hover:text-white pl-2"
                                >
                                    <PencilIcon className="h-3.5 pr-2 my-auto"></PencilIcon>
                                    Update
                                </Button>
                                <DeleteButton></DeleteButton>
                                <MakeContractButton></MakeContractButton>
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
        </>
    );
};

export default QuotationDetail;
