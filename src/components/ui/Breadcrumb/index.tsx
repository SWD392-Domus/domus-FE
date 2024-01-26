import { HomeIcon } from "@radix-ui/react-icons"
import { Link, useLocation } from 'react-router-dom';
import { useParams } from "react-router-dom"

function BreadCrumbHeader() {
    const { quotationId } = useParams();
    const breadcrumbNameMap: Record<string, string> = {
        '/customer': 'Customer',
        '/customer/settings': 'Settings',
        '/customer/settings/quotations': 'Quotations',
        '/customer/settings/quotations/:quotationId': `Quotation ${quotationId} `,
        '/staff': 'Staff',
        '/staff/quotations': 'Quotations',
        '/staff/quotations/:quotationId': `Quotation ${quotationId} `,
    };

    if (quotationId !== undefined) {
        breadcrumbNameMap[`/customer/settings/quotations/${quotationId}`] = `Quotation ${quotationId} `;
        breadcrumbNameMap[`/staff/quotations/${quotationId}`] = `Quotation ${quotationId} `;
    }

    const location = useLocation();

    const pathSnippets = location.pathname.split('/').filter((i) => i);
    const breadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return {
            key: url,
            title: <Link to={url}>{breadcrumbNameMap[url]}</Link>,
        };
    });

    return (
        <div className="navigation-line flex flex-row">
            <HomeIcon className="my-auto mr-2" />
            <span className="text-black">
                {breadcrumbItems.map((item) => (
                    <span key={item.key}> / {item.title}</span>
                ))}
            </span>
        </div>
    )
}

export default BreadCrumbHeader
