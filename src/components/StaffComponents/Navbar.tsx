import { Link } from "react-router-dom"

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Quotation",
        href: "/staff/quotations",
        description:
            "Quotation Management",
    },
    {
        title: "Product",
        href: "/staff/products",
        description:
            "Product Management",
    },
]

export default function NavigationMenuDemo() {
    return (
        <div className="flex">
            {
                components.map((component) => (
                    <Link to={component.href}>
                        <div className="text-sm mx-3 hover:text-blue-500">{component.title}</div>
                    </Link>
                ))
            }
        </div>
    )
}
