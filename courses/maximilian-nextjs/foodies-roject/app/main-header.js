import classes from './main-header.module.css';

import Link from "next/link";

import logoImg from "@/assets/logo.png";


const MainHeader = () => {
  return (
    <header className={classes.header}>
      <Link className={classes.logo} href="/">
        <img src={logoImg.src} alt="A plate with food on it"/>
        NextLevel Food
      </Link>

      <nav className={classes.nav}>
        <ul>
          <li>
            <Link href="/meals">Browse Meals</Link>
          </li>
          <li>
            <Link href="/community">Browse Meals</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default MainHeader;