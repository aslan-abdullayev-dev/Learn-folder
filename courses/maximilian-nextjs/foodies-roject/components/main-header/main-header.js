import classes from './main-header.module.css';

import Link from "next/link";
import Image from "next/image";

import logoImg from "@/assets/logo.png";
import MainHeaderBackground from "@/components/main-header/main-header-background";

const MainHeader = () => {
  return (
    <>
      <MainHeaderBackground/>
      <header className={classes.header}>
        <Link className={classes.logo} href="/public">
          <Image
            src={logoImg} //* no need to access image by .src
            priority //* disables lazy loading
            alt="A plate with food on it"
          />
          NextLevel Food
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li>
              <Link href="/meals">Browse Meals</Link>
            </li>
            <li>
              <Link href="/community">Community</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default MainHeader;