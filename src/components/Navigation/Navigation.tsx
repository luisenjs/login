import { useContext } from "react"
import { AuthContext } from "../context/authcontext"
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Dashboard } from "../pages/dashboard/dashboard";
import { Login } from "../pages/login/login";
import { TestPage } from "../pages/testpage/testpage";

export const Navigation = () => {

    const { isAuth, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <div>Cargando..</div>
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path='*' element={isAuth ? <Navigate to="/dashboard" replace /> : <Navigate to="/auth/login" replace />} />
                <Route path='/testing' element={<TestPage />} />
                {
                    isAuth
                        ? <Route path="/dashboard" element={<Dashboard />} />
                        : <Route path='/auth/login' element={<Login />} />
                }
            </Routes>
        </BrowserRouter>
    )

}