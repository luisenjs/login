import { jwtDecode } from "jwt-decode";
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { AuthContext } from "../../context/authcontext";
import { getEmpleados, refreshToken } from "../../services/requests";
import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Table from "../../components/table";
import Modal from "../../components/modal";
import { EmpleadosForm } from "./empleadosform";

export type empleadosShowData = {
    id: {
        codigo: string;
    }
    numeroIdentificacion: string;
    nombres: string;
    apellidos: string;
    mailPrincipal: string;
    telefonoCelular: string;
    cargo: {
        descripcion: string
    }
};

const columnHelper = createColumnHelper<empleadosShowData>();

const columns = [
    columnHelper.accessor('id.codigo', {
        header: () => (
            <span className="flex gap-2 items-center">
                Código  <ArrowUpDown className='size-4' />
            </span>),
        cell: info => <p>{info.getValue()}</p>,
    }),
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
                Apellidos <ArrowUpDown className='size-4' />
            </span>),
        cell: info => (
            <a href={`mailto:${info.getValue()}`} className="italic text-blue-500 hover:underline">{info.getValue()}</a>
        ),
    }),
    columnHelper.accessor('mailPrincipal', {
        header: () => (
            <span className="flex gap-2 items-center">
                Correo <ArrowUpDown className='size-4' />
            </span>),
        cell: info => (
            <a href={`mailto:${info.getValue()}`} className="italic text-blue-500 hover:underline">{info.getValue()}</a>
        ),
    }),
    columnHelper.accessor('telefonoCelular', {
        header: () => (
            <span className="flex gap-2 items-center">
                Telefono <ArrowUpDown className='size-4' />
            </span>),
        cell: info => (
            <a href={`tel:${info.getValue()}`} className="text-blue-500 hover:underline">{info.getValue()}</a>
        ),
    }),
    columnHelper.accessor('cargo.descripcion', {
        header: () => (
            <span className="flex gap-2 items-center">
                Cargo  <ArrowUpDown className='size-4' />
            </span>),
        cell: info => <p>{info.getValue()}</p>,
    }),
]

export const Empleados = () => {

    const [empleados, setEmpleados] = useState<empleadosShowData[]>();

    const { logout } = useContext(AuthContext);

    const token = localStorage.getItem("token");

    const timeExp: { exp: number } = token ? jwtDecode(token) : { exp: 0 };

    const currentTime = Math.floor(Date.now() / 1000);

    const timeleft = timeExp.exp - currentTime;

    const [page, setPage] = useState<number>(0);

    const [size, setSize] = useState<number>(5);

    const [isNewUserFormOpen, setIsNewUserFormOpen] = useState(false)

    const [isUpdateUserFormOpen, setIsUpdateUserFormOpen] = useState(false)

    const [empleadoData, seEmpleadoData] = useState<empleadosShowData | undefined>(undefined);

    async function getdata(page: number, size: number) {
        console.log("haciendo petición...")
        if (!token) {
            toast.error("No autorizado");
        }
        if (timeleft < 300) {
            refreshToken(token!);
        }
        const data = await getEmpleados(token!, page, size);
        console.log(data.data.content)
        setEmpleados(data.data.content)
    }

    useEffect(() => {
        getdata(page, size)
    }, [size])

    if (timeleft < 0) {
        toast.info("El token ha expirado", { autoClose: false });
        salir();
    }

    function salir() {
        logout();
    }

    function onCreate() {
        setIsNewUserFormOpen(true);
    }

    function onEdit(empleado: empleadosShowData) {
        setIsUpdateUserFormOpen(true);
        seEmpleadoData(empleado);
    }

    return (
        <div className="flex flex-col gap-5 items-center h-screen max-w-screen">
            <Table tipo="empleado" data={empleados} columns={columns} setPage={setPage} setSize={setSize} openNewForm={onCreate} openEditForm={onEdit}></Table>
            <Modal className="rounded-sm" isOpen={isNewUserFormOpen} onClose={() => setIsNewUserFormOpen(false)} title="Crear nuevo usuario" description="Complete los campos para crear un nuevo usuario">
                <EmpleadosForm token={token!} className="w-full" onClose={() => setIsNewUserFormOpen(false)} />
            </Modal>
            <Modal className="rounded-sm" isOpen={isUpdateUserFormOpen} onClose={() => setIsUpdateUserFormOpen(false)} title="Editar usuario" description="Complete los campos para actualizar el usuario">
                <EmpleadosForm token={token!} className="w-full" onClose={() => setIsUpdateUserFormOpen(false)} empleado={empleadoData} />
            </Modal>
        </div>
    )
}