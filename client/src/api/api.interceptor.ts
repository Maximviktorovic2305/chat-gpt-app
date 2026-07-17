import { getAccessToken, removeFromStorage } from "@/services/auth/auth.helper";
import AuthService from "@/services/auth/auth.service";
import axios from "axios";
import { errorCatch, getContentType } from "./api.helper";

export const axiosClassic = axios.create({
   baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api`,
   headers: getContentType(),
   withCredentials: true,
});

export const instanse = axios.create({
   baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api`,
   headers: getContentType(),
   withCredentials: true,
});   

let refreshPromise: Promise<void> | null = null;

const refreshAccessToken = () => {
   if (!refreshPromise) {
      refreshPromise = AuthService.getNewTokens()
         .then(() => undefined)
         .finally(() => {
            refreshPromise = null;
         });
   }

   return refreshPromise;
};

instanse.interceptors.request.use(async (config) => {
   const accessToken = getAccessToken();

   if (config.headers && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
   }

   return config;
});

instanse.interceptors.response.use((config) => config,
   async (error) => {
      const originalRequest = error.config;

      if (
         (error?.response?.status === 401 || 
            errorCatch(error) === "jwt expired" ||
            errorCatch(error) === "jwt must be provided") &&
         error.config &&
         !error.config._isRetry
      ) {
         originalRequest._isRetry = true;
         try {
            // get new tokens
            await refreshAccessToken();
            return instanse.request(originalRequest);
         } catch {
            removeFromStorage();
         }
      }
      throw error;
   }
);
