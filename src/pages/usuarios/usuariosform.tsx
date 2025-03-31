import { FieldValues, useForm } from 'react-hook-form'
import { toast } from "react-toastify"
//import { AuthContext } from "../../context/authcontext"
//import { useContext } from "react"
import { Button } from '../../components/button'
import { UserData } from '../testpage/testpage'


type usuariosformprops = {
    className?: string,
    user?: UserData,
    onClose: () => void
}

export const UsuariosForm = ({ className, user, onClose }: usuariosformprops) => {

    const { register, handleSubmit, reset } = useForm();

    const sendData = (data: FieldValues) => {
        if (data.numeroIdentificacion === "" || data.nombres === "" || data.apellidos === "" || data.correoElectronico === "" || data.correoNotificacion === "" || data.numeroConvencional === "" || data.numeroCelular === "") {
            toast.error("Por favor, complete todos los campos requeridos.");
            reset();
        } else {
            toast.error("No se puede crear el usuario, no hay backend");
            onClose();
        }
    }

    return (
        <>
            <div className={className}>
                <form className="flex flex-col gap-5" onSubmit={handleSubmit(sendData)}>
                    <div className='flex flex-row flex-wrap gap-4 items-center'>
                        <div className="flex flex-col items-start w-full md:w-[49%]">
                            <label className="font-semibold" htmlFor="numeroIdentificacion">Número Identificación</label>
                            <input className="border-1 border-gray-400 rounded-lg p-2 w-full" type="text" {...register("numeroIdentificacion")} defaultValue={user ? user.numeroIdentificacion : ""} id="numeroIdentificacion" />
                        </div>
                        <div className="flex flex-col items-start w-full md:w-[49%]">
                            <label className="font-semibold" htmlFor="nombres">Nombres</label>
                            <input className="border-1 border-gray-400 rounded-lg p-2 w-full" type="text" {...register("nombres")} defaultValue={user ? user.nombres : ""} id="nombres" />
                        </div>
                        <div className="flex flex-col items-start w-full md:w-[49%]">
                            <label className="font-semibold" htmlFor="apellidos">Apellidos</label>
                            <input className="border-1 border-gray-400 rounded-lg p-2 w-full" type="text" {...register("apellidos")} defaultValue={user ? user.apellidos : ""} id="apellidos" />
                        </div>
                        <div className="flex flex-col items-start w-full md:w-[49%]">
                            <label className="font-semibold" htmlFor="correoElectronico">Correo electrónico</label>
                            <input className="border-1 border-gray-400 rounded-lg p-2 w-full" type="text" {...register("correoElectronico")} defaultValue={user ? user.correoElectronico : ""} id="correoElectronico" />
                        </div>
                        <div className="flex flex-col items-start w-full md:w-[49%]">
                            <label className="font-semibold" htmlFor="correoNotificacion">Correo de notificación</label>
                            <input className="border-1 border-gray-400 rounded-lg p-2 w-full" type="text" {...register("correoNotificacion")} defaultValue={user ? user.correoNotificacion : ""} id="correoNotificacion" />
                        </div>
                        <div className="flex flex-col items-start w-full md:w-[49%]">
                            <label className="font-semibold" htmlFor="numeroConvencional">Número convencional</label>
                            <input className="border-1 border-gray-400 rounded-lg p-2 w-full" type="text" {...register("numeroConvencional")} defaultValue={user ? user.numeroConvencional : ""} id="numeroConvencional" />
                        </div>
                        <div className="flex flex-col items-start w-full md:w-[49%]">
                            <label className="font-semibold" htmlFor="numeroCelular">Número celular</label>
                            <input className="border-1 border-gray-400 rounded-lg p-2 w-full" type="text" {...register("numeroCelular")} defaultValue={user ? user.numeroCelular : ""} id="numeroCelular" />
                        </div>
                    </div>
                    <Button isPrincipal={true}>Sign in</Button>
                </form>
            </div>
        </>
    )

}