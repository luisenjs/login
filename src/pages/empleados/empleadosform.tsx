import { FieldValues, useForm } from 'react-hook-form'
import { toast } from "react-toastify"
import { Cargo, Empleado, Sector, Sucursal, Usuario } from '../../interfaces/empleadosInterface'
import { getCargos, getSectores, getSucursales, getUsuarios, postEmpleado, putEmpleado } from '../../services/requests'
import { useEffect, useState } from 'react'
//import { z } from 'zod'
//import { zodResolver } from '@hookform/resolvers/zod'

type usuariosformprops = {
    className?: string,
    token: string,
    empleado?: Empleado,
    onClose: () => void,
    update: () => void
}

export const EmpleadosForm = ({ className, token, empleado, onClose, update }: usuariosformprops) => {

    /*const empleadoSchema = z.object({
        "numeroIdentificacion": z.string().regex(new RegExp(/^\+?[0-9]{10}$/), { message: "Ingresa una cédula válida" }),
        "usuario.codigoExterno": z.string(),
        //"sucursal.id.codigo": z.string(),
        //"sector.id.codigo": z.string(),
        "nombres": z.string().min(1, { message: "Ingrese sus nombres" }).max(30, { message: "Debe ser menor a 30 caracteres" }),
        "apellidos": z.string().min(1, { message: "Ingrese sus apellidos" }).max(30, { message: "Debe ser menor a 30 caracteres" }),
        //"cargo.id.codigo": z.string(),
        "mailPrincipal": z.string().regex(new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/), { message: "ingrese un correo válido" }),
        "telefonoCelular": z.string().regex(new RegExp(/^\+?[0-9]{10}$/), { message: "Ingrese un teléfono válido" })
    })*/

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        //resolver: zodResolver(empleadoSchema)
    });

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
        setSectores(sectoresRes.data.data);
        const sucursalesRes = await getSucursales(token);
        setSucursales(sucursalesRes.data.content);
    }

    useEffect(() => {
        getInfo();
    }, [])

    const sendData = async (data: FieldValues) => {
        console.log(data);
        if (data.numeroIdentificacion === "" || data.usuario.codigoExterno === "" || data.sucursal.id.codigo === "" || data.sector.id.codigo === "" || data.nombres === "" || data.apellidos === "" || data.cargo.id.codigo === "" || data.mailPrincipal === "" || data.telefonoCelular === "") {
            toast.error("Por favor, complete todos los campos requeridos.");
            reset();
        } else {
            const body = {
                "id": {
                    "codigo": empleado?.id.codigo ?? 0,
                    "ageLicencCodigo": 1
                },
                "numeroIdentificacion": data.numeroIdentificacion,
                "nombres": data.nombres,
                "apellidos": data.apellidos,
                "telefonoCelular": data.telefonoCelular,
                "mailPrincipal": data.mailPrincipal,
                "estado": empleado?.estado ?? "A",
                "estadoAsignacion": empleado?.estadoAsignacion ?? "L",
                "cargo": {
                    "id": {
                        "codigo": Number(data.cargo.id.codigo),
                        "ageLicencCodigo": 1
                    }
                },
                "sucursal": {
                    "id": {
                        "codigo": Number(data.sucursal.id.codigo),
                        "ageLicencCodigo": 1
                    }
                },
                "usuarioIngreso": empleado?.usuarioIngreso ?? 249,
                "usuarioModificacion": 249,
                "usuario": {
                    "codigo": 1,
                    "ageLicencCodigo": 1,
                    "codigoExterno": data.usuario.codigoExterno
                },
                "sector": {
                    "id": {
                        "codigo": Number(data.sector.id.codigo),
                        "ageSucursAgeLicencCodigo": 1,
                        "ageSucursCodigo": 1
                    }
                }
            }
            console.log(body);
            if (!empleado) {
                const response = await getUsuarios(token);
                const usuarios = response.data.content;
                const usuarioIgual = usuarios.find((user: Usuario) => user.numeroIdentificacion === data.numeroIdentificacion);
                if (!usuarioIgual) {
                    toast.error("La cédula ingresada no existe en usuarios")
                }
                await toast.promise(postEmpleado(token, body), {
                    pending: "Crenado empleado...",
                    error: "No se pudo crear el empleado",
                    success: "Empleado creado con éxito"
                })
            } else {
                await toast.promise(putEmpleado(token, body), {
                    pending: "Guardando cambios...",
                    error: "No se pudo actualizar los datos",
                    success: "Campos actualizados"
                })
            }
            update();
            onClose();
        }
    }

    return (
        <>
            <div className={className}>
                <form className="flex flex-col gap-5 max-h-[60vh] text-slate-700" onSubmit={handleSubmit(sendData)}>
                    <div className='flex flex-row flex-wrap md:gap-4 gap-2 items-center'>
                        <div className="flex flex-col items-start w-full sm:w-[48%]">
                            <label className="font-semibold" htmlFor=", index: number">Cédula</label>
                            <input className="border-1 border-gray-400 rounded p-2 w-full" type="text" {...register("numeroIdentificacion")} placeholder='0909090909' defaultValue={empleado ? empleado.numeroIdentificacion : ""} id="numeroIdentificacion" />
                            {errors.numeroIdentificacion && <p className='text-red-400'>{errors.numeroIdentificacion.message?.toString()}</p>}
                        </div>
                        <div className="flex flex-col items-start w-full sm:w-[48%]">
                            <label className="font-semibold" htmlFor="usuario">Usuario</label>
                            <select className="border-1 border-gray-400 rounded p-2 w-full" {...register("usuario.codigo")} id="usuario">
                                <option value="">Seleccione un usuario</option>
                                {
                                    usuarios && usuarios.map((usuario: Usuario, index: number) => (
                                        <option key={index} value={usuario.codigoExterno}>{usuario.codigoExterno}</option>
                                    ))
                                }
                            </select>
                            {/*errors.usuario.codigo && <p className='text-red-400'>{errors.usuario.codigo.message?.toString()}</p>*/}
                        </div >
                        <div className="flex flex-col items-start w-full sm:w-[48%]">
                            <label className="font-semibold" htmlFor="sucursal">Sucursal</label>
                            <select className="border-1 border-gray-400 rounded p-2 w-full" {...register("sucursal.id.codigo")} id="sucursal">
                                <option value="">Seleccione una sucursal</option>
                                {
                                    sucursales && sucursales.map((sucursal: Sucursal, index: number) => (
                                        <option key={index} value={sucursal.id.codigo}>{sucursal.descripcion}</option>
                                    ))
                                }
                            </select>
                            {/*errors.sucursal.id.codigo && <p className='text-red-400'>{errors.sucursal.id.codigo.message?.toString()}</p>*/}
                        </div>
                        <div className="flex flex-col items-start w-full sm:w-[48%]">
                            <label className="font-semibold" htmlFor="sector">Sector</label>
                            <select className="border-1 border-gray-400 rounded p-2 w-full" {...register("sector.id.codigo")} id="sector" >
                                <option value="">Seleccione un sector</option>
                                {
                                    sectores && sectores.map((sector: Sector, index: number) => (
                                        <option key={index} value={sector.id.codigo}>{sector.descripcion}</option>
                                    ))
                                }
                            </select>
                            {/*errors.sector.id.codigo && <p className='text-red-400'>{errors.sector.id.codigo.message?.toString()}</p>*/}
                        </div>
                        <div className="flex flex-col items-start w-full sm:w-[48%]">
                            <label className="font-semibold" htmlFor="nombres">Nombres</label>
                            <input className="border-1 border-gray-400 rounded p-2 w-full" type="text" {...register("nombres")} placeholder='Nombres...' defaultValue={empleado ? empleado.nombres : ""} id="nombres" />
                            {errors.nombres && <p className='text-red-400'>{errors.nombres.message?.toString()}</p>}
                        </div>
                        <div className="flex flex-col items-start w-full sm:w-[48%]">
                            <label className="font-semibold" htmlFor="apellidos">Apellidos</label>
                            <input className="border-1 border-gray-400 rounded p-2 w-full" type="text" {...register("apellidos")} placeholder='Apellidos...' defaultValue={empleado ? empleado.apellidos : ""} id="apellidos" />
                            {errors.apellidos && <p className='text-red-400'>{errors.apellidos.message?.toString()}</p>}
                        </div>
                        <div className="flex flex-col items-start w-full sm:w-[48%]">
                            <label className="font-semibold" htmlFor="cargo">Cargo</label>
                            <select className="border-1 border-gray-400 rounded p-2 w-full" {...register("cargo.id.codigo")} id="cargo" >
                                <option value="">Seleccione un cargo</option>
                                {
                                    cargos && cargos.map((cargo: Cargo, index: number) => (
                                        <option key={index} value={cargo.id.codigo}>{cargo.descripcion}</option>
                                    ))
                                }
                            </select>
                            {/*errors.cargo.id.codigo && <p className='text-red-400'>{errors.cargo.id.codigo.message?.toString()}</p>*/}
                        </div>
                        <div className="flex flex-col items-start w-full md:w-[48%]">
                            <label className="font-semibold" htmlFor="mailPrincipal">Correo</label>
                            <input className="border-1 border-gray-400 rounded p-2 w-full" type="text" {...register("mailPrincipal")} placeholder='dominio@example.com' defaultValue={empleado ? empleado.mailPrincipal : ""} id="mailPrincipal" />
                            {errors.mailPrincipal && <p className='text-red-400'>{errors.mailPrincipal.message?.toString()}</p>}
                        </div>
                        <div className="flex flex-col items-start w-full md:w-[48%]">
                            <label className="font-semibold" htmlFor="telefonoCelular">Teléfono</label>
                            <input className="border-1 border-gray-400 rounded p-2 w-full" type="text" {...register("telefonoCelular")} placeholder='099999999' defaultValue={empleado ? empleado.telefonoCelular : ""} id="telefonoCelular" />
                            {errors.telefonoCelular && <p className='text-red-400'>{errors.telefonoCelular.message?.toString()}</p>}
                        </div>
                    </div >
                    <div className='flex flex-row gap-3 justify-center'>
                        <button className='active:bg-slate-300 hover:cursor-pointer bg-slate-100 text-slate-700 font-medium max-h-11 px-6 py-2 rounded-sm border-1 border-slate-300 hover:border-slate-500 w-full' onClick={onClose}>Cancelar</button>
                        <button className='active:bg-slate-400 hover:cursor-pointer bg-slate-300 text-slate-700 font-medium max-h-11 px-6 py-2 rounded-sm border-1 border-slate-300 hover:border-slate-500 w-full' type='submit'>Guardar</button>
                    </div>
                </form >
            </div >
        </>
    )

}