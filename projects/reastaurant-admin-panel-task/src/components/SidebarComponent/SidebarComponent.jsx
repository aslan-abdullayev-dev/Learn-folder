import "./SidebarComponent.scss";
import SidebarItem from "./SidebarItem/SidebarItem";
import { Home, SpoonKnife } from "../Icons";

const SidebarComponent = () => {
  return (
    <ul className="sidebar">
      <li className="sidebar__item">
        <SidebarItem path="/" name="Ana Səhifə" icon={<Home />} />
      </li>
      <li className="sidebar__item">
        <SidebarItem path="/orders" name="Sifarişlərim" icon={<SpoonKnife />} />
      </li>
    </ul>
  );
};

export default SidebarComponent;
