import { DatePicker, DatePickerProps } from "antd";
import { DatePickerBoxType, PickerType } from "./DatePickerBoxTypes.ts";

import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

function DatePickerBox(props: DatePickerBoxType) {
  const datePickerBoxProps: DatePickerBoxType = {
    name: props.name ?? "",
    label: props.label,
    errtext: props.errtext ?? "",
    iserror: props.iserror ?? false,
    required: props.required ?? false,
    onChange: props.onChange,
    onBlur: props.onBlur ?? undefined,
    type: props.type ?? "date",
    value: getValueForDatePickerFromFormikData(props.value, props.type),
    allowClear: props.allowClear,
  };

  const {
    label,
    iserror,
    errtext,
    required,
    onChange,
    type,
    ...date_props_with_fallback
  } = datePickerBoxProps;

  function getValueForDatePickerFromFormikData(
    value: string,
    type: PickerType | undefined
  ) {
    const pickerType: PickerType = type ?? "date";
    if (pickerType === "time" && value) {
      if (!isValidTime(value)) return null;
      const time = value?.split(":");
      if (time) {
        const [hours, minutes, seconds] = time;
        const newDate = new Date();
        newDate.setHours(+hours);
        newDate.setMinutes(+minutes);
        newDate.setSeconds(+seconds);
        return dayjs(newDate);
      }
    } else if (pickerType === "date") {
      if (!isValidDate(value)) return null;
      return dayjs(value);
    } else if (pickerType === "datetime") {
      if (!isValidDateTime(value)) return null;
      return dayjs(value);
    }
  }

  function isValidDate(dateString: string) {
    const date = dayjs(dateString);
    return date.isValid() && date.format("YYYY-MM-DD") === dateString;
  }

  function isValidDateTime(dateTimeString: string) {
    const date = dayjs(dateTimeString);
    return (
      date.isValid() && date.format("YYYY-MM-DD HH:mm:ss") === dateTimeString
    );
  }

  function isValidTime(timeString: string) {
    let result = false;
    try {
      const time = timeString?.split(":");
      if (time) {
        const [hours, minutes, seconds] = time;
        if (hours && minutes && seconds) result = true;
      }
    } catch {
      result = false;
    }
    return result;
  }

  function handleOnchangeDate(_: DatePickerProps["value"], dateString: string | string[]) {
    onChange(dateString);
  }

  return (
    <div className="input-box">
      <div className="input-box__top">
        <span className="input-box__top-label">{label}</span>{" "}
        <span className="input-box__top-star">
          {required === true ? "*" : null}
        </span>
      </div>
      <DatePicker
        {...date_props_with_fallback}
        showTime={type === "time" || type === "datetime"}
        picker={type === "time" ? "time" : "date"}
        onChange={handleOnchangeDate}
        style={{ width: "100%", backgroundColor: "transparent" }}
        status={iserror ? "error" : ""}
      />
      <div className="input-box__err">{iserror ? errtext : null}</div>
    </div>
  );
}

export default DatePickerBox;
