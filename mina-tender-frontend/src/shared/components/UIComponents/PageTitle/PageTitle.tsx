import styles from "./PageTitle.module.scss";
import { Divider } from "antd";

type Props = { title: string, description: string };

function PageTitle(props: Props) {
  return (
    <div className={styles.Wrapper}>
      <h1 className={styles.Title}>{props.title}</h1>
      <p className={styles.Description}>{props.description}</p>
      <Divider/>
    </div>
  )
}

export default PageTitle;
