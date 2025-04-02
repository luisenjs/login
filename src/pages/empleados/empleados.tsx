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
        setTotalPages(data.data.totalPages);
    }

    useEffect(() => {
        getdata(page, size)
    }, [page, size])

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

    function onEdit(empleado: Content) {
        setIsUpdateUserFormOpen(true);
        seEmpleadoData(empleado);
    }

    function onDelete(empleado: Content) {
        setIsDeleteOpen(true);
        console.log(empleado);
        seEmpleadoData(empleado);
    }

    function deleting(empleado: Content) {
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
                },
                "descripcion": empleado.cargo.descripcion
            },
            "sucursal": {
                "id": {
                    "codigo": empleado.sucursal.id.codigo,
                    "ageLicencCodigo": empleado.sucursal.id.ageLicencCodigo
                }
            },
            "usuarioIngreso": empleado.usuarioIngreso,
            "usuarioModificacion": empleado.usuarioModificacion,
            "usuario": {
                "codigo": empleado.usuario.codigo,
                "ageLicencCodigo": empleado.usuario.ageLicencCodigo
            },
            "sector": {
                "id": {
                    "codigo": empleado.sector.id.codigo,
                    "ageSucursAgeLicencCodigo": empleado.sector.id.ageSucursAgeLicencCodigo,
                    "ageSucursCodigo": empleado.sector.id.ageSucursCodigo
                }
            }
        }
        putEmpleado(token!, body);
        setIsDeleteOpen(false);
    }

    return (
        <div className="flex flex-col gap-5 items-center h-screen max-w-screen">
            <Table tipo="empleado" data={empleados} columns={columns} page={page} setPage={setPage} totalPages={totalPages} setSize={setSize} openNewForm={onCreate} openEditForm={onEdit} openDelete={onDelete}></Table>
            <Modal className="rounded-sm" isOpen={isNewUserFormOpen} onClose={() => setIsNewUserFormOpen(false)} title="Crear nuevo usuario" description="Complete los campos para crear un nuevo usuario">
                <EmpleadosForm token={token!} className="w-full" onClose={() => setIsNewUserFormOpen(false)} />
            </Modal>
            <Modal className="rounded-sm" isOpen={isUpdateUserFormOpen} onClose={() => setIsUpdateUserFormOpen(false)} title="Editar usuario" description="Complete los campos para actualizar el usuario">
                <EmpleadosForm token={token!} className="w-full" onClose={() => setIsUpdateUserFormOpen(false)} empleado={empleadoData} />
            </Modal>
            <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Eliminar registro" description="¿Estás seguro que querés eliminar este registro?">
                <div className='flex flex-row gap-3 justify-center pr-2'>
                    <button className='bg-slate-300 text-slate-700 font-medium max-h-11 px-6 py-2 rounded-sm border-1 border-slate-300 hover:border-slate-500 w-full' onClick={() => { console.log("Eliminando..."); deleting(empleadoData!) }}>Eliminar</button>
                    <button className='bg-slate-300 text-slate-700 font-medium max-h-11 px-6 py-2 rounded-sm border-1 border-slate-300 hover:border-slate-500 w-full' onClick={() => setIsDeleteOpen(false)}>Cancelar</button>
                </div>
            </Modal>
        </div>
    )
}