import { createBrowserRouter } from "react-router-dom";

import LoginPage from "./containers/AuthContainer/pages/login-page.tsx";
import MainLayout from "./shared/layouts/MainLayout/main-layout.tsx";
import AuthLayout from "./shared/layouts/AuthLayout/auth-layout.tsx";
import RegisterPage from "./containers/AuthContainer/pages/register-page.tsx";
import AllTenders from "./containers/HomeContainer/pages/all-tenders.tsx";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
      {
        // path: "/all-tenders",
        index:true,
        element: <AllTenders/>
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout/>,
    children: [
      {
        path: "login",
        element: <LoginPage/>,
      },
      {
        path: "register",
        element: <RegisterPage/>,
      },
    ],
  },
]);

export default Router;
