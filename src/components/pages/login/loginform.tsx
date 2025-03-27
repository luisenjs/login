import axios from "axios"
import { useForm } from 'react-hook-form'
import { Bounce, ToastContainer, toast } from "react-toastify"
import { useNavigate } from "react-router"

type loginprops = {
    className: string
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>
}

export const LoginForm = ({ className, setIsAuth }: loginprops) => {

    //const { isAuth, setIsAuth } = useContext(authContext)

    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();

    const loginError = () => toast.error("Usuario o contraseña incorrectos", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });

    async function login(username: string, password: string) {
        try {
            const param = {
                'username': username,
                'password': password,
                'client_id': 'sasfdesarrollo',
                'client_secret': 'S@sfD3sarr0ll0',
            }
            const data = await axios.post("http://192.168.0.115:8000/security/v2/oauth/login", new URLSearchParams(param), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            localStorage.setItem("TOKEN", data.data.access_token);
            console.log("acceso");
            setIsAuth(true);
            navigate("/dashboard")
        } catch (error) {
            console.log(error)
            loginError()
        }
    }

    const enviardatos = (data) => {
        login(data.username, data.password)
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
                        <input type="submit" className="w-full bg-gray-800 rounded-lg p-2 text-white hover:bg-gray-700" />
                    </form>
                    <div className="flex flex-row items-center gap-3">
                        <hr className="grow text-gray-400" /><p>Or</p><hr className="grow text-gray-400" />
                    </div>
                    <div className="flex flex-row sm:flex-col gap-2">
                        <button className="flex flex-row gap-2 justify-center items-center w-full bg-gray-200 rounded-lg p-2 hover:bg-gray-300">
                            <img src="/src/assets/Google.svg" alt="" className="h-6" />
                            Sign up with Google
                        </button>
                        <button className="flex flex-row gap-2 justify-center items-center w-full bg-gray-200 rounded-lg p-2 hover:bg-gray-300">
                            <img src="/src/assets/Facebook.svg" alt="" className="h-6" />
                            Sign up with Facebook
                        </button>
                    </div>
                    <p>Don't you have an account? <a className="text-sky-600 hover:text-sky-800 hover:underline">Sign up</a></p>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}