import { jwtDecode } from "jwt-decode";
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { AuthContext } from "../../context/authcontext";
import { getEmpleados, refreshToken } from "../../services/requests";
import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Table from "../../components/table";

type empleadosShowData = {
    numeroIdentificacion: string;
    nombres: string;
    apellidos: string;
    correoElectronico: string;
    correoNotificacion: string;
    numeroConvencional: string;
    numeroCelular: string;
};

const columnHelper = createColumnHelper<empleadosShowData>();

const columns = [
    columnHelper.accessor('numeroIdentificacion', {
        header: () => (
            <span className="flex gap-2 items-center">
                Cédula  <ArrowUpDown className='size-4' />
            </span>),
        cell: info => <p>{info.getValue()}</p>,
    }),
    columnHelper.accessor('nombres', {
        header: () => (
            <span className="flex gap-2 items-center">
                Nombres  <ArrowUpDown className='size-4' />
            </span>),
        cell: info => <p>{info.getValue()}</p>,
    }),
    columnHelper.accessor('apellidos', {
        header: () => (
            <span className="flex gap-2 items-center">
                Apellidos  <ArrowUpDown className='size-4' />
            </span>),
        cell: info => <p>{info.getValue()}</p>,
    }),
    columnHelper.accessor('correoElectronico', {
        header: () => (
            <span className="flex gap-2 items-center">
                Correo electrónico  <ArrowUpDown className='size-4' />
            </span>),
        cell: info => (
            <a href={`mailto:${info.getValue()}`} className="italic text-blue-500 hover:underline">{info.getValue()}</a>
        ),
    }),
    columnHelper.accessor('correoNotificacion', {
        header: () => (
            <span className="flex gap-2 items-center">
                Correo de notificación  <ArrowUpDown className='size-4' />
            </span>),
        cell: info => (
            <a href={`mailto:${info.getValue()}`} className="italic text-blue-500 hover:underline">{info.getValue()}</a>
        ),
    }),
    columnHelper.accessor('numeroConvencional', {
        header: () => (
            <span className="flex gap-2 items-center">
                Número convencional  <ArrowUpDown className='size-4' />
            </span>),
        cell: info => (
            <a href={`tel:${info.getValue()}`} className="text-blue-500 hover:underline">{info.getValue()}</a>
        ),
    }),
    columnHelper.accessor('numeroCelular', {
        header: () => (
            <span className="flex gap-2 items-center">
                Número celular  <ArrowUpDown className='size-4' />
            </span>),
        cell: info => (
            <a href={`tel:${info.getValue()}`} className="text-blue-500 hover:underline">{info.getValue()}</a>
        ),
    }),
]

export const Empleados = () => {

    const [empleados, setEmpleados] = useState<empleadosShowData[]>();

    const { logout } = useContext(AuthContext);

    const token = localStorage.getItem("token");

    const timeExp: { exp: number } = token ? jwtDecode(token) : { exp: 0 };

    const currentTime = Math.floor(Date.now() / 1000);

    const timeleft = timeExp.exp - currentTime;

    async function getdata(page: number, size: number) {
        console.log("haciendo petición...")
        if (!token) {
            toast.error("No autorizado");
        }
        if (timeleft < 300) {
            refreshToken(token!);
        }
        const data = await getEmpleados(token!, page, size);
        console.log("Contenido de la data");
        console.log(data.data.content)
        setEmpleados(data.data.content)
    }

    useEffect(() => {
        getdata(0, 10)
    }, [])

    if (timeleft < 0) {
        toast.info("El token ha expirado", { autoClose: false });
        salir();
    }

    function salir() {
        logout();
    }

    return (
        <div className="flex flex-col gap-5 items-center h-screen">
            <h3>Tiempo de expiración del token: {timeleft}</h3>
            <Table data={empleados} columns={columns} openNewForm={() => { }} openEditForm={() => { }}></Table>
        </div>
    )
}