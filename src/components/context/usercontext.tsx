import { useState } from "react"
import { authContext } from "./context";

export const AuthProvider = ({ children }) => {
    const [Auth, setAuth] = useState("false");
    return (
        <authContext.Provider value={{ Auth }}>
            {children}
        </authContext.Provider>
    )
}