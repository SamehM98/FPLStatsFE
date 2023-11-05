import { Button } from '@mui/material';
import { Form, Formik } from 'formik';
import { formikStyle } from '../../helpers/constants';
import AppSelect from './AppSelect';

function AppFormik({ initialValues, formikChildren, onSubmit, text, optionsMap }) {
  return (<Formik initialValues={initialValues} enableReinitialize onSubmit={onSubmit}>
    {({ handleSubmit }) =>
      <Form onSubmit={handleSubmit}>
        <div style={formikStyle}>
          {formikChildren.map((child) => (
            <AppSelect child={child} options={optionsMap[child]} key={child} />
          ))}
          <Button variant="outlined" type="submit">{text}</Button>
        </div>
      </Form>}
  </Formik>)
}

export default AppFormik;
