import { QuotationDetailInfo } from "@/router/staffQuotationDetail/slice";
import { ServiceProps } from "@/router/staffQuotationDetail/types";

export const fakeData: QuotationDetailInfo[] = [
    {
        id: "1",
        productName: "Fake Product 1",
        price: 500000,
        monetaryUnit: "VND",
        quantity: 3,
        quantityType: "EA",
        priceSum: 1500000,
    },
    {
        id: "2",
        productName: "Fake Product 2",
        price: 800000,
        monetaryUnit: "VND",
        quantity: 2,
        quantityType: "EA",
        priceSum: 1600000,
    },
    {
        id: "3",
        productName: "Fake Product 3",
        price: 1200000,
        monetaryUnit: "VND",
        quantity: 5,
        quantityType: "EA",
        priceSum: 6000000,
    },
    {
        id: "4",
        productName: "Fake Product 4",
        price: 300000,
        monetaryUnit: "VND",
        quantity: 4,
        quantityType: "EA",
        priceSum: 1200000,
    },
    {
        id: "5",
        productName: "Fake Product 5",
        price: 700000,
        monetaryUnit: "VND",
        quantity: 1,
        quantityType: "EA",
        priceSum: 700000,
    },
];
export const serviceFakeData: ServiceProps[] = [
    {
        id: "1",
        name: "Professional Repair Service",
        price: 750000,
        monetaryUnit: "VND",
    },
    {
        id: "2",
        name: "Reliable Installation Service",
        price: 900000,
        monetaryUnit: "VND",
    },
    {
        id: "3",
        name: "Efficient Maintenance Service",
        price: 600000,
        monetaryUnit: "VND",
    },
    {
        id: "4",
        name: "Quality Cleaning Service",
        price: 550000,
        monetaryUnit: "VND",
    },
    {
        id: "5",
        name: "Experienced Consultation Service",
        price: 800000,
        monetaryUnit: "VND",
    },
];
