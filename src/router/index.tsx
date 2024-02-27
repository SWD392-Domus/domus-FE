import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CustomerSettings from "./customerSettings";
import CustomerCart from "./customerCart";
import CustomerQuotations from "./customerQuotations";
import CustomerQuotationDetail from "./customerQuotationDetail";
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
import ProductDetails from "./productDetails";
import PackageDetails from "./packageDetails";
import CustomizePackage from "./customizePackage";
import ProductDetailsStaff from "./staffProductDetail";
import Login from "./login";
import Auth from "./auth";
import Staff from "./staff";
import StaffProfile from "./profile";
import CreateProduct from "./staffCreateProduct";

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
            path: "product/:id",
            component: <ProductDetails />,
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
            path: "customizepackage",
            component: <CustomizePackage />,
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
            path: "package",
            component: <PackageDetails />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "customizepackage",
            component: <CustomizePackage />,
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
            path: "customer/settings/quotations",
            component: <CustomerQuotations />,
            exact: true,
            restrict: true,
        },
        {
            index: true,
            path: "customer/settings/quotations/:quotationId",
            component: <CustomerQuotationDetail />,
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
            path: "staff/quotations/:quotationId",
            component: <StaffQuotationDetail />,
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
        // {
        //   index: true,
        //   path: "staff/products",
        //   component: <StaffProducts />,
        //   exact: true,
        //   restrict: true,
        // },
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
        }
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
                {/* <Route path="/payment/result" element={<Payment />} />

                <Route path="/404" element={<ErrorPage />} />
                <Route path="/403" element={<Error403Page />} />
                <Route path="*" element={<ErrorPage />} /> */}
            </Routes>
        </BrowserRouter>
    );
};

export default RouterComponent;
