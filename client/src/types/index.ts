export interface ChatMessage {
   role: 'user' | 'assistant';
   content: string;
 }

 export interface ITokens {
  accessToken: string;
  refreshToken: string;
 }                                             

 export interface IAuthResponse extends ITokens {
  user: IUser
}

export interface IUser {
  id: number
  createdAt: string
  updatedAt: string
  name?: string
  email: string
  password?: string
  isAdmin: boolean
}

export interface IAUthRegister {
  email: string   
  password: string
  name?: string   
}

export interface IRegisterForm {
  name?: string
  email: string
  password: string
}