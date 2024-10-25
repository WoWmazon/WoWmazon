// 쿼리파라미터가 있을시, 쿼리파라미터 반영된 URL 생성함수
export const createURLWithParams = (
  baseURL: string,
  endpoint: string,
  queryParams?: Record<string, string>
): string => {
  const url = new URL(`${baseURL}/${endpoint}`);
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) =>
      url.searchParams.append(key, value)
    );
  }
  return url.toString();
};
