import { ComponentType } from "react";

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

export interface HomeForWhomItemsProps {
  title: string
  description: string
  id: number
}               

export interface InstructionsChatItemsProps {
  title: string
  text: string
  id: number
}                     

export interface UsesItemsProps {
  title: string
  text: string
  id: number
  Icon: ComponentType;
}

export interface OpportunitiesCardsProps {
  title: string
  text: string
  id: number
  Icon: ComponentType;
}