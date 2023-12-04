import { formSettings } from '../constants/formSettings';

function MappingFromJson() {
  console.log(formSettings.fields);

  return (
    <div>MappingFromJson</div>
  )
}

export default MappingFromJson

{/* 
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
*/}