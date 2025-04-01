import { useContext } from "react"
import { AuthContext } from "../context/authcontext"
import { Navigate } from "react-router";
import { Login } from "../pages/login/login";
import { Dashboard } from "../pages/empleados/empleados";

export const ProtectedLogin = () => {
    
    const { isAuth } = useContext(AuthContext);

    if (isAuth) {
        return <Navigate to="/dashboard" replace />
    } else {
        return <Login />
    }

}

export const ProtectedDashboard = () => {

    const { isAuth } = useContext(AuthContext);

    if (!isAuth) {
        return <Navigate to="/auth/login" replace />
    } else {
        return <Dashboard />
    }

}