import "./IconPickerBoxModalStyles.scss"

import { Modal } from 'antd'
import { useState, useEffect } from "react"
import { CloseOutlined } from "@ant-design/icons"

import Searchbar from "../Searchbar/Searchbar.tsx";
import ButtonEl from "../../ButtonEl/ButtonEl.tsx";

function IconPickerBoxModal({
  isOpen,
  close,
  onChange,
  iconSetAfterFilter,
  setIconSetAfterFilter,
  iconsSet,
  selectedIcon,
  setSelectedIcon
}: any) {

  const [searchVal, setSearchVal] = useState("")

  function handleClickIcon(iconName: string) {
    selectedIcon === iconName
      ? setSelectedIcon("")
      : setSelectedIcon(iconName)
  }

  function handleSubmit() {
    onChange(selectedIcon)
    close()
  }

  function handleCancel() {
    close()
  }

  function handleSearchIcon(e: any) {
    const userInput = e.target.value
    setSearchVal(userInput)
    setIconSetAfterFilter(iconsSet.searchIcon(userInput))
  }

  useEffect(() => {
    setSearchVal("")
    setIconSetAfterFilter(iconsSet.getAllIconsArr())
  }, [open])

  return (
    <Modal
      title="Antd icon picker"
      open={isOpen}
      onCancel={close}
      closeIcon={<CloseOutlined/>}
      width={485}
      footer={[
        <ButtonEl
          buttonType="formCancel"
          text="Cancel"
          onClick={handleCancel}
          key="1"
        />,
        <ButtonEl
          buttonType="formSubmit"
          text="Add"
          onClick={handleSubmit}
          key="2"
        />,
      ]}
    >
      <div className="search-bar">
        <Searchbar
          value={searchVal}
          onChange={handleSearchIcon}
          placeholder="Ikon ara"
        />
      </div>
      <div className="icons-wrapper">
        {iconSetAfterFilter.map((iconData: any) => {
          const Icon = iconData.iconRef;
          return (
            <button
              className={
                `${selectedIcon === iconData.name
                  ? "icons-wrapper__item active"
                  : "icons-wrapper__item"}`
              }
              key={iconData.name}
              onClick={() => handleClickIcon(iconData.name)}
            >
              <Icon/>
            </button>
          )
        })}

      </div>
    </Modal>
  )
}

export default IconPickerBoxModal