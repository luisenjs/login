import { FieldValues, useForm } from 'react-hook-form'
import { toast } from "react-toastify"
import { AuthContext } from "../../context/authcontext"
import { useContext } from "react"
import { useNavigate } from 'react-router'
import { Button } from '../../components/button'

type loginprops = {
    className: string
}

export const LoginForm = ({ className }: loginprops) => {

    const { login } = useContext(AuthContext)

    const { register, handleSubmit, reset } = useForm();

    const navigate = useNavigate();

    const enviardatos = async (data: FieldValues) => {
        reset();
        if (!data.username || !data.password) {
            toast.error("Ingresa tus credenciales");
        } else {
            const isLogin = await toast.promise(login(data.username, data.password), {
                pending: "Verificando credenciales..."
            })
            if (isLogin) {
                toast.success("Bienvenido");
                navigate("/dashboard");
            } else {
                toast.error("Usuario o contraseña incorrectos");
            }
        }
    }

    return (
        <>
            <div className={className}>
                <div className="sm:max-w-[30vw] text-center flex flex-col gap-5">
                    <div className="flex flex-col gap-5">
                        <h2 className="font-bold text-left text-3xl">Welcome Back 👋</h2>
                        <p className="text-left">Today is a new day. It's your day. You shape it. Sign in to start managing your projects</p>
                    </div>
                    <form className="flex flex-col gap-3" onSubmit={handleSubmit(enviardatos)}>
                        <div className="flex flex-col items-start">
                            <label className="font-semibold" htmlFor="username">Username</label>
                            <input className="border-1 border-gray-400 rounded-lg p-2 w-full" type="text" {...register("username")} id="username" placeholder="Username" />
                        </div>
                        <div className="flex flex-col items-start">
                            <label className="font-semibold" htmlFor="password">Password</label>
                            <input className="border-1 border-gray-400 rounded-lg p-2 w-full" type="password" {...register("password")} id="password" placeholder="At least 8 characteres" />
                        </div>
                        <div className="w-full flex-row justify-end text-right text-sky-600 hover:text-sky-800 hover:underline">
                            <a className='hover:cursor-pointer'>Forgot Password?</a>
                        </div>
                        <Button className="hover:shadow-lg hover:shadow-slate-600/50 focus:outline-4 focus:outline-offset-4 focus:outline-slate-500" isPrincipal={true}>Sign in</Button>
                    </form>
                    <div className="flex flex-row items-center gap-3">
                        <hr className="grow text-gray-400" /><p>Or</p><hr className="grow text-gray-400" />
                    </div>
                    <div className="flex flex-row sm:flex-col gap-2">
                        <Button className='focus:outline-4 focus:outline-offset-4 focus:outline-slate-300' icon="/src/assets/Google.svg" isPrincipal={false}>Sign up with Google</Button>
                        <Button className='focus:outline-4 focus:outline-offset-4 focus:outline-slate-300' icon="/src/assets/Facebook.svg" isPrincipal={false}>Sign up with Facebook</Button>
                    </div>
                    <p>Don't you have an account? <a className="text-sky-600 hover:text-sky-800 hover:underline hover:cursor-pointer">Sign up</a></p>
                </div>
            </div>
        </>
    )
}