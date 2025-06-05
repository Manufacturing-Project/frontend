import * as Yup from 'yup';

export const itemValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
});