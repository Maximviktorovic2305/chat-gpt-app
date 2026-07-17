'use client'

import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/token.constants";
import { useActions } from "@/hooks/useActions";
import { FC, PropsWithChildren, useEffect } from "react";

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
   const { checkAuth } = useActions();

   useEffect(() => {
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      checkAuth();
   }, [checkAuth]);

   return <>{children}</>;

};

export default AuthProvider;
