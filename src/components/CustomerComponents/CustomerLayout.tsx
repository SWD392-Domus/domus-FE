import BreadCrumbHeader from "@/components/ui/Breadcrumb";
import { Outlet } from "react-router-dom";
import Header from "../PublicComponents/Header";
import Footer from "../PublicComponents/Footer";

const CustomerLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* <header className="bg-black bg-cover h-10 text-white pt-2">
                <div className="container flex flex-row justify-between my-auto">
                    <p className="logo">Domus Logo here</p>
                    <div className="mr-20">{userInfo.name}</div>
                </div>
            </header> */}
            <Header></Header>
            <div className="flex-1 container">
                <div className="flex flex-row mt-5">
                    <BreadCrumbHeader />
                </div>
                <Outlet />
            </div>
            <Footer></Footer>
            {/* <footer className="bg-black bg-cover h-10"></footer> */}
        </div>
    );
};

export default CustomerLayout;
