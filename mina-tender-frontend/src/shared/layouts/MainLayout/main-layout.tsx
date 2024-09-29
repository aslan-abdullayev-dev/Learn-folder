import "./main-layout-styles.scss"

import { Outlet } from "react-router-dom";

import Header from "../../components/UIComponents/Header/Header.tsx";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <header className="layout-header">
        <Header/>
      </header>
      <main className="layout-body">
        <Outlet/>
      </main>
      {/*<aside>*/}
      {/*  asdide*/}
      {/*</aside>*/}
    </div>
  )
}

export default MainLayout;