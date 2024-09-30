import { createBrowserRouter } from "react-router-dom";

import { siteUrls } from "./shared/constants/siteUrls.ts";
import MainLayout from "./shared/layouts/MainLayout/main-layout.tsx";
import AuthLayout from "./shared/layouts/AuthLayout/auth-layout.tsx";
import AllTenders from "./containers/home-container/pages/all-tenders.tsx";
import LoginPage from "./containers/auth-container/pages/login-page.tsx";
import RegisterPage from "./containers/auth-container/pages/register-page.tsx";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
      {
        path: siteUrls.main.allTenders,
        index: true,
        element: <AllTenders/>
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout/>,
    children: [
      {
        path: siteUrls.auth.login,
        element: <LoginPage/>,
      },
      {
        path: siteUrls.auth.register,
        element: <RegisterPage/>,
      },
    ],
  },
]);

export default Router;
