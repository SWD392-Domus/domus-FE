import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CustomerSettings from "./customerSettings";
import CustomerCart from "./customerCart";
import CustomerQuotations from "./customerQuotations";
import StaffProducts from "./staffProducts";
import StaffPackages from "./staffPackages";
import StaffQuotationNew from "./staffQuotationNew";
import StaffQuotations from "./staffQuotations";
import StaffQuotationDetail from "./staffQuotationDetail";
import StaffPackageDetail from "./staffPackageDetail";
import StaffPackageDetailUpdate from "./staffPackageDetailUpdate";
import StaffPackageDetailCreate from "./staffPackageDetailCreate";
import PublicRoute from "./PublicRoute";
import Home from "./home";
import ArticleList from "./article";
import ArticleDetail from "./articleDetail";
import PublicLayout from "@/components/PublicComponents/PublicLayout";
import CustomerRoute from "./CustomerRoute";
import CustomerLayout from "@/components/CustomerComponents/CustomerLayout";
import StaffRoute from "./StaffRoute";
import StaffLayout from "@/components/StaffComponents/StaffLayout";
import ProductList from "./products";
import PackageList from "./packages";
import ProductDetails from "./productDetails";
import PackageDetails from "./packageDetails";
import ProductDetailsStaff from "./staffProductDetail";
import Login from "./login";
import Auth from "./auth";
import Staff from "./staff";
import StaffProfile from "./profile";
import CreateProduct from "./staffCreateProduct";
import Error403Page from "./403";
import QuotationDetail from "./customerQuotationDetail";
import StaffContractList from "./staffContracts";
import StaffArticleList from "./staffArticles";
import StaffArticleDetail from "./staffArticleDetail";
import StaffServiceList from "./staffServices";
import AdminUsersList from "./adminUsersList";
import StaffArticleDetailCreate from "./staffArticleDetailCreate";
import StaffArticleDetailUpdate from "./staffArticleDetailUpdate";
import StaffContractCreate from "./StaffContractCreate";
import OTP from "./otp";
import StaffContractDetail from "./StaffContractDetail";
import Storage from "./storage";
import CustomerContractDetail from "./customerContractDetail";
import CreateUser from "./adminCreateUser";
import UserDetails from "./adminUserDetails";
import CustomerContract from "./customerContracts";
import Notification from "./notifications";
import NotFound from "./404";

const RouterComponent: React.FC = () => {
    const publicRoute = [
        {
            index: true,
            path: "home",
            component: <Home />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "oauth/gg",
            component: <Auth />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "article",
            component: <ArticleList />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "article/:id",
            component: <ArticleDetail />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "oauth/gg",
            component: <Auth />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "products",
            component: <ProductList />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "packages",
            component: <PackageList />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "product/:id",
            component: <ProductDetails />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "package/:packageId",
            component: <PackageDetails />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "otp",
            component: <OTP />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "package",
            component: <PackageDetails />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "login",
            component: <Login />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "403",
            component: <Error403Page />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "404",
            component: <NotFound />,
            exact: true,
            restrict: true,
        }
    ];
    const customerRoute = [
        {
            index: true,
            path: "customer/settings",
            component: <CustomerSettings />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "customer/settings/cart",
            component: <CustomerCart />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "customer/settings/contracts/:contractId",
            component: <CustomerContractDetail />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "customer/settings/quotations",
            component: <CustomerQuotations />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "customer/settings/contracts",
            component: <CustomerContract />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "customer/settings/quotations/:quotationId",
            component: <QuotationDetail />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "notification",
            component: <Notification />,
            exact: true,
            restrict: true,
        },
    ];
    const staffRoute = [
        {
            index: true,
            path: "staff",
            component: <Staff />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "staff/profile",
            component: <StaffProfile />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "staff/quotations/newQuotation",
            component: <StaffQuotationNew />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "staff/quotations",
            component: <StaffQuotations />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "staff/services",
            component: <StaffServiceList />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "staff/quotations/:quotationId",
            component: <StaffQuotationDetail />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "staff/quotations/:quotationId/versions",
            component: <StaffQuotationDetail />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "staff/articles/:articleId",
            component: <StaffArticleDetail />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "staff/quotations/:quotationId/versions/:versionId",
            component: <StaffQuotationDetail />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "staff/packages",
            component: <StaffPackages />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "staff/packages/:packageId",
            component: <StaffPackageDetail />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "staff/packages/:packageId/update",
            component: <StaffPackageDetailUpdate />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "staff/packages/newPackage",
            component: <StaffPackageDetailCreate />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "staff/products/create",
            component: <CreateProduct />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "staff/products",
            component: <StaffProducts />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "staff/products/:id",
            component: <ProductDetailsStaff />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "staff/products/create",
            component: <ProductDetailsStaff />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "staff/contracts",
            component: <StaffContractList />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "staff/contract/new/:quotationId/version/:versionId",
            component: <StaffContractCreate />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "staff/contracts/:contractId",
            component: <StaffContractDetail />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "staff/contracts/:contractId/versions",
            component: <StaffContractDetail />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "staff/articles",
            component: <StaffArticleList />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "staff/users",
            component: <AdminUsersList />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "staff/articles/newArticle",
            component: <StaffArticleDetailCreate />,
            exact: true,
            restrict: true,
        },
        // {
        //     index: true,
        //     path: "staff/articles/:articleId",
        //     component: <StaffArticleDetail />,
        //     exact: true,
        //     restrict: true,
        // },
        {
            index: true,
            path: "staff/articles/:articleId/update",
            component: <StaffArticleDetailUpdate />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "staff/storage",
            component: <Storage />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "staff/users/:id",
            component: <UserDetails />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "staff/users/create",
            component: <CreateUser />,
            exact: true,
            restrict: true,
        },
    ];
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="home" />} />
                <Route path="/" element={<PublicRoute />}>
                    <Route element={<PublicLayout />}>
                        <Route>
                            {publicRoute.map((route) => (
                                <Route
                                    index={route.index}
                                    key={route.path}
                                    path={route.path}
                                    element={route.component}
                                />
                            ))}
                        </Route>
                    </Route>
                </Route>
                <Route element={<CustomerRoute />}>
                    <Route element={<CustomerLayout />}>
                        {customerRoute.map((route) => (
                            <Route
                                index={route.index}
                                key={route.path}
                                path={route.path}
                                element={route.component}
                            />
                        ))}
                    </Route>
                </Route>
                <Route element={<StaffRoute />}>
                    <Route element={<StaffLayout />}>
                        {staffRoute.map((route) => (
                            <Route
                                index={route.index}
                                key={route.path}
                                path={route.path}
                                element={route.component}
                            />
                        ))}
                    </Route>
                </Route>
                {/* <Route path="/403" element={<Error403Page />} /> */}
                {/* <Route element={<EmployeeRoute />}>
                    <Route element={<LayoutComponent />}>
                        {employeeRoute.map((route) => (
                            <Route
                                index={route.index}
                                key={route.path}
                                path={route.path}
                                element={route.component}
                            />
                        ))}
                    </Route>
                </Route>
                <Route element={<AdminRoute />}>
                    <Route element={<LayoutComponent />}>
                        {adminRoute.map((route) => (
                            <Route
                                index={route.index}
                                key={route.path}
                                path={route.path}
                                element={route.component}
                            />
                        ))}
                    </Route>
                </Route> */}
                {/* <Route path="/payment/result" element={<Payment />} />*/}

                <Route path="/404" element={<NotFound />} />
                
                <Route path="*" element={<NotFound />} /> 
            </Routes>
        </BrowserRouter>
    );
};

export default RouterComponent;
