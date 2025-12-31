import { createContext, type ReactNode, useContext, useState, useEffect } from "react";
import { refreshAccessToken } from "@/api/auth.ts";

type AuthContextType = {
    accessToken: string | null;
    setAccessToken: (token:string | null) => void;
    user: {
        id: string;
        name: string;
        email: string;
    } | null;
    setUser: (user:AuthContextType["user"]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }:{ children: ReactNode }) {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [user, setUser] = useState<AuthContextType["user"] | null>(null);
    useEffect(() => {
        async function loadAuth() {
            try {
                const { accessToken: newToken, user } = await refreshAccessToken();
                setAccessToken(newToken);
                setUser(user);
            } catch(error:any) {
                console.log("Failed to refresh access token!", error);
            }
        }

        loadAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, user, setUser }} >
            { children }
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error("useAuth must be used within a provider");
    } else {
        return context;
    }
}
