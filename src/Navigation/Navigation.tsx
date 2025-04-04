import { useContext } from "react"
import { AuthContext } from "../context/authcontext"
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Empleados } from "../pages/empleados/empleados";
import { Login } from "../pages/login/login";
import { ToastContainer } from "react-toastify";
import { NotFound } from "../pages/notfound/notfound";
import { MainLayout } from "../layout/mainlayout";

export const Navigation = () => {

    const { isAuth, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <div>Cargando..</div>
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<NotFound />} />
                <Route path='/auth/login' element={isAuth ? <Navigate to="/dashboard" replace /> : <Login />} />
                <Route element={<MainLayout />}>
                    <Route path="/dashboard" element={isAuth ? <Empleados /> : <Navigate to="/auth/login" replace />} />
                </Route>
            </Routes>
            <ToastContainer theme="colored" closeOnClick={true} />
        </BrowserRouter>
    )

}