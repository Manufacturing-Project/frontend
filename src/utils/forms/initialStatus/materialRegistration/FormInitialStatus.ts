import { LoginFormValues, RegisterFormValues, RawMaterialFormValues } from '../../../types/forms/formTypes';

export const loginInitialValues: LoginFormValues = {
  email: '',
  password: '',
};

export const registerInitialValues: RegisterFormValues = {
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
};

export const rawMaterialInitialValues: RawMaterialFormValues = {
  m_name: '',
  m_code: '',
  m_description: '',
  m_reorderLevel: 0,
  m_unit: '',
  m_status: '',
  hasVariants: false,
};