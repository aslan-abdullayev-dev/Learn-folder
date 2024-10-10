import { useFormik } from "formik";
import { Col, Modal, Row } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

import SelectBox from "../../../../shared/components/FormComponents/SelectBox/SelectBox.tsx";
import InputBox from "../../../../shared/components/FormComponents/InputBox/InputBox.tsx";
import ButtonEl from "../../../../shared/components/ButtonEl/ButtonEl.tsx";
import { apiUrls } from "../../../../shared/constants/apiUrls.ts";
import DatePickerBox
  from "../../../../shared/components/FormComponents/DatePickerBox/DatePickerBox.tsx";
import {
  ITenderFilterModal,
  ITenderFilterModalForm
} from "../../types/all-tenders-filter-modal-props.ts";

const AllTendersFilterModal = ({
  isOpen,
  setIsOpen,
  createObjectFromQuery,
  createQueryFromObject
}: ITenderFilterModal) => {

  const navigate = useNavigate();
  const location = useLocation();
  const initParams = new URLSearchParams(location.search);

  const tenderFilterFormik = useFormik<ITenderFilterModalForm>(
    {
      initialValues: createObjectFromQuery(initParams),
      onSubmit: (values) => {
        const searchQuery = createQueryFromObject(new URLSearchParams(), values)
        navigate(`${location.pathname}?${searchQuery}`);
        onClose()
      }
    }
  )

  const {
    values,
    handleBlur,
    setFieldValue,
    getFieldProps,
    handleSubmit
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
          onClick={handleSubmit}
        />,
      ]}
    >
      <Row gutter={16}>
        <Col span={8}>
          <SelectBox
            value={values.eventStatus}
            onChange={(val) => setFieldValue("eventStatus", val)}
            onBlur={handleBlur("eventStatus")}
            disabled
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
            label="Satınalan təşkilatın adı"
            value={values.buyerOrganizationIds}
            onChange={(val) => setFieldValue("buyerOrganizationIds", val)}
            onBlur={handleBlur("buyerOrganizationIds")}
            options={undefined}
            loadOptions={{
              url: apiUrls.buyerOrganisation.getAll,
              getOptionSettings: {
                value: "id",
                label: "name"
              }
            }}
            type="load-options"
            name="eventStatus"
            mode="multiple"
            showSearch
          />
        </Col>
        <Col span={8}>
          <InputBox
            {...getFieldProps("eventNumber")}
            label="Müsabiqənin nömrəsi"
            type="number"
          />
        </Col>
        <Col span={8}>
          <DatePickerBox
            label="Dərc edilmə balanğıc tarix"
            value={values.fromPublishDate}
            onChange={(val) => setFieldValue("fromPublishDate", val)}
            onBlur={handleBlur("fromPublishDate")}
          />
        </Col>
        <Col span={8}>
          <DatePickerBox
            label="Dərc edilmə son tarix"
            value={values.toPublishDate}
            onChange={(val) => setFieldValue("toPublishDate", val)}
            onBlur={handleBlur("toPublishDate")}
          />
        </Col>
        <Col span={8}>
          <SelectBox
            value={values.categoryCodeIds}
            onChange={(val) => setFieldValue("categoryCodeIds", val)}
            onBlur={handleBlur("categoryCodeIds")}
            options={undefined}
            loadOptions={{
              url: apiUrls.categoryCodes.getAll,
              getOptionSettings: {
                value: "id",
                label: "code"
              }
            }}
            label="Kateqoriya"
            type="load-options"
            name="eventStatus"
            mode="multiple"
            showSearch
          />
        </Col>
        <Col span={8}>
          <InputBox
            {...getFieldProps("eventName")}
            label="Satınalma predmeti"
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default AllTendersFilterModal;


