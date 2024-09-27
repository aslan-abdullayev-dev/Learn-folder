import { createBrowserRouter } from "react-router-dom";

import { siteUrls } from "./shared/constants/siteUrls.ts";

import MainLayout from "./shared/layouts/MainLayout/MainLayout.tsx";
import AuthLayout from "./shared/layouts/AuthLayout/AuthLayout.tsx";
// import LoginPage from "./containers/AuthContainer/pages/LoginPage.tsx";
import Hero from "./containers/HomeContainer/pages/Hero.tsx";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
      {
        element: <Hero/>,
        path: siteUrls.home + "/" + siteUrls.hero,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout/>,
    children: [
      {
        path: "login",
        // element: <LoginPage/>,
        element: <div>Login</div>,
      },
    ],
  },
]);

export default Router;
