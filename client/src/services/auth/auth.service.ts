import { axiosClassic } from "@/api/api.interceptor";
import { getRefreshToken, getUserFromStorage, saveToStorage } from "./auth.helper";
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
      const refreshToken = getRefreshToken()

      const response = await axiosClassic.post<string, { data: IAuthResponse }>(
         "/auth/login/access-token",
         { refreshToken },
      );   
      
      if (response.data.accessToken) {
         saveToStorage(response.data);
      }

      return response.data;
   },         

   // Получение своего профайла                        
   async getMyProfile() {
      const user = getUserFromStorage()
      const userId = user.id

      const response = await axiosClassic.post<number, { data: IAuthResponse }>(
         "/auth/me",
         { userId },
      );  
      
      if (response.data.accessToken) {
         saveToStorage(response.data);
      }

      return response.data;
   },
};

export default AuthService;
