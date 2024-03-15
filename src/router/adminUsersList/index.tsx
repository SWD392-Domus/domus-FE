import React, { useEffect, useState } from "react";
import { DataTable } from "./components/Table/index.tsx";
import { columns } from "./components/Table/column.tsx";
// import { UsersProps } from "./types/index.ts";
import { getUsersPaging } from "./usecase";
import UsersPagination from "./components/UsersPagination";

interface Props {
    // define your props here
}

const StaffUser: React.FC<Props> = () => {
    const [users, setUsers] = useState<any[]>([]);
    // const [loading, setLoading] = useState(true);
    const [searchField, setSearchField] = useState("userName");
    const [searchValue, setSearchValue] = useState("");
    const [sortField, setSortField] = useState("");
    const [descending, setDescending] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [pageIndex, setPageIndex] = useState(1);

    async function getUsersService(
        searchField: string,
        searchValue: string,
        sortField: string,
        descending: boolean,
        pageSize: number,
        pageIndex: number
    ) {
        const res = await getUsersPaging(
            searchField,
            searchValue,
            sortField,
            descending,
            pageSize,
            pageIndex
        );
        if (res) {
            // setLoading(false);
            setUsers(res.usersItems);
            setTotalPages(res.lastPage);
            setTotalItems(res.total);
        }
    }

    useEffect(() => {
        getUsersService(
            searchField,
            searchValue,
            sortField,
            descending,
            pageSize,
            pageIndex
        );
    }, [searchField, searchValue, sortField, descending, pageSize, pageIndex]);

    return (
        <div className="">
            <div className="text-xl font-bold py-5">User List</div>
            <DataTable
                columns={columns}
                data={users}
                setSearchField={setSearchField}
                setSearchValue={setSearchValue}
                setSortField={setSortField}
                setDescending={setDescending}
            />
            <div className="flex justify-between text-sm font-medium">
                <div className="">{totalItems} Users</div>
                <UsersPagination
                    totalPages={totalPages}
                    totalItems={totalItems}
                    pageIndex={pageIndex}
                    setPageIndex={setPageIndex}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                />
            </div>
        </div>
    );
};

export default StaffUser;
