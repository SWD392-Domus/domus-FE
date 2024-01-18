import React, { useEffect, useState } from "react";
import { HomeIcon } from "@radix-ui/react-icons"
import { DataTable } from "@/components/ui/Table";
import { columns, data } from '@/components/ui/Table/column'

interface Props {
    // define your props here
}

const CustomerQuotations: React.FC<Props> = (props) => {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-black bg-cover h-10 text-white pt-2">
                <div className="container flex flex-row justify-between my-auto">
                    <p className="logo">Domus Logo here</p>
                    <div className="mr-20">
                        {/* {userInfo.name} */}
                    </div>
                </div>
            </header>
            <div className="flex-1 container">
                <div className="flex flex-row justify-between mt-5">
                    <div className="navigation-line flex flex-row">
                        <HomeIcon className="my-auto mr-2" />
                        <span className="text-black">/ Quotations</span>
                    </div>
                    <div className="">Sort By: </div>
                </div>

                <div className="mx-auto py-5">
                    <DataTable columns={columns} data={data} />
                </div>
            </div>
            <footer className="bg-black bg-cover h-10"></footer>
        </div>
    )
}

export default CustomerQuotations