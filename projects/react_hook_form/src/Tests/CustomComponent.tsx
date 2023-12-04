import { useForm, Controller } from 'react-hook-form'

import InputBox from '../components/InputBox'

type FormWithCustomInputsValues = {
  name: string
}

function CustomComponent() {
  const FormWithCustomInputs = useForm<FormWithCustomInputsValues>({
    defaultValues: {
      name: ""
    }
  })

  const { control } = FormWithCustomInputs

  return (
    <div>
      <Controller
        control={control}
        name='name'
        render={({ field: { name, onBlur, onChange, value, disabled } }) => (
          <InputBox
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            disabled={disabled}
          />
        )}
      />
    </div>
  )
}

export default CustomComponent