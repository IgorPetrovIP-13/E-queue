export function preSendClear<T extends Record<string, any>>(obj: T): T {
  const cleanValue = (value: any): any => {
    if (Array.isArray(value)) {
      return value.map(cleanValue).filter(item => !!item !== false);
    } else if (typeof value === "object" && value !== null) {
      return preSendClear(value);
    } else if (typeof value === "string") {
      const trimmed = value.trim().replace(/[\s\n\r\t]+/g, " ");

      return trimmed || null;
    } else if (!value) {
      return null;
    }

    return value;
  };

  const result = {} as T;

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = cleanValue(obj[key]);
    }
  }

  return result;
}
