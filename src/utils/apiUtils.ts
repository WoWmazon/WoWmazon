type QueryObject = Record<string, string | number | boolean>;

export const createQueryString = (obj: QueryObject): Record<string, string> => {
  const stringRecord: Record<string, string> = {};
  Object.entries(obj).forEach(
    ([key, value]) => (stringRecord[key] = String(value))
  );

  return stringRecord;
};
