import BreadCrumbHeader from "@/components/ui/Breadcrumb";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const StaffLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-1">
                <div className="border-r basis-1/6">
                    <div className="flex-col h-full">
                        <div className="font-bold mb-5 pl-3 text-2xl">
                            Domus
                        </div>
                        <Navbar />
                    </div>
                </div>
                <div className="flex-1 container">
                    <div className="flex flex-row mt-5">
                        <BreadCrumbHeader />
                    </div>
                    <Outlet />
                </div>
            </div>
            <footer className="bg-zinc-300 bg-cover h-8 text-xs text-zinc-500 mt-5">
                <div className="my-2 ml-36">Copyright @Domus</div>
            </footer>
        </div>
    );
};

export default StaffLayout;
