import { Modal } from "antd";
import { ConfirmModalType } from "./ConfirmModalTypes.ts";
import styles from "./ConfirmModalStyles.module.scss";
import { CloseOutlined } from "@ant-design/icons";
import ButtonEl from "../ButtonEl/ButtonEl.tsx";

function ConfirmModal(props: ConfirmModalType): JSX.Element {
  const fallBack: ConfirmModalType = {
    title: props.title,
    content: props.content,
    isConfirmOpen: props.isConfirmOpen,
    onOk: props.onOk,
    onCancel: props.onCancel,
  };

  return (
    <Modal
      className="confirm-modal"
      closeIcon={<CloseOutlined className="confirm-close" />}
      title={fallBack.title}
      open={fallBack.isConfirmOpen}
      onOk={fallBack.onOk}
      onCancel={fallBack.onCancel}
      okText={"Delete"}
      okType="danger"
      footer={null}
    >
      <p>{fallBack.content}</p>
      <div className={styles.confirm_buttons}>
        <ButtonEl
          buttonType="formCancel"
          text="Cancel"
          onClick={fallBack.onCancel}
        />
        <ButtonEl
          buttonType="formSubmit"
          text="Delete"
          onClick={fallBack.onOk}
        />
      </div>
    </Modal>
  );
}

export default ConfirmModal;
