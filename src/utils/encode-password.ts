export const encodePassword = (password: string): string => {
  // Simple base64 encoding for demonstration purposes
  return btoa(password);
}
export const decodePassword = (encodedPassword: string): string => {
  return atob(encodedPassword);
}