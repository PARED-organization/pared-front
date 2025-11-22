import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import { cookies } from "next/headers";

const createServerAxios = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
  });

  /** -------------------------
   *  REQUEST INTERCEPTOR
   *  -------------------------
   *  서버 컴포넌트에서는 JS가 쿠키 못 읽으니까
   *  next/headers 의 cookies() 로 값을 읽어 헤더에 직접 주입.
   */
  instance.interceptors.request.use(async (config: AxiosRequestConfig) => {
    const cookieStore = cookies();

    const accessToken = cookieStore.get("Authorization")?.value;
    const refreshToken = cookieStore.get("Authorization-refresh")?.value;

    if (!config.headers) config.headers = {};

    if (accessToken) {
      // 서버에서 수동으로 Cookie 헤더 삽입
      config.headers["Cookie"] = `Authorization=${accessToken}; Authorization-refresh=${refreshToken}`;
    }

    return config;
  });

  /** -------------------------
   *  RESPONSE INTERCEPTOR
   *  -------------------------
   *  access token 만료 시 → 같은 요청 refresh로 재전송.
   */
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const { response, config } = error;
      const originalRequest = config!;

      // Access Token 만료 체크
      if (response?.status === 417 && response?.data === "access token denied") {
        // 같은 요청을 refresh token 기반으로 다시 호출
        return instance(originalRequest);
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

const ServerAxiosApi = createServerAxios();
export default ServerAxiosApi;
