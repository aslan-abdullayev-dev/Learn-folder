import { useFormik } from "formik";
import { Col, Modal, Row } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import ButtonEl from "../../../../shared/components/ButtonEl/ButtonEl.tsx";
import InputBox from "../../../../shared/components/FormComponents/InputBox/InputBox.tsx";
import {
  ITenderFilterModal,
  ITenderFilterModalForm
} from "../../types/all-tenders-filter-modal-props.ts";
import SelectBox from "../../../../shared/components/FormComponents/SelectBox/SelectBox.tsx";

const AllTendersFilterModal = ({ isOpen, setIsOpen }: ITenderFilterModal) => {

  const tenderFilterFormik = useFormik<ITenderFilterModalForm>(
    {
      initialValues: {
        eventStatus: 1,
        buyerOrganizationIds: [],
        eventNumber: "",
        fromPublishDate: "", //"2024-08-27"
        toPublishDate: "", //"2024-10-27"
        categoryCodeIds: [],
        eventName: "",
        awardedParticipantName: "",
        awardedParticipantVoen: ""
      },
      onSubmit: () => {
      }
    }
  )

  const {
    values,
    handleBlur,
    setFieldValue,
    getFieldProps
  } = tenderFilterFormik;

  function onClose() {
    setIsOpen(false);
  }

  return (
    <Modal
      closeIcon={<CloseOutlined/>}
      open={isOpen}
      onCancel={onClose}
      destroyOnClose={true}
      title="Ətraflı axtarış"
      width={1000}
      footer={[
        <ButtonEl
          key={1}
          buttonType="formCancel"
          text="Cancel"
          onClick={onClose}
        />,
        <ButtonEl
          key={2}
          buttonType="formSubmit"
          text="Submit"
          onClick={onClose}
        />,
      ]}
    >
      <Row gutter={16}>
        <Col span={8}>
          <SelectBox
            value={values.eventStatus}
            onChange={(val) => setFieldValue("eventStatus", val)}
            onBlur={handleBlur("eventStatus")}
            options={[
              {
                value: 1, label: "Tamamlanmış"
              },
              {
                value: 2, label: "Davam Edən"
              },
              {
                value: 3, label: "Ləğv Edilmış"
              },
            ]}
            loadOptions={undefined}
            label="Müsabiqənin statusu"
            type="static-options"
            name="eventStatus"
          />
        </Col>
        <Col span={8}>
          <SelectBox
            value={values.buyerOrganizationIds}
            onChange={(val) => setFieldValue("buyerOrganizationIds", val)}
            onBlur={handleBlur("eventStatus")}
            options={[
              {
                value: 1, label: "neyse  ne"
              },
            ]}
            loadOptions={undefined}
            label="Satınalan təşkilatın adı"
            type="static-options"
            name="eventStatus"
            mode="multiple"
          />
        </Col>
        <Col span={8}>
          <InputBox
            {...getFieldProps("eventNumber")}
            label="Müsabiqənin nömrəsi"
            type="number"
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default AllTendersFilterModal;


