import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

export interface User {
  username: string;
  isAdmin: boolean;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  loading: true,
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");

    if (token) {
      try {
        const decoded = jwtDecode<{
          sub: number;
          username: string;
          isAdmin: boolean;
        }>(token);
        
        setUser({
          username: decoded.username,
          isAdmin: decoded.isAdmin,
        });
      } catch (err) {
        console.error("Invalid token:", err);
        setUser(null);
      }
    }

    setLoading(false);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
