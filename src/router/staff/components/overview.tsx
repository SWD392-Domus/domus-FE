"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

// const data = [
//     {
//         name: "Jan",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Feb",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Mar",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Apr",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "May",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Jun",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Jul",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Aug",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Sep",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Oct",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Nov",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Dec",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
// ];
export type columType = {
    monthAsNumber: number;
    monthAsString: string;
    revenue: number;
};
export type Props = {
    data: columType[];
};

export const Overview: React.FC<Props> = (props) => {
    const adjustColName = (data: columType[]) => {
        const newData = data.map((item) => {
            return { ...item, monthAsString: item.monthAsString.slice(0, 3) };
        });
        return newData;
    };
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={adjustColName(props.data)}>
                <XAxis
                    dataKey="monthAsString"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={10.8}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'VND' }).format(value)}`}
                />
                <Bar
                    dataKey="revenue"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                />
            </BarChart>
        </ResponsiveContainer>
    );
};
