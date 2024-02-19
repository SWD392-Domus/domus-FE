import { Link } from "react-router-dom"

import { HomeIcon, FileTextIcon, TextAlignJustifyIcon, GearIcon } from "@radix-ui/react-icons"
import { IconProps } from "@radix-ui/react-icons/dist/types";

const components: {
    title: string;
    icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
    href: string;
    description: string;
}[] = [
        {
            title: "Home",
            icon: HomeIcon,
            href: "/staff",
            description:
                "Home",
        },
        {
            title: "Quotation",
            icon: FileTextIcon,
            href: "/staff/quotations",
            description:
                "Quotation Management",
        },
        {
            title: "Product",
            icon: TextAlignJustifyIcon,
            href: "/staff/products",
            description:
                "Product Management",
        },
        {
            title: "Settings",
            icon: GearIcon,
            href: "/staff",
            description:
                "Settings",
        },
    ]

export default function NavigationMenuDemo() {
    return (
        <div className="flex-col">
            {
                components.map((component) => (
                    <Link to={component.href}>
                        <div className="flex text-sm font-medium p-3 hover:bg-slate-100 hover:rounded">
                            <component.icon className="my-auto mr-2"></component.icon>
                            {component.title}
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}
