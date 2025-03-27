import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import { refreshToken } from "../../../services/requests";

export const Dashboard = () => {

    const loginSuccess = () => toast.success("Bienvenido")

    const token = localStorage.getItem("TOKEN")!
    const tiempoExp = jwtDecode(token).exp!

    useEffect(() => {
        loginSuccess();

        const interval = setInterval(() => {
            const currentTime = Math.floor(Date.now() / 1000);
            const remaining = tiempoExp - currentTime;
            if (remaining === 300) {
                refreshToken(token);
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [tiempoExp])

    return (
        <div>
            <p>Bienvenido al dashboard :D</p>
            <ToastContainer />
        </div>
    )
}