import { Link, useLocation } from "react-router-dom";

import {
    // HomeIcon,
    FileTextIcon,
    TextAlignJustifyIcon,
    // GearIcon,
    BackpackIcon,
    PersonIcon,
    LayersIcon,
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
            title: "Profile",
            icon: PersonIcon,
            href: "/staff/profile",
            description: "Profile",
        },
        {
            title: "Quotation",
            icon: FileTextIcon,
            href: "/staff/quotations",
            description: "Quotation Management",
        },
        {
            title: "Product",
            icon: TextAlignJustifyIcon,
            href: "/staff/products",
            description: "Product Management",
        },
        {
            title: "Package",
            icon: BackpackIcon,
            href: "/staff/packages",
            description: "Package Management",
        },
        {
            title: "Contract",
            icon: LayersIcon,
            href: "/staff/contracts",
            description: "Contract Management",
        },
        // {
        //     title: "Storage",
        //     icon: LayersIcon,
        //     href: "/staff/storage",
        //     description: "Storage",
        // },
        // {
        //     title: "Settings",
        //     icon: GearIcon,
        //     href: "/staff/settings",
        //     description: "Settings",
        // },
    ];

export default function NavigationMenuDemo() {
    const location = useLocation();
    console.log(location);
    return (
        <div className=" flex flex-col justify-between h-[95%] ">
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
                <Link to="/login">Log Out</Link>
            </div>
        </div>
    );
}
