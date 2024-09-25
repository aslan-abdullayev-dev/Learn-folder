import { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons"
import { Button } from "antd";

import { IconPickerBoxProps } from "./IconPickerBoxTypes.ts";
import IconPickerBoxModal from "./IconPickerBoxModal.tsx";
import MyAntIcons from "../../../lib/MyAntIcons.ts";

function IconPickerBox(props: IconPickerBoxProps) {
  const icon_picekr_props_with_fallback: IconPickerBoxProps = {
    label: props.label ?? "",
    required: props.required ?? false,
    iserror: props.iserror ?? false,
    errtext: props.errtext ?? "",
    value: props.value,
    name: props.name,
    onChange: props.onChange ?? undefined,
  };

  const { iserror, errtext, label, required, value, onChange } =
    icon_picekr_props_with_fallback;

  const AntdIcons = new MyAntIcons()
  // const iconsSet = AntdIcons.filterType('outlined')

  const [showIconModal, setShowIconModal] = useState(false)
  const [iconSetAfterFilter, setIconSetAfterFilter] = useState(AntdIcons.getAllIconsArr())
  const [selectedIcon, setSelectedIcon] = useState("")
  const SelectedIconRef = AntdIcons.getOneIcon(value)

  function handleCloseModal() {
    setSelectedIcon(value)
    setShowIconModal(false)
  }

  useEffect(() => {
    setSelectedIcon(value)
  }, [showIconModal])


  return (
    <div className="input-box default">
      <div className="input-box__top">
        <span className="input-box__top-label">{label}</span>{" "}
        <span className="input-box__top-star">
          {required === true ? "*" : null}
        </span>
      </div>
      <div
        className={`wrapper ${iserror ? "wrapper__error" : ""}`}
        style={{ paddingInline: "11px" }}
      >
        <div className="wrapper__left">
          <span style={{
            display: "flex",
            height: "22px",
            width: "22px",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--t-212656-F0F0F0)"
          }}>
            {SelectedIconRef && <SelectedIconRef/>}
          </span>
        </div>

        <div className="wrapper__right">
          <Button
            type="primary"
            className="wrapper__right-button"
            onClick={() => setShowIconModal(true)}
          >
            Choose icon <EditOutlined/>
          </Button>
        </div>
      </div>

      <div className="input-box__err">{iserror ? errtext : null}</div>

      {showIconModal ?
        <IconPickerBoxModal
          isOpen={showIconModal}
          close={handleCloseModal}
          value={value}
          onChange={onChange}
          iconsSet={AntdIcons}
          iconSetAfterFilter={iconSetAfterFilter}
          setIconSetAfterFilter={setIconSetAfterFilter}
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
        />
        : null}
    </div>
  );
}

export default IconPickerBox;
