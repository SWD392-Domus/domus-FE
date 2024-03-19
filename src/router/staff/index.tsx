import React, { useEffect, useState } from "react";

// import { Search } from "./components/search";
// import { UserNav } from "./components/user-nav";

import { Tabs } from "@/components/ui/Tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import {
    Card,
    CardContent,
    // CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
import { Overview } from "./components/overview";
// import { RecentSales } from "./components/recent-sales";
import { dashboardApi } from "@/utils/api/dashboardApi";
import Loading from "@/components/PublicComponents/Loading";
import YearSelect from "./components/YearSelect";

interface Props {
    // define your props here
}

const Dashboard: React.FC<Props> = () => {
    const [data, setData] = useState(null);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [, setNewUser] = useState(0);
    const [selectedYear, setSelectedYear] = useState("2024");
    useEffect(() => {
        const fetchData = async () => {
            setData(null);
            const token = `Bearer ${localStorage.getItem("Token")}`;
            const res = await dashboardApi.getDashboard(
                token as string,
                selectedYear
            );
            setSelectedYear(selectedYear);
            setNewUser(res.data.data.newUsersCount);
            setTotalRevenue(res.data.data.totalRevenue);
            setData(res.data.data.revenueByMonths);
        };
        fetchData();
    }, [selectedYear]);
    return (
        <>
            <div className="hidden flex-col md:flex">
                {/* <div className="border-b">
                    <div className="flex h-16 items-center px-4">
                        <div className="ml-auto flex items-center space-x-4">
                            <Search />
                            <UserNav />
                        </div>
                    </div>
                </div> */}
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <div className="flex items-center gap-x-56 space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">
                            Dashboard
                        </h2>
                        <div className="flex items-center space-x-2">
                            <YearSelect
                                setSelectedYear={setSelectedYear}
                                selectedYear={selectedYear}
                            />
                        </div>
                    </div>
                    {data && (
                        <Tabs defaultValue="overview" className="space-y-4">
                            <TabsContent value="overview" className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                    <Card className="border">
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Total Revenue
                                            </CardTitle>
                                            {/* <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                className="h-4 w-4 text-muted-foreground"
                                            >
                                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                            </svg> */}
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">
                                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'VND' }).format(totalRevenue)}
                                            </div>
                                            {/* <p className="text-xs text-muted-foreground">
                                                +20.1% from last month
                                            </p> */}
                                        </CardContent>
                                    </Card>
                                    {/* <Card className="border">
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                New Users
                                            </CardTitle>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                className="h-4 w-4 text-muted-foreground"
                                            >
                                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                                <circle cx="9" cy="7" r="4" />
                                                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                            </svg>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">
                                                {newUser}
                                            </div>
                                            <p className="text-xs text-muted-foreground">

                                            </p>
                                        </CardContent>
                                    </Card> */}
                                </div>
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                                    <Card className="col-span-4 border">
                                        <CardHeader>
                                            <CardTitle>Overview</CardTitle>
                                        </CardHeader>
                                        <CardContent className="pl-2">
                                            <Overview data={data} />
                                        </CardContent>
                                    </Card>
                                    {/* <Card className="col-span-3 border">
                                        <CardHeader>
                                            <CardTitle>Recent Sales</CardTitle>
                                            <CardDescription>
                                                You made 265 sales this month.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <RecentSales />
                                        </CardContent>
                                    </Card> */}
                                </div>
                            </TabsContent>
                        </Tabs>
                    )}
                </div>
            </div>

            {!data && <Loading variant="dark" />}
        </>
    );
};

export default Dashboard;
