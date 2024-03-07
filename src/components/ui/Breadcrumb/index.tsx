import { HomeIcon } from "@radix-ui/react-icons";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

function BreadCrumbHeader() {
    const { quotationId, productId, packageId } = useParams();
    const breadcrumbNameMap: Record<string, string> = {
        "/customer": "Customer",
        "/customer/settings": "Settings",
        "/customer/settings/quotations": "Quotations",
        "/customer/settings/quotations/:quotationId": `Quotation ${quotationId} `,
        "/staff": "Staff",
        "/staff/quotations": "Quotations",
        "/staff/quotations/newQuotation": "New Quotation",
        "/staff/quotations/:quotationId": `Quotation ${quotationId} `,
        "/staff/packages": `Packages`,
        "/staff/packages/newPackage": `New Package`,
        "/staff/packages/:packageId": `Package ${packageId} `,
        "/staff/products": "Products",
        "/staff/contracts": "Contracts",
    };

    if (quotationId !== undefined) {
        breadcrumbNameMap[
            `/customer/settings/quotations/${quotationId}`
        ] = `Quotation ${quotationId} `;
        breadcrumbNameMap[
            `/staff/quotations/${quotationId}`
        ] = `Quotation ${quotationId} `;
    }
    if (productId !== undefined) {
        breadcrumbNameMap[
            `/staff/products/${productId}`
        ] = `Product ${productId} `;
    }
    if (packageId !== undefined) {
        breadcrumbNameMap[
            `/staff/packages/${packageId}`
        ] = `Package ${packageId} `;
    }

    const location = useLocation();

    const pathSnippets = location.pathname.split("/").filter((i) => i);
    const breadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
        return {
            key: url,
            title: <Link to={url}>{breadcrumbNameMap[url]}</Link>,
        };
    });

    return (
        <div className="navigation-line flex flex-row">
            <Link className="my-auto mr-2" to={"/"}>
                <HomeIcon className="" />
            </Link>
            <span className="text-black">
                {breadcrumbItems.map((item) => (
                    <span key={item.key}> / {item.title}</span>
                ))}
            </span>
        </div>
    );
}

export default BreadCrumbHeader;
