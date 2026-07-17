import { axiosClassic, instanse } from "@/api/api.interceptor";
import { removeFromStorage, saveToStorage } from "./auth.helper";
import { IAUthRegister, IAuthResponse } from "@/types";

export const AuthService = {

   // Регистрация для пользователя   
   async register(data: IAUthRegister) {
      const response = await axiosClassic<IAuthResponse>({
         url: `/auth/register`,
         method: "POST",
         data,
      });

      if (response.data.accessToken) {
         saveToStorage(response.data);
      }

      return response.data;
   },

   // Логин для пользователя   
   async login(data: { email: string, password: string }) {
      const response = await axiosClassic<IAuthResponse>({
         url: `/auth/login`,
         method: "POST",
         data,
      });

      if (response.data.accessToken) {
         saveToStorage(response.data);
      }

      return response.data;
   },   

   // Получение новых токенов               
   async getNewTokens() {
      const response = await axiosClassic.post<string, { data: IAuthResponse }>(
         "/auth/refresh",
         null,
         { headers: { "X-Requested-With": "XMLHttpRequest" } },
      );   
      
      if (response.data.accessToken) {
         saveToStorage(response.data);
      }

      return response.data;
   },         

   // Получение своего профайла                        
   async getMyProfile() {
      const response = await instanse.get<IAuthResponse>("/auth/me");

      return response.data;
   },

   async logout() {
      try {
         await axiosClassic.post(
            "/auth/logout",
            null,
            { headers: { "X-Requested-With": "XMLHttpRequest" } },
         );
      } finally {
         removeFromStorage();
      }
   },
};

export default AuthService;
