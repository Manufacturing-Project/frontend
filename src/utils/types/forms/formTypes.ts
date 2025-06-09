export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues extends LoginFormValues {
  username: string;
  confirmPassword: string;
}

export interface RawMaterialFormValues {
  m_name: string;
  m_code: string;
  m_description: string;
  m_reorderLevel: number;
  m_unit: string;
  m_status: string;
  hasVariants: boolean;
}