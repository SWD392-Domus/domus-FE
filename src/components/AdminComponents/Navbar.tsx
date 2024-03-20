import { Link, useLocation } from "react-router-dom";

import {
    FileTextIcon,
    PersonIcon,
    IdCardIcon,
    DashboardIcon
} from "@radix-ui/react-icons";
import { IconProps } from "@radix-ui/react-icons/dist/types";

const components: {
    title: string;
    icon: React.ForwardRefExoticComponent<
        IconProps & React.RefAttributes<SVGSVGElement>
    >;
    href: string;
    description: string;
}[] = [
        {
            title: "Dashboard",
            icon: DashboardIcon,
            href: "/admin/dashboard",
            description: "Dashboard",
        },
        {
            title: "Profile",
            icon: PersonIcon,
            href: "/admin",
            description: "Profile",
        },
        {
            title: "Quotation",
            icon: FileTextIcon,
            href: "/admin/quotations",
            description: "Quotation Management",
        },
        {
            title: "User",
            icon: IdCardIcon,
            href: "/admin/users",
            description: "User Management",
        }
    ];

export default function NavigationMenuDemo() {
    const handleLogout = () => {
        localStorage.removeItem("Token");
    };
    const location = useLocation();
    console.log(location);
    return (
        <div className=" flex flex-col justify-between h-[95%] mt-3">
            <div className="flex-col">
                {components.map((component) => (
                    <Link to={component.href}>
                        <div
                            className={`flex text-sm font-medium p-3 hover:bg-slate-100 hover:text-black rounded ${location.pathname === component.href
                                ? "bg-black text-white"
                                : ""
                                }`}
                        >
                            <component.icon className="my-auto mr-2"></component.icon>
                            {component.title}
                        </div>
                    </Link>
                ))}
            </div>
            <div className=" flex items-center justify-center">
                <button
                    onClick={handleLogout}
                >
                    <Link to="/login">Log Out</Link>
                </button>
            </div>
        </div>
    );
}
