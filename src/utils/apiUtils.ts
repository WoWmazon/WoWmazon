import { URLSearchParams } from "url";

export const createQueryString = (obj: Record<string, any>) => {
  const hasOnlyStringValue = Object.values(obj).every(
    (value) => typeof value !== "string"
  );
  if (hasOnlyStringValue) {
    return new URLSearchParams(obj);
  }

  const stringObject = { ...obj };

  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value !== "string") {
      stringObject[key] = `${value}`;
      return;
    }
    stringObject[key] = value;
  });

  return new URLSearchParams(stringObject);
};
