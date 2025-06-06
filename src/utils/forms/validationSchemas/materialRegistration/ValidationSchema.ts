import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[@$!%*?&#^()_\-+=]/, 'Password must contain at least one special character'),
});

export const RegisterValidationSchema = Yup.object({
  ...loginValidationSchema.fields,
  username: Yup.string().required("Username is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

export const rawMaterialValidationSchema = Yup.object({
  m_name: Yup.string().required("Material Name is required"),
  m_code: Yup.string().required("Material Code is required"),
  m_description: Yup.string().required("Description is required"),
  m_reorderLevel: Yup.number()
    .typeError("Reorder Level must be a number")
    .required("Reorder Level is required"),
  m_unit: Yup.string().required("Unit is required"),
  m_status: Yup.string().required("Status is required"),
  hasVariants: Yup.boolean().required("Has Variants is required"),
});
