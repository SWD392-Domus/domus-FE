import { EditDataTable } from "./components/Table";
import { editColums } from "./components/Table/editColumn";
import {
    EnvelopeClosedIcon,
    HomeIcon,
    PersonIcon,
    TrashIcon,
} from "@radix-ui/react-icons";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

import QuotationEdit from "./components/QuotationEdit";
import { editQuotation } from "./usecase/editQuotation";
import { PencilIcon } from "lucide-react";
import { toast } from "@/components/ui/Toast/use-toast";
import { pushNegotitaionService } from "./service";
import Negotiation from "./components/Neogitation";
import { toastError } from "@/components/Toast";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/AlertDialog";
import { deleteQuotation } from "../staffQuotations/usecase";

import Loading from "@/components/PublicComponents/Loading";
import { userApi } from "@/utils/api/userApi";
interface Props {
    // define your props here
}
export interface CellValues {
    [key: string]: {
        [key: string]: string;
    };
}

const StaffQuotationNew: React.FC<Props> = () => {
    // const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [, setUpdate] = useState(false);
    const [isEditTable, setEditTable] = useState(false);
    const [isEditService, setEditService] = useState(false);
    const [isEdit, setEdit] = useState(false);

    const dispatch = useDispatch();

    const id: string = useSelector(selector.id);
    const customer: any = useSelector(selector.customer);

    const [staff, setStaff] = useState<any>();

    const totalPrice: number = useSelector(selector.totalPrice);
    const expireAt: string = new Date().toISOString();
    const products: any[] = useSelector(selector.products);
    const negotiationLog: any = useSelector(selector.negotiationLog);
    const services: any = useSelector(selector.services);
    const [updated,] = useState(true);
    const initalValues: CellValues = {};
    const [originalPrice,] = useState(totalPrice);
    // const serviceInitialValues: CellValues = {};
    const [cellValues, setCellValues] = useState<CellValues>(initalValues);
    const [serviceCellValues, setserviceCellValues] =
        useState<CellValues>(services);

    const handleAddProduct = () => {
        dispatch(actions.addRow());
    };
    const handleAddSerive = () => {
        dispatch(actions.addRowService());
    };
    useEffect(() => {
        const fetchData = async () => {
            const token = `${localStorage.getItem("Token")}`;
            const res = await userApi.getOwnProfile(token as string);
            setStaff(res.data.data);
        };
        fetchData();
    }, []);
    const handleUpdate = async () => {
        // console.log("update");

        const sentProducts = products.map((product) => {
            const { price, monetaryUnit, quantity, quantityType } = product;
            return {
                id: product.id,
                price: parseFloat(price),
                monetaryUnit,
                quantity: parseFloat(quantity),
                quantityType,
            };
        });
        const sentServices = services.map((service: any) => {
            return {
                serviceId: service.serviceId,
                price: parseFloat(service.price),
            };
        });

        const data = {
            customerId: customer.id,
            staffId: staff.id,
            status: "Negotiating",
            ExpireAt: expireAt,
            productdetails: sentProducts,
            services: sentServices,
        };

        const token = `Bearer ${localStorage.getItem("Token")}`;
        const res = await editQuotation(token as string, data);
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
                if (totalPrice != originalPrice) {
                    await pushNegotitaionService(id, token as string, {
                        content: `${staff.email} have change the price from đ${originalPrice} to đ${totalPrice}`,
                        isCustomerMessage: false,
                    });
                }

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
            setUpdate(true);

            dispatch(actions.addProduct(productsArray as any));
            setEditTable(false);
        } else {
            toastError("1 or more fields are invalid");
        }
    };
    const handleDelete = async () => {
        const res = await deleteQuotation(id);
        if (res == 200) {
            toast({
                variant: "success",
                title: "Cancel Quotation Successfully",
                description: "",
            });
            navigate("/staff/quotations");
        } else {
            toast({
                variant: "destructive",
                title: `Cancel Quotation Unsuccessfully`,
                description: "There is something wrong, Please try again",
            });
        }
    };
    const handleSaveService = () => {
        const servicesArray = Object.values(serviceCellValues);
        const fieldedServices = servicesArray.map((service: any) => {
            return {
                ...service,
                serviceId: service.serviceId || service.id,
            };
        });
        dispatch(actions.addService(fieldedServices as any));
        setUpdate(true);
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
                            }).format(totalPrice)}
                        </div>

                        <div className="my-4 flex ">
                            <Button className="text-sm">Create</Button>
                        </div>

                        {staff && (
                            <div className="staff-assigned-info my-7">
                                <div className="mb-2">Assigned Staff</div>
                                <div
                                    className="flex flex-row 
                            "
                                >
                                    <Avatar className="mr-2">
                                        {/* <AvatarImage src={staff.profileImage} /> */}
                                        <AvatarFallback>Staff</AvatarFallback>
                                    </Avatar>

                                    <h2 className="my-auto font-medium">
                                        {staff.userName}
                                    </h2>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="right-side-2 basis-2/3">
                        <div className="border-solid border-b-2 border-zinc-400">
                            <div className="general-info flex flex-col items-center">
                                <div className="flex justify-between items-center w-full p-5">
                                    {" "}
                                    <div>
                                        <div className="my-7 text-2xl font-semibold w-full">
                                            New Quotation
                                        </div>
                                    </div>
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
                                            {customer && (
                                                <>
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
                                                                {
                                                                    customer.phoneNumber
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                            {!customer && (
                                                <div className="font-medium text-xl">
                                                    Empty
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <QuotationEdit
                                        expireAt={expireAt}
                                        customer={customer}
                                        isEdit={isEdit}
                                        setEdit={setEdit}
                                        setUpdate={setUpdate}
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
                                            }).format(totalPrice)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="action-buttons mb-2 flex flex-row justify-center space-x-2">
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button className="border-black">
                                            <PencilIcon className="h-3.5 pr-2 my-auto"></PencilIcon>
                                            Create
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Are you absolutely sure
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone.
                                                This will permanently delete
                                                your account and remove your
                                                data from our servers.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={handleUpdate}
                                            >
                                                Continue
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="border-black flex items-center"
                                        >
                                            <TrashIcon
                                                className=" my-auto"
                                                width={20}
                                                height={20}
                                            ></TrashIcon>
                                            <h1> Cancel</h1>
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Are you absolutely sure
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone.
                                                This will permanently delete
                                                your account and remove your
                                                data from our servers.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={handleDelete}
                                            >
                                                Continue
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                        {staff && (
                            <Negotiation
                                staff={staff}
                                negotiationLog={negotiationLog}
                                customer={customer}
                            />
                        )}
                    </div>
                </div>
            )}

            {!updated && <Loading variant="dark" />}
        </>
    );
};

export default StaffQuotationNew;
