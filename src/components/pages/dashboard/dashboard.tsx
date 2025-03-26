import { useEffect } from "react"
import { ToastContainer, toast } from "react-toastify"

export const Dashboard = () => {

    const loginSuccess = () => toast.success("Bienvenido")

    useEffect(()=>{
        loginSuccess()
    },[])

    return (
        <div>
            <p>Bienvenido al dashboard :D</p>
            <ToastContainer />
        </div>
    )
}