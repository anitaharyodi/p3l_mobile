import { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

export function useLogin() {
  return useContext(LoginContext);
}

export function LoginProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [token, setIsToken] = useState("");
  const [isLoginPegawai, setIsLoginPegawai] = useState(false);
  const [tokenPegawai, setIsTokenPegawai] = useState("");

  return (
    <LoginContext.Provider value={{ isLogin, setIsLogin, token, setIsToken, isLoginPegawai, setIsLoginPegawai, tokenPegawai, setIsTokenPegawai }}>
      {children}
    </LoginContext.Provider>
  );
}