import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/router";

interface AuthContextType {
  token: string | null;
  login: (jwt: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  const login = (jwt: string) => {
    localStorage.setItem("token", jwt);
    setToken(jwt);
    router.push("/"); // redirect to home after login
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    router.push("/login"); // redirect to login page
  };

  return (
    <AuthContext.Provider
      value={{ token, login, logout, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
