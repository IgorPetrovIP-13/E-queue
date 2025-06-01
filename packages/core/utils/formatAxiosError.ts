export const formatAxiosError = (error: any): string => {
  const message = error.response?.data?.message;

  if (message) {
    if (Array.isArray(message)) {
      return message[0]?.message || message[0] || "Невідома помилка";
    }

    return message.message;
  }

  if (error.response?.status) {
    return `Помилка ${error.response.status}: ${error.response?.statusText || "Невідома помилка"}`;
  }

  return error.message || "Невідома помилка";
};
