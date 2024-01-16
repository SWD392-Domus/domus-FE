import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Demo from "./demo";
import PublicRoute from "./PublicRoute";
import Home from "./home";
import PublicLayout from "@/components/PublicComponents/PublicLayout";

const RouterComponent: React.FC = () => {
  const publicRoute = [
    {
      index: true,
      path: "demo",
      component: <Demo />,
      exact: true,
      restrict: true,
    },
    {
      index: true,
      path: "/home",
      component: <Home />,
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
