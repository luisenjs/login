import axios from "axios";
import { createContext, useEffect, useState } from "react";

type AuthContextType = {
    username: string;
    login?: (username: string, password: string) => Promise<boolean>;
    logout?: () => void;
    isAuth: boolean;
    isLoading?: boolean;
}

const AuthContext = createContext<AuthContextType>({
    username: "string",
    isAuth: false
});

function AuthProvider({ children }: { children: React.ReactNode }) {

    const [username, setUsername] = useState<string>("");

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuth(true)
            setUsername(username);
        }
        setIsLoading(false);
    }, [username])

    async function login(username: string, password: string) {
        try {
            const param = {
                'username': username,
                'password': password,
                'client_id': 'sasfdesarrollo',
                'client_secret': 'S@sfD3sarr0ll0',
            }
            const data = await axios.post("http://192.168.0.115:8000/security/v2/oauth/login", new URLSearchParams(param), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            localStorage.setItem("token", data.data.access_token);
            console.log(data.data)
            setIsAuth(true);
            console.log("acceso");
            setUsername(username);
            return (true);
        } catch (error) {
            console.log(error)
            setIsAuth(false);
            return (false);
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