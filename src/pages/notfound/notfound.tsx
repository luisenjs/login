import { Link } from 'react-router';

export const NotFound = () => {
    return (
        <div className='h-full flex flex-col justify-center items-center gap-3'>
            <h1 className='text-4xl font-bold'>¡Ups! Página no encontrada</h1>
            <p>Parece que te has perdido. ¿Quieres volver al inicio?</p>
            <Link className='bg-black min-w-[20vw] rounded-lg p-1 text-white hover:bg-gray-700' to="/auth/login">Ir al Login</Link>
        </div>
    );
};