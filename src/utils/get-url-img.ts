
export const getImageUrl = (imgUrl?: string) => {
  return imgUrl
    ? new URL(imgUrl, import.meta.env.VITE_BASE_URL).toString()
    : undefined;
};