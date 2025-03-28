import { jwtDecode } from "jwt-decode";
import { useContext, useEffect } from "react"
import { ToastContainer, toast } from "react-toastify"
import { refreshToken } from "../../../services/requests";
import { AuthContext } from "../../context/authcontext";
import { useNavigate } from "react-router";

export const Dashboard = () => {

    const { username, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const loginSuccess = () => toast.success("Bienvenido")

    const token: string = localStorage.getItem("token")!
    const tiempoExp = jwtDecode(token).exp!

    useEffect(() => {
        loginSuccess();
        const interval = setInterval(() => {
            const currentTime = Math.floor(Date.now() / 1000);
            const remaining = tiempoExp - currentTime;
            //console.log(remaining)
            if (remaining === 9855) {
                refreshToken(token);
                console.log("refreshing token")
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [token, tiempoExp])

    const salir = () => {
        navigate("/")
        logout!();
    }

    return (
        <div>
            <p>Bienvenido al dashboard :D {username}</p>
            <button onClick={salir}>Salir</button>
            <ToastContainer />
        </div>
    )
}