import { HomeIcon } from "@radix-ui/react-icons";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

function BreadCrumbHeader() {
    const { quotationId, id, packageId, versionId, contractId, articleId } = useParams();
    const breadcrumbNameMap: Record<string, string> = {
        "/customer": "Customer",
        "/customer/settings": "Settings",
        "/customer/settings/profile": "Profile",
        "/customer/settings/quotations": "Quotations",
        "/customer/settings/quotations/:quotationId": `Quotation ${quotationId} `,
        "/customer/settings/contracts": "Contracts",
        "/customer/settings/contracts/:contractId": `Contract ${contractId} `,

        "/staff": "Staff",

        "/staff/profile": "Profile",

        "/admin/quotations": "Quotations",
        "/admin/quotations/:quotationId": `Quotation ${quotationId} `,
        "/admin/users": "Users",
        "/admin/users/create": "Create User",
        "/admin/users/:id": "Users",
        "/admin/dashboard": "Dashboard",
        "/admin": "Admin",

        "/staff/packages": `Packages`,
        "/staff/packages/newPackage": `New Package`,
        "/staff/packages/:packageId": `Package ${packageId} `,

        "/staff/products": "Products",

        "/staff/articles": "Articles",
        "/staff/packages/:articleId": `Article ${articleId} `,

        "/staff/services": "Services",

        "/staff/quotations": "Quotations",
        "/staff/quotations/newQuotation": "New Quotation",
        "/staff/quotations/:quotationId": `Quotation ${quotationId?.slice(0, 3)}... `,
        "/staff/quotations/:quotationId/versions": `Versions`,
        "/staff/quotations/:quotationId/versions/:versionId": `Version ${versionId} `,

        "/staff/contracts": "Contracts",
        "/staff/contracts/newContract": "New Contract",
        "/staff/contracts/:contractId": `Contract ${contractId} `,
    };

    if (quotationId !== undefined) {
        breadcrumbNameMap[
            `/customer/settings/quotations/${quotationId}`
        ] = `Quotation ${quotationId?.slice(0, 3)}... `;
        breadcrumbNameMap[
            `/staff/quotations/${quotationId}`
        ] = `Quotation ${quotationId?.slice(0, 3)}... `;
        breadcrumbNameMap[
            `/admin/quotations/${quotationId}`
        ] = `Quotation ${quotationId?.slice(0, 3)}... `;
        if (versionId !== undefined) {
            breadcrumbNameMap[
                `/staff/quotations/${quotationId}/versions`
            ] = `Versions`;
            breadcrumbNameMap[
                `/staff/quotations/${quotationId}/versions/${versionId}`
            ] = `Version ${versionId?.slice(0, 3)}... `;
        }
    }

    if (id !== undefined) {
        breadcrumbNameMap[
            `/staff/products/${id}`
        ] = `Product ${id?.slice(0, 3)}... `;
        breadcrumbNameMap[
            `/admin/users/${id}`
        ] = `User ${id?.slice(0, 3)}... `;
    }
    if (packageId !== undefined) {
        breadcrumbNameMap[
            `/staff/packages/${packageId}`
        ] = `Package ${packageId?.slice(0, 3)}... `;
    }
    if (articleId !== undefined) {
        breadcrumbNameMap[
            `/staff/articles/${articleId}`
        ] = `Article ${articleId?.slice(0, 3)}... `;
    }
    if (contractId !== undefined) {
        breadcrumbNameMap[
            `/customer/settings/contracts/${contractId}`
        ] = `Contract ${contractId?.slice(0, 3)}... `;
        breadcrumbNameMap[
            `/staff/contracts/${contractId}`
        ] = `Contract ${contractId?.slice(0, 3)}... `;
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
