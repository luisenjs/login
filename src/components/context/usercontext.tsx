import { createContext, useState } from "react"

const UserContext = createContext({
    username: "",
    guardarUser: 
});

const UserProvider = ({ children }) => {

    const [user, setUser] = useState();

    const guardarUsuario = (usuario) => {
        setUser(usuario)
    }

    return (
        <UserContext.Provider value={{ user, guardarUsuario }}>
            {children}
        </UserContext.Provider>
    )

}

export { UserContext, UserProvider }