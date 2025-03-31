import { jwtDecode } from "jwt-decode";
import { useContext } from "react"
import { toast } from "react-toastify"
import { AuthContext } from "../../context/authcontext";
import { Button } from "../../components/button";

export const Dashboard = () => {

    const { username, logout } = useContext(AuthContext);

    const token = localStorage.getItem("token");

    const timeExp: { exp: number } = token ? jwtDecode(token) : { exp: 0 };

    const currentTime = Math.floor(Date.now() / 1000);

    const timeleft = timeExp.exp - currentTime;

    if (timeleft < 0) {
        toast.info("El token ha expirado", { autoClose: false });
        salir();
    }

    function salir() {
        logout();
    }
    /*
    function openmodal() {
        dialogRef.current?.showModal();
    }

    function cerrarmodal() {
        dialogRef.current?.close();
    }*/

    return (
        <div className="flex flex-col gap-5 items-center justify-center h-screen">
            <p>Bienvenido al dashboard :D {username}</p>
            <Button className="max-w-[20vw]" onClick={salir} isPrincipal={true}>Salir</Button>
            <Button className="max-w-[20vw]" isPrincipal={false}>Abrir modal</Button>
            <h3>Tiempo {currentTime}</h3>
            <h3>Tiempo expiración {timeExp.exp}</h3>
            <h3>Tiempo de expiración del token: {timeleft}</h3>
        </div>
    )
}