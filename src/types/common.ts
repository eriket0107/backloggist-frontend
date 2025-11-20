export interface LoginVariables {
  email: string;
  password: string;
}

export interface RegistrationVariables extends LoginVariables {
  name: string
}

export interface FilterParams {
  filters?: Partial<{
    page: number;
    limit: number;
    isPublic: boolean
    searchTerm?: string;
  }>
}