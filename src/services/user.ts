import { api } from "@/api"
import type { RegistrationVariables } from "@/types/common"
import type { User } from "@/types/entities"
import { errorHandler } from "@/utils/error-handler"

const signUp = async (credentials: RegistrationVariables): Promise<Omit<User, "password">> => {
  try {
    const result = await api.post('/users', credentials)
    return result.data.data
  } catch (error) {
    throw errorHandler(error);
  }
}

export const userService = {
  signUp
}