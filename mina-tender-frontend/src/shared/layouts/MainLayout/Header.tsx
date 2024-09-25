import styles from "./MainLayoutStyles.module.scss"

import { Select } from "antd";
import { useEffect, useState } from "react";

import api from "../../lib/Api.ts";
import { apiUrls } from "../../constants/apiUrls.ts";
import SvgLogo from "../../components/Icons/Logo.tsx";
import { setLang } from "../../store/lang/langSlice.ts";
import SvgUserMale from "../../components/Icons/UserMale.tsx";
import { useAppDispatch, useAppSelector } from "../../store";
import Utils from "../../lib/Utils.ts";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useAppDispatch();
  const currLang = useAppSelector(s => s.lang.lang);
  const username = useAppSelector(s => s.auth.user?.username);
  const [langOptions, setLangOptions] = useState<{ value: string; label: string }[]>([]);

  const handleLangChange = (val: string) => {
    dispatch(setLang(val))
    setTimeout(() => {
      window.location.reload()
    }, 100)
  }

  useEffect(() => {
    api({
      url: apiUrls.language.languageType,
      method: "get",
    }).then((res) => {
      setLangOptions(res.data.data.map((l: any) => ({ value: l.shortName, label: l.shortName })));
    }).catch(() => {
      Utils.notify.error({ text: "Could not load language types" })
    })
  }, []);

  return (
    <nav className={styles.header}>
      <Link to="/" className={styles.left}>
        <SvgLogo/>
      </Link>
      <div className={styles.right}>
        <div className={styles.lang}>
          <Select
            style={{ width: '70px' }}
            onChange={handleLangChange}
            options={langOptions}
            value={currLang}
          />
        </div>
        <div className={styles.nameGroup}>
          <div className={styles.name}>
            {username}
          </div>
          <div className={styles.userIcon}>
            <SvgUserMale/>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header;