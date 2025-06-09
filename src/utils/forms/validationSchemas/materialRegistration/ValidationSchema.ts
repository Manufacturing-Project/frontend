import * as Yup from 'yup';

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
