import { createContext, useEffect, useState } from "react";
import { loginreq } from "../services/requests";
import { jwtDecode } from "jwt-decode";

type AuthContextType = {
    username: string;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    isAuth: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    username: "",
    login: async () => false,
    logout: () => { },
    isAuth: false,
    isLoading: true
});

function AuthProvider({ children }: { children: React.ReactNode }) {

    const [username, setUsername] = useState<string>("Unknown");

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuth(true)
            setUsername(jwtDecode(token).sub!)
        }
        setIsLoading(false);
    }, [username])

    async function login(username: string, password: string) {
        const islogingsuccess = loginreq(username, password);
        //const islogingsuccess = logintest(username, password);
        if (await islogingsuccess) {
            setIsAuth(true);
            setUsername(username);
            return true;
        }
        else {
            setIsAuth(false);
            return false;
        }
    }

    function logout() {
        setUsername("");
        setIsAuth(false);
        localStorage.removeItem("token");
    }


    return (
        <AuthContext.Provider value={{ username, login, logout, isAuth, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }