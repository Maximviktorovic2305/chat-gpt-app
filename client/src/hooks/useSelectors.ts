'use client'

import { RootState } from "@/store/store";
import { useSelector } from "react-redux";


export const useUser= () => useSelector((state: RootState) => state.user);
export const useChat= () => useSelector((state: RootState) => state.chatSlice);
