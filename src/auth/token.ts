import { postRefreshUser } from "@/api/user/apis";
import { getCookie } from "@/utils/get-cookie";
import { setCookieServer } from "@/utils/set-cookie";
import { jwtDecode } from "jwt-decode";

let isRefreshing = false; // 갱신 작업 여부 플래그
let refreshPromise: Promise<string> | null = null; // 갱신 작업 Promise

/** [access token 유효성 검사] */
export const isAccessTokenValid = (token: string | undefined) => {
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
    const expTime = decoded.exp;
    if (!expTime) {
      // exp 필드가 없을 경우의 처리 (예: 유효하지 않은 토큰으로 간주)
      return false;
    }
    const nowTime = Math.floor(Date.now() / 1000);
    return expTime > nowTime;
  } catch (error) {
    console.error("JWT 디코딩 오류:", error);
    return false; // 디코딩 오류 발생 시 false 반환
  }
};

/** [토큰검사후 유효한 accessToken 반환] */
export const getValidAccessToken = async () => {
  const curToken = await getCookie("accessToken");
  if (isAccessTokenValid(curToken)) {
    return curToken;
  } else {
    return await updateAccessToken();
  }
};

/** [리프레쉬토큰을 통해 accessToken 갱신] */
export const updateAccessToken = async (): Promise<string> => {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;

  try {
    refreshPromise = (async () => {
      const curRefreshToken = (await getCookie("refreshToken")) as string;
      const { accessToken, refreshToken } = await postRefreshUser(
        curRefreshToken
      );
      setValidToken(accessToken, refreshToken);
      return accessToken;
    })();

    return await refreshPromise;
  } catch (error) {
    console.error("토큰 갱신 실패:", error);
    throw error;
  } finally {
    isRefreshing = false;
    refreshPromise = null;
  }
};

/** [유효한 토큰으로 cookie값 갱신] */
export const setValidToken = (accessToken: string, refreshToken: string) => {
  const maxAge = 60 * 60 * 24 * 365; // 1년
  const setCookieOptions = {
    secure: true,
    maxAge,
  };
  setCookieServer("accessToken", accessToken, setCookieOptions);
  setCookieServer("refreshToken", refreshToken, setCookieOptions);
};

/*[리프레쉬 토큰 갱신 에러처리] */
// const handleFailRefresh = () => {};
