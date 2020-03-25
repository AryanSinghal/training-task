import * as yup from 'yup';

export const VALIDATION_SCHEMA = yup.object().shape({
  count: yup
    .number('Root Key Count should be number')
    .required('Root Key Count is required'),
  depth: yup
    .number('Max Depth should be number')
    .required('Max Depth is required'),
});
