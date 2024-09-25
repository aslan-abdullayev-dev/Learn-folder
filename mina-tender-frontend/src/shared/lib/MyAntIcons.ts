import * as AntdIcons from "@ant-design/icons";

type allIconsItem = { name: string; iconRef: any };
type allIconsObj = Record<string, any>;
class MyAntIcons {
  #allIconsArr: allIconsItem[];
  #allIconsObj: allIconsObj;

  constructor() {
    this.#allIconsArr = [];
    this.#allIconsObj = {};
    this.#createIconsData();
  }

  getAllIconsArr() {
    return this.#allIconsArr;
  }

  getAllIconsObj() {
    return this.#allIconsObj;
  }

  filterType(filterName: "filled" | "twotone" | "outlined"): MyAntIcons {
    const filteredIconsArr: allIconsItem[] = [];
    const filteredIconsObj: allIconsObj = {};
    this.#allIconsArr.forEach(({ name, iconRef }) => {
      const iconName = name.toLowerCase();
      if (iconName.includes(filterName)) {
        filteredIconsArr.push({ name, iconRef });
        filteredIconsObj[name] = iconRef;
      }
    });
    this.#allIconsArr = filteredIconsArr;
    this.#allIconsObj = filteredIconsObj;
    return this;
  }

  getOneIcon(name: string) {
    return this.#allIconsObj[name];
  }

  searchIcon(name: string): allIconsItem[] {
    const searcValue = name.toLowerCase();
    return this.#allIconsArr.filter((icon) => {
      const iconName = icon.name.toLowerCase();
      return iconName.includes(searcValue);
    });
  }

  #createIconsData() {
    Object.entries(AntdIcons || {}).forEach(([name, iconRef]) => {
      if (this.#isValidIconEl(iconRef)) {
        this.#allIconsArr.push({ name, iconRef });
        this.#allIconsObj[name] = iconRef;
      }
    });
  }

  #isValidIconEl(el: any) {
    if (el["$$typeof"] === Symbol.for("react.forward_ref")) return true;
    return false;
  }
}

export default MyAntIcons;
