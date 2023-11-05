import { useFormikContext } from 'formik';
import Select from 'react-select';

function AppSelect({ child, options }) {
  const { values, setFieldValue } = useFormikContext();

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ marginRight: '8px', textTransform: 'capitalize' }}>{child}</span>
      <Select
        options={options || []}
        value={values[child]}
        name={child}
        styles={{
          control: (provided) => ({
            ...provided,
            width: '200px',
          }),
        }}
        onChange={(v) => setFieldValue(child, v)}
      />
    </div>
  )
}

export default AppSelect;
