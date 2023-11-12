import { Select, Input } from "antd";
import { useForm, Controller } from "react-hook-form";

type AntdFormValies = {
  select: null | string;
  input: null | string;
}

const nameOptions = [
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'Yiminghe', label: 'yiminghe' },
  { value: 'disabled', label: 'Disabled', disabled: true },
]

const inputStyle = { width: "100%" }

function AntdIntegration() {
  const AntdFormReturns = useForm<AntdFormValies>({
    defaultValues: {
      select: null,
      input: null,
    }
  })

  const { watch, register, control } = AntdFormReturns

  const antdInput = watch("input")
  console.log(antdInput);
  // console.log("rerendered");

  return (
    <div>
      {/* Does not work properly, have to use Controller */}
      <Select
        style={inputStyle}
        options={nameOptions}
        {...register("select")}
      />
      <br />
      <br />
      <br />
      {/* Controller version */}
      <Controller
        control={control}
        name="select"
        render={({ field }) => (
          <Select
            style={inputStyle}
            options={nameOptions}
            {...field}
          />
        )}
      />
      <br />
      <br />
      <br />
      <Controller
        control={control}
        name="input"
        render={({ field }) => (
          <Input
            style={inputStyle}
            // {...field as InputProps}
            onChange={field.onChange}
            onBlur={field.onBlur}
            ref={field.ref}
          />
        )}
      />
    </div>
  )
}

export default AntdIntegration