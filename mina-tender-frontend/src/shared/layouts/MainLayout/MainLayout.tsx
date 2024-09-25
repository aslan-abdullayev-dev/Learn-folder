import styles from "./MainLayoutStyles.module.scss";

import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Header from "./Header.tsx";
import Sidebar from "./Sidebar.tsx";
import { useAppSelector } from "../../store";

const MainLayout = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!useAppSelector(s => s.auth.user?.accessToken)

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth/login")
    }
  }, [isLoggedIn]);

  return (
    <div className={styles.mainLayout}>
      <header className={styles.headerWrapper}>
        <Header/>
      </header>
      <div className={styles.bottom}>
        <aside className={styles.asideWrapper}>
          <Sidebar/>
        </aside>
        <main className={styles.bodyWrapper}>
          <Outlet/>
        </main>
      </div>
    </div>
  )
}

export default MainLayout;