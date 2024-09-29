import styles from "./main-layout-styles.scss";

import { useLocation, useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import {
  HomeOutlined,
  LinkOutlined,
  MenuOutlined,
  ContactsOutlined,
  CommentOutlined,
  LogoutOutlined,
  ShopOutlined,
  GlobalOutlined,
  UserOutlined,
  MailOutlined,
} from "@ant-design/icons";

import { useAppDispatch } from "../../store";
import { logout } from "../../store/auth/authSlice.ts";
import { siteUrls } from "../../constants/siteUrls.ts";
import SvgBoxIcon from "../../components/Icons/BoxIcon.tsx";
import ButtonEl from "../../components/ButtonEl/ButtonEl.tsx";

type MenuItem = Required<MenuProps>["items"][number];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const defaultSelectedKeys = location.pathname.slice(1);
  const defaultOpenKeys: string[] = [];
  const locationPathArr = location.pathname.split("/").slice(0, -1);

  for (let i = 0; i < locationPathArr.length; i++) {
    const path = locationPathArr[i];
    if (!path) {
      defaultOpenKeys.push("/");
    } else {
      defaultOpenKeys.push(path);
    }
  }

  const items: MenuItem[] = [
    {
      label: "Home",
      key: siteUrls.home,
      icon: <HomeOutlined />,
      children: [
        {
          label: "Our History",
          key: siteUrls.home + "/" + siteUrls.ourHistory,
        },
        {
          label: "Hero Section",
          key: siteUrls.home + "/" + siteUrls.hero,
        },
        {
          label: "More Info Section",
          key: siteUrls.home + "/" + siteUrls.moreInfoHome,
        },
        {
          label: "Benefits and Beyond",
          key: siteUrls.home + "/" + siteUrls.benefitsAndBeyond,
        },
        {
          label: "Minerals",
          key: siteUrls.home + "/" + siteUrls.minerals,
        },
        {
          label: "Our Company",
          key: siteUrls.home + "/" + siteUrls.ourCompany,
        },
        {
          label: "Get Social",
          key: siteUrls.home + "/" + siteUrls.getSocial,
        },
      ],
    },
    {
      label: "Social Links",
      key: siteUrls.socialLinks,
      icon: <LinkOutlined />,
    },
    {
      label: "Menu Section",
      icon: <MenuOutlined />,
      key: siteUrls.menuSection,
    },
    {
      label: "Contact Info",
      key: siteUrls.contactInfo,
      icon: <ContactsOutlined />,
    },
    {
      label: "Contact Details",
      key: siteUrls.contactDetails,
      icon: <ContactsOutlined />,
    },
    {
      label: "Products",
      icon: <SvgBoxIcon />,
      key: siteUrls.products,
      children: [
        {
          label: "Products Table",
          key: siteUrls.products + "/" + siteUrls.productsPage,
        },
        // {
        //   label: "Glass Product Features",
        //   key: siteUrls.products + "/" + siteUrls.glassProductFeatures,
        // },
        {
          label: "Product Features",
          key: siteUrls.products + "/" + siteUrls.petProductFeatures,
        },
      ],
    },
    {
      label: "Istisu Spring",
      key: siteUrls.community,
      icon: <CommentOutlined />,
      children: [
        // {
        //   label: "Testimonials",
        //   key: siteUrls.community + "/" + siteUrls.testimonials,
        // },
        // {
        //   label: "Articles",
        //   key: siteUrls.community + "/" + siteUrls.articles,
        // },
        // {
        //   label: "Our Sustainability Actions",
        //   key: siteUrls.community + "/" + siteUrls.ourSusActions,
        // },
        {
          label: "Istisu Spring",
          key: siteUrls.community + "/" + siteUrls.csr,
        },
        {
          label: "Composition of Water",
          key: siteUrls.company + "/" + siteUrls.reportData,
        },
      ],
    },
    {
      label: "About Us",
      key: siteUrls.company,
      icon: <ShopOutlined />,
      children: [
        {
          label: "Company History Tab",
          key: siteUrls.company + "/" + siteUrls.companyInfoHistoryTab,
        },
        {
          label: "Mission Vision Tab",
          key: siteUrls.company + "/" + siteUrls.missionVision,
        },
        // {
        //   label: "Plant Tab",
        //   key: siteUrls.company + "/" + siteUrls.plantData,
        // },
        // {
        //   label: "Become a Partner Tab",
        //   key: siteUrls.company + "/" + siteUrls.becomeAPartner,
        // },
        // {
        //   label: "Benefits Header",
        //   key: siteUrls.company + "/" + siteUrls.benefitsHeader,
        // },
        // {
        //   label: "Benefits Nutrition Boxes",
        //   key: siteUrls.company + "/" + siteUrls.benefitsNutritionBoxes,
        // },
        // {
        //   label: "Benefits Nutrition Percents",
        //   key: siteUrls.company + "/" + siteUrls.benefitsNutritionPercents,
        // },
        // {
        //   label: "Report Tab Minerals",
        //   key: siteUrls.company + "/" + siteUrls.reportMinerals,
        // },
      ],
    },
    {
      label: "User Form Messages",
      icon: <MailOutlined />,
      key: siteUrls.userForms,
    },
    // {
    //   label: "FAQ",
    //   key: siteUrls.FAQ,
    //   icon: <QuestionOutlined />,
    //   children: [
    //     {
    //       label: "FAQ Headers",
    //       key: siteUrls.FAQ + "/" + siteUrls.FAQHeader,
    //     },
    //     {
    //       label: "All FAQs",
    //       key: siteUrls.FAQ + "/" + siteUrls.allFaqs,
    //     },
    //     {
    //       label: "Have Question",
    //       key: siteUrls.FAQ + "/" + siteUrls.haveQuestion,
    //     },
    //   ],
    // },
    {
      label: "For Me",
      key: siteUrls.forMe,
      icon: <UserOutlined />,
      children: [
        {
          label: "Health Tips Tab",
          key: siteUrls.forMe + "/" + siteUrls.healthTips,
        },
        // {
        //   label: "Pairing and Recipes",
        //   key: siteUrls.forMe + "/" + siteUrls.pairingAndRecipes,
        // },
      ],
    },
    {
      label: "Languages",
      key: siteUrls.languages,
      icon: <GlobalOutlined />,
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => navigate(e.key);
  const onLogout = () => dispatch(logout());

  return (
    <div className={styles.aside}>
      <div className={styles.title}>Menu</div>
      <div className={styles.menuWrapper}>
        <Menu
          className="aside-menu"
          onClick={onClick}
          defaultSelectedKeys={[defaultSelectedKeys]}
          defaultOpenKeys={defaultOpenKeys}
          mode="inline"
          items={items}
        />
      </div>
      <div>
        <ButtonEl
          buttonType="formSubmit"
          onClick={onLogout}
          text={
            <span style={{ display: "flex", gap: "12px" }}>
              <span>Logout</span>
              <span>
                <LogoutOutlined />
              </span>
            </span>
          }
          style={{
            marginTop: "-20px",
            width: "100%",
          }}
        />
      </div>
    </div>
  );
};

export default Sidebar;
