import { FieldValues, useForm } from 'react-hook-form'
import { ToastContainer } from "react-toastify"
import { AuthContext } from "../../context/authcontext"
import { useContext } from "react"
import { useNavigate } from 'react-router'
import { Button } from '../../button'

type loginprops = {
    className: string
}

export const LoginForm = ({ className }: loginprops) => {

    const { login } = useContext(AuthContext)

    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();

    /*const loginError = () => toast.error("Usuario o contraseña incorrectos", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });*/

    const enviardatos = async (data: FieldValues) => {
        console.log(data)
        const isLogin = login!(data.username, data.password);
        if (await isLogin) {
            navigate("/dashboard");
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
                            <a>Forgot Password?</a>
                        </div>
                        <Button isPrincipal={true}>Sign in</Button>
                    </form>
                    <div className="flex flex-row items-center gap-3">
                        <hr className="grow text-gray-400" /><p>Or</p><hr className="grow text-gray-400" />
                    </div>
                    <div className="flex flex-row sm:flex-col gap-2">
                        <Button icon="/src/assets/Google.svg" isPrincipal={false}>Sign up with Google</Button>
                        <Button icon="/src/assets/Facebook.svg" isPrincipal={false}>Sign up with Facebook</Button>
                    </div>
                    <p>Don't you have an account? <a className="text-sky-600 hover:text-sky-800 hover:underline">Sign up</a></p>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}