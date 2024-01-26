import BreadCrumbHeader from "@/components/ui/Breadcrumb";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"

const StaffLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-white bg-cover h-10 pt-2">
                <div className="container flex flex-row justify-between my-auto">
                    <div className="">Domus</div>
                    <Navbar />
                    <div className="mr-20">
                        Staffname
                    </div>
                </div>
            </header >
            <div className="flex-1 container">
                <div className="flex flex-row mt-5">
                    <BreadCrumbHeader />
                </div>
                <Outlet />
            </div>
            <footer className="bg-black bg-cover h-10"></footer>
        </div >)
}

export default StaffLayout