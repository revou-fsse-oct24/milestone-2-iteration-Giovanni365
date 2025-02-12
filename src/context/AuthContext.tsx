import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/router";

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem("token"); // Pastikan key sesuai
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Fungsi Login
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login failed. Please check your credentials.");
      }

      setToken(data.access_token);
      localStorage.setItem("token", data.access_token);

      alert("Login successful! Redirecting to products...");
      await router.replace("/products");
    } catch (error: any) {
      console.error("Login error:", error);
      alert(error.message);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    router.replace("/login");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
