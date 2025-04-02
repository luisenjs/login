import { FieldValues, useForm } from 'react-hook-form'
import { toast } from "react-toastify"
import { Cargo, Content, Sector, Sucursal, Usuario } from '../../interfaces/empleadosInterface'
import { getCargos, getSectores, getSucursales, getUsuarios, putEmpleado } from '../../services/requests'
import { useEffect, useState } from 'react'

type usuariosformprops = {
    className?: string,
    token: string,
    empleado?: Content,
    onClose: () => void
}

export const EmpleadosForm = ({ className, token, empleado, onClose }: usuariosformprops) => {

    const { register, handleSubmit, reset } = useForm();

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    const [sectores, setSectores] = useState<Sector[]>([]);

    const [sucursales, setSucursales] = useState<Sucursal[]>([]);

    const [cargos, setCarago] = useState<Cargo[]>([]);

    const getInfo = async () => {
        const usuariosRes = await getUsuarios(token);
        setUsuarios(usuariosRes.data.content);
        const cargosRes = await getCargos(token);
        setCarago(cargosRes.data.content);
        const sectoresRes = await getSectores(token);
        setSectores(sectoresRes.data);
        const sucursalesRes = await getSucursales(token);
        setSucursales(sucursalesRes.data.content);
    }

    useEffect(() => {
        getInfo();
    }, [])

    const sendData = async (data: FieldValues) => {
        if (data.numeroIdentificacion === "" || data.nombres === "" || data.apellidos === "" || data.mailPrincipal === "" || data.telefonoCelular === "" || data.cargo.descripcion === "") {
            toast.error("Por favor, complete todos los campos requeridos.");
            reset();
        } else {
            if (empleado) {
                const body = {
                    "id": {
                        "codigo": empleado.id.codigo,
                        "ageLicencCodigo": empleado.id.ageLicencCodigo
                    },
                    "numeroIdentificacion": data.numeroIdentificacion,
                    "nombres": data.nombres,
                    "apellidos": data.apellidos,
                    "telefonoCelular": data.telefonoCelular,
                    "mailPrincipal": data.mailPrincipal,
                    "estado": empleado.estado,
                    "estadoAsignacion": empleado.estadoAsignacion,
                    "cargo": {
                        "id": {
                            "codigo": empleado.cargo.id.codigo,
                            "ageLicencCodigo": empleado.cargo.id.ageLicencCodigo
                        },
                        "descripcion": data.cargo.descripcion
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
                console.log(body);
                await toast.promise(putEmpleado(token, body), {
                    pending: "Enviando...",
                    error: "No se pudo actualizar los datos",
                    success: "Campos actualizados"
                })
                onClose();
                toast.info("Sending...")
            } else {
                console.log(data);
                const response = await getUsuarios(token);
                const usuarios = response.data.content;
                const usuarioIgual = usuarios.find((user: Usuario) => user.numeroIdentificacion === data.numeroIdentificacion);
                if (!usuarioIgual) {
                    toast.error("La cédula ingresada no existe en usuarios");
                    reset();
                } else {
                    toast.info("Sending...")
                    onClose();
                }
            }
        }

    }

    return (
        <>
            <div className={className}>
                <form className="flex flex-col gap-5 max-h-[60vh] text-slate-700" onSubmit={handleSubmit(sendData)}>
                    <div className='flex flex-row flex-wrap gap-4 items-center'>
                        <div className="flex flex-col items-start w-full md:w-[48%] pr-2">
                            <label className="font-semibold" htmlFor=", index: number">Cédula</label>
                            <input className="border-1 border-gray-400 rounded p-2 w-full" type="text" {...register("numeroIdentificacion")} placeholder='0909090909' defaultValue={empleado ? empleado.numeroIdentificacion : ""} id="numeroIdentificacion" />
                        </div>
                        <div className="flex flex-col items-start w-full md:w-[48%] pr-2">
                            <label className="font-semibold" htmlFor="usuario">Usuario</label>
                            <select className="border-1 border-gray-400 rounded p-2 w-full" {...register("usuario.codigoExterno")} id="usuario">
                                <option value="">Seleccione un usuario</option>
                                {
                                    usuarios && usuarios.map((usuario: Usuario, index: number) => (
                                        <option key={index} value={usuario.codigoExterno}>{usuario.codigoExterno}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="flex flex-col items-start w-full md:w-[48%] pr-2">
                            <label className="font-semibold" htmlFor="sucursal">Sucursal</label>
                            <select className="border-1 border-gray-400 rounded p-2 w-full" {...register("sucursal.id.codigo")} id="sucursal">
                                <option value="">Seleccione una sucursal</option>
                                {
                                    sucursales && sucursales.map((sucursal: Sucursal, index: number) => (
                                        <option key={index} value={sucursal.id.codigo}>{sucursal.descripcion}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="flex flex-col items-start w-full md:w-[48%] pr-2">
                            <label className="font-semibold" htmlFor="sector">Sector</label>
                            <select className="border-1 border-gray-400 rounded p-2 w-full" {...register("sector.id.codigo")} id="sector" >
                                <option value="">Seleccione un sector</option>
                                {
                                    sectores && sectores.map((sector: Sector, index: number) => (
                                        <option key={index} value={sector.id.codigo}>{sector.descripcion}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="flex flex-col items-start w-full md:w-[48%] pr-2">
                            <label className="font-semibold" htmlFor="nombres">Nombres</label>
                            <input className="border-1 border-gray-400 rounded p-2 w-full" type="text" {...register("nombres")} placeholder='Nombres...' defaultValue={empleado ? empleado.nombres : ""} id="nombres" />
                        </div>
                        <div className="flex flex-col items-start w-full md:w-[48%] pr-2">
                            <label className="font-semibold" htmlFor="apellidos">Apellidos</label>
                            <input className="border-1 border-gray-400 rounded p-2 w-full" type="text" {...register("apellidos")} placeholder='Apellidos...' defaultValue={empleado ? empleado.apellidos : ""} id="apellidos" />
                        </div>
                        <div className="flex flex-col items-start w-full md:w-[48%] pr-2">
                            <label className="font-semibold" htmlFor="cargo">Cargo</label>
                            <select className="border-1 border-gray-400 rounded p-2 w-full" {...register("cargo.id.codigo")} id="cargo" >
                                <option value="">Seleccione un cargo</option>
                                {
                                    cargos && cargos.map((cargo: Cargo, index: number) => (
                                        <option key={index} value={cargo.id.codigo}>{cargo.descripcion}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="flex flex-col items-start w-full md:w-[48%] pr-2">
                            <label className="font-semibold" htmlFor="mailPrincipal">Correo</label>
                            <input className="border-1 border-gray-400 rounded p-2 w-full" type="text" {...register("mailPrincipal")} placeholder='dominio@example.com' defaultValue={empleado ? empleado.mailPrincipal : ""} id="mailPrincipal" />
                        </div>
                        <div className="flex flex-col items-start w-full md:w-[48%] pr-2">
                            <label className="font-semibold" htmlFor="telefonoCelular">Teléfono</label>
                            <input className="border-1 border-gray-400 rounded p-2 w-full" type="text" {...register("telefonoCelular")} placeholder='099999999' defaultValue={empleado ? empleado.telefonoCelular : ""} id="telefonoCelular" />
                        </div>
                    </div>
                    <div className='flex flex-row gap-3 justify-center pr-2'>
                        <button className='bg-slate-300 text-slate-700 font-medium max-h-11 px-6 py-2 rounded-sm border-1 border-slate-300 hover:border-slate-500 w-full' type='submit'>Guardar</button>
                        <button className='bg-slate-300 text-slate-700 font-medium max-h-11 px-6 py-2 rounded-sm border-1 border-slate-300 hover:border-slate-500 w-full' onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </>
    )

}