import { URLSearchParams } from "url";

type QueryObject = Record<string, string | number | boolean>;

export const createQueryString = (obj: QueryObject): URLSearchParams => {
  const allEntriesAsStrings: [string, string][] = Object.entries(obj).map(
    ([key, value]) => [key, String(value)]
  );

  return new URLSearchParams(allEntriesAsStrings);
};
