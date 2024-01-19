import React from "react";
import { DataTable } from "@/components/ui/Table";
import { columns, data } from '@/components/ui/Table/column'

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