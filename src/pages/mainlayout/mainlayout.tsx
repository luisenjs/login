import { useContext } from "react"
import { Outlet } from "react-router"
import { AuthContext } from "../../context/authcontext"
import { Button } from "../../components/button";
import { LogOut } from "lucide-react";

export const MainLayout = () => {

    const { username, logout } = useContext(AuthContext);

    return (
        <div className="min-h-screen flex flex-col max-w-screen">
            <header className="fixed w-full h-28 bg-sky-700 p-4 flex justify-between items-center">
                <div>
                    <h1 className="text-white text-2xl font-bold">Hola {username}</h1>
                    <h1 className="text-white">Bienveido a la administración del sistema</h1>
                </div>
                <Button className="max-w-[5vw] text-red-500" onClick={logout} isPrincipal={false}><LogOut /></Button>
            </header>
            <main className="mt-28 grow p-4 max-w-screen">
                <Outlet />
            </main>
        </div>
    )
}