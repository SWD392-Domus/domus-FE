import React from "react";
import { DataTable } from "./Table/quotationList";
import { columns, data } from './Table/quotationList/column.tsx'

interface Props {
    // define your props here
}

const CustomerQuotations: React.FC<Props> = () => {
    return (
        <div className="mx-auto py-5">
            <DataTable columns={columns} data={data} />
        </div>
    )
}

export default CustomerQuotations