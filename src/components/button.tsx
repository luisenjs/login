type buttonprops = {
    icon?: string;
    isPrincipal: boolean;
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const Button = ({ icon, isPrincipal, children, className, onClick }: buttonprops) => {
    return (
        <button onClick={onClick} className={`hover:cursor-pointer flex flex-row gap-2 justify-center items-center w-full ${isPrincipal ? "bg-gray-800 rounded-lg p-2 text-white hover:bg-gray-700" : "bg-gray-200 rounded-lg p-2 hover:bg-gray-300"} ${className}`}>
            {icon && <img className="h-6" src={icon} alt="icono"></img>}{children}
        </button>
    )
}