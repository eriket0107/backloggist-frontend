export interface LoginVariables {
  email: string;
  password: string;
}

export interface RegistrationVariables extends LoginVariables {
  name: string
}