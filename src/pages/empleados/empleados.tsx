import { jwtDecode } from "jwt-decode";
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { AuthContext } from "../../context/authcontext";
import { getEmpleados, putEmpleado, refreshToken } from "../../services/requests";
import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Table from "../../components/table";
import Modal from "../../components/modal";
import { EmpleadosForm } from "./empleadosform";
import { Content } from "../../interfaces/empleadosInterface";

const columnHelper = createColumnHelper<Content>();

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
    columnHelper.accessor('usuario.codigoExterno', {
        header: () => (
            <span className="flex gap-2 items-center">
                Usuario  <ArrowUpDown className='size-4' />
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
        cell: info => <p>{info.getValue()}</p>,
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
    columnHelper.accessor('sucursal.direccion', {
        header: () => (
            <span className="flex gap-2 items-center">
                Sucusal  <ArrowUpDown className='size-4' />
            </span>),
        cell: info => <p>{info.getValue()}</p>,
    }),
    columnHelper.accessor('sector.descripcion', {
        header: () => (
            <span className="flex gap-2 items-center">
                Sector  <ArrowUpDown className='size-4' />
            </span>),
        cell: info => <p>{info.getValue()}</p>,
    })
]

export const Empleados = () => {

    const [empleados, setEmpleados] = useState<Content[]>();

    const { logout } = useContext(AuthContext);

    const token = localStorage.getItem("token");

    const timeExp: { exp: number } = token ? jwtDecode(token) : { exp: 0 };

    const currentTime = Math.floor(Date.now() / 1000);

    const timeleft = timeExp.exp - currentTime;

    const [totalPages, setTotalPages] = useState<number>(1);

    const [page, setPage] = useState<number>(0);

    const [size, setSize] = useState<number>(5);

    const [isNewUserFormOpen, setIsNewUserFormOpen] = useState(false)

    const [isUpdateUserFormOpen, setIsUpdateUserFormOpen] = useState(false)

    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    const [empleadoData, seEmpleadoData] = useState<Content | undefined>(undefined);

    async function getdata(page: number, size: number, filtro?: string) {
        if (!token) {
            toast.error("No autorizado");
        }
        if (timeleft < 300) {
            refreshToken(token!);
        }
        const data = await getEmpleados(token!, page, size, filtro);
        setEmpleados(data.data.content)
        setTotalPages(data.data.totalPages);
    }

    useEffect(() => {
        getdata(page, size)
    }, [page, size])

    useEffect(() => {
        const interval = setInterval(() => {
            if (timeleft < 0) {
                toast.info("El token ha expirado", { autoClose: false });
                salir();
                clearInterval(interval);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [timeExp.exp]);

    function filterTable(filtro: string) {
        getdata(page, size, filtro);
    }

    function updateTable() {
        getdata(page, size)
    }

    function salir() {
        logout();
    }

    function onCreate() {
        setIsNewUserFormOpen(true);
    }

    function onEdit(empleado: Content) {
        setIsUpdateUserFormOpen(true);
        seEmpleadoData(empleado);
    }

    function onDelete(empleado: Content) {
        setIsDeleteOpen(true);
        seEmpleadoData(empleado);
    }

    async function deleting(empleado: Content) {
        const body = {
            "id": {
                "codigo": empleado.id.codigo,
                "ageLicencCodigo": empleado.id.ageLicencCodigo
            },
            "numeroIdentificacion": empleado.numeroIdentificacion,
            "nombres": empleado.nombres,
            "apellidos": empleado.apellidos,
            "telefonoCelular": empleado.telefonoCelular,
            "mailPrincipal": empleado.mailPrincipal,
            "estado": "N",
            "estadoAsignacion": empleado.estadoAsignacion,
            "cargo": {
                "id": {
                    "codigo": empleado.cargo.id.codigo,
                    "ageLicencCodigo": empleado.cargo.id.ageLicencCodigo
                }
            },
            "sucursal": {
                "id": {
                    "codigo": empleado.sucursal.id.codigo,
                    "ageLicencCodigo": empleado.sucursal.id.ageLicencCodigo
                }
            },
            "usuarioIngreso": 249,
            "usuarioModificacion": 249,
            "usuario": {
                "codigo": 1,
                "ageLicencCodigo": 1,
                "codigoExterno": empleado.usuario.codigoExterno
            },
            "sector": {
                "id": {
                    "codigo": empleado.sector.id.codigo,
                    "ageSucursAgeLicencCodigo": empleado.sector.id.ageSucursAgeLicencCodigo,
                    "ageSucursCodigo": empleado.sector.id.ageSucursCodigo
                }
            }
        }
        await toast.promise(putEmpleado(token!, body), {
            pending: "Eliminando...",
            error: "No se pudo eliminar el registro",
            success: "Registro eliminado"
        })
        updateTable();
        setIsDeleteOpen(false);
    }

    return (
        <div className="flex flex-col gap-5 items-center h-full max-w-screen">
            <Table filterTable={filterTable} token={token!} tipo="empleado" data={empleados} columns={columns} page={page} setPage={setPage} totalPages={totalPages} setSize={setSize} openNewForm={onCreate} openEditForm={onEdit} openDelete={onDelete}></Table>
            <Modal className="w-[40vw] rounded-sm" isOpen={isNewUserFormOpen} onClose={() => setIsNewUserFormOpen(false)} title="Crear nuevo usuario" description="Complete los campos para crear un nuevo usuario">
                <EmpleadosForm update={updateTable} token={token!} className="w-full" onClose={() => setIsNewUserFormOpen(false)} />
            </Modal>
            <Modal className="w-[40vw] rounded-sm" isOpen={isUpdateUserFormOpen} onClose={() => setIsUpdateUserFormOpen(false)} title="Editar usuario" description="Complete los campos para actualizar el usuario">
                <EmpleadosForm update={updateTable} token={token!} className="w-full" onClose={() => setIsUpdateUserFormOpen(false)} empleado={empleadoData} />
            </Modal>
            <Modal className="w-[30vw]" isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Eliminar registro" description="¿Estás seguro que querés eliminar este registro?">
                <div className='flex flex-row gap-3 justify-center pr-2'>
                    <button className='active:bg-slate-300 hover:cursor-pointer bg-slate-100 text-slate-700 font-medium max-h-11 px-6 py-2 rounded-sm border-1 border-slate-300 hover:border-slate-500 w-full' onClick={() => setIsDeleteOpen(false)}>Cancelar</button>
                    <button className='active:bg-slate-400 hover:cursor-pointer bg-slate-300 text-slate-700 font-medium max-h-11 px-6 py-2 rounded-sm border-1 border-slate-300 hover:border-slate-500 w-full' onClick={() => deleting(empleadoData!)}>Eliminar</button>
                </div>
            </Modal>
        </div>
    )
}