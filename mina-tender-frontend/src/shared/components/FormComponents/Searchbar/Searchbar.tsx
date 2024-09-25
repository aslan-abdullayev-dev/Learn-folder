import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons"

import { SearchbarProps } from "./SearchbarTypes.ts";


const { Search } = Input;

function Searchbar(props: SearchbarProps): JSX.Element {
  const searchbar_props_with_fallback: SearchbarProps = {
    onSearch: props.onSearch,
    onChange: props.onChange ?? undefined,
    placeholder: props.placeholder ?? "",
    style: props.style ?? {},
    size: props.size ?? "large",
    value: props.value,
    // allowClear: props.allowClear ?? true,
    enterButton: props.enterButton ?? <SearchOutlined/>,
  };
  return (
    <span className="navbar-searchbar">
      <Search {...searchbar_props_with_fallback} />
    </span>
  );
}

export default Searchbar;
