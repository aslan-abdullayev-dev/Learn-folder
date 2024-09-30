import "./main-layout-styles.scss"

import { Outlet } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

import Header from "../../components/UIComponents/Header/Header.tsx";
import { useEffect } from "react";
import { siteUrls } from "../../constants/siteUrls.ts";

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    if (location.pathname === "/") {
      navigate(siteUrls.main.allTenders);
    }
  }, [location.pathname, navigate]);
  return (
    <div className="main-layout">
      <header className="layout-header">
        <Header/>
      </header>
      <main className="layout-body">
        <Outlet/>
      </main>
    </div>
  )
}

export default MainLayout;