import React from "react";
// import { ServiceProps } from "../types";
import { DataTable } from "./ServiceComponents";
import { columns } from "./ServiceComponents/column";

type ServiceProps = {
    id: string;
    name: string;
    price: number;
    monetaryUnit: string;
};

interface Props {
    data: ServiceProps[];
}

const ServiceList: React.FC<Props> = (props) => {
    return (
        <div className="flex flex-col w-full mb-2 mt-2">
            <DataTable columns={columns} data={props.data} />
        </div>
    );
};

export default ServiceList;
