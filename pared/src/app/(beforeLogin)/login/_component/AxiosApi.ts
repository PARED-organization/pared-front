import axios,{AxiosError,InternalAxiosRequestConfig} from "axios";


const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials:true
});




let isRefreshing = false;
let refreshSubscribers:((token:string)=>void)[] = [];

// Access Token 갱신 시 구독자들에게 새 토큰 전달
const onTokenRefreshed = (newToken: string) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

// Refresh 요청 동안 대기하는 함수 등록
const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};


api.interceptors.response.use(
    (response)=>response,
    async (error:AxiosError)=>{
        const{
            config,
            response
        } = error;
        const originalRequest = config!;
        if(response?.status === 417 && response?.data === 'access token denied'){
            return api(originalRequest);
        }

        return Promise.reject(error);
    }

    
);
export default api;
