import { ArrowUpDown } from "lucide-react";
import Table from "../../components/table"
import { createColumnHelper } from "@tanstack/react-table";
import Modal from "../../components/modal";
import { EmpleadosForm } from "../empleados/empleadosform";
import { useState } from "react";

export type UserData = {
    numeroIdentificacion: string;
    nombres: string;
    apellidos: string;
    correoElectronico: string;
    correoNotificacion: string;
    numeroConvencional: string;
    numeroCelular: string;
};


const columnHelper = createColumnHelper<UserData>();

const columns = [
    columnHelper.accessor('numeroIdentificacion', {
        header: () => (
            <span className="flex gap-2 items-center">
                Cédula  <ArrowUpDown className='size-4' />
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
                Apellidos  <ArrowUpDown className='size-4' />
            </span>),
        cell: info => <p>{info.getValue()}</p>,
    }),
    columnHelper.accessor('correoElectronico', {
        header: () => (
            <span className="flex gap-2 items-center">
                Correo electrónico  <ArrowUpDown className='size-4' />
            </span>),
        cell: info => (
            <a href={`mailto:${info.getValue()}`} className="italic text-blue-500 hover:underline">{info.getValue()}</a>
        ),
    }),
    columnHelper.accessor('correoNotificacion', {
        header: () => (
            <span className="flex gap-2 items-center">
                Correo de notificación  <ArrowUpDown className='size-4' />
            </span>),
        cell: info => (
            <a href={`mailto:${info.getValue()}`} className="italic text-blue-500 hover:underline">{info.getValue()}</a>
        ),
    }),
    columnHelper.accessor('numeroConvencional', {
        header: () => (
            <span className="flex gap-2 items-center">
                Número convencional  <ArrowUpDown className='size-4' />
            </span>),
        cell: info => (
            <a href={`tel:${info.getValue()}`} className="text-blue-500 hover:underline">{info.getValue()}</a>
        ),
    }),
    columnHelper.accessor('numeroCelular', {
        header: () => (
            <span className="flex gap-2 items-center">
                Número celular  <ArrowUpDown className='size-4' />
            </span>),
        cell: info => (
            <a href={`tel:${info.getValue()}`} className="text-blue-500 hover:underline">{info.getValue()}</a>
        ),
    }),
]

const data: UserData[] = [
    {
        numeroIdentificacion: '0953492147',
        nombres: 'Luis Enrique',
        apellidos: 'Jara Sánchez',
        correoElectronico: 'luisenriquejaras@outlook.com',
        correoNotificacion: 'luisjarasanchez13@gmail.com',
        numeroConvencional: '0987654321',
        numeroCelular: '0987654321'
    },
    {
        numeroIdentificacion: '0953492148',
        nombres: 'María Fernanda',
        apellidos: 'Lopez García',
        correoElectronico: 'mariafernanda.lopez@gmail.com',
        correoNotificacion: 'm.fernanda.lopez@outlook.com',
        numeroConvencional: '022345678',
        numeroCelular: '0991122334'
    },
    {
        numeroIdentificacion: '0953492149',
        nombres: 'Carlos Andrés',
        apellidos: 'Mendoza Torres',
        correoElectronico: 'carlos.mendoza@yahoo.com',
        correoNotificacion: 'cmendoza@outlook.com',
        numeroConvencional: '024567890',
        numeroCelular: '0989988776'
    },
    {
        numeroIdentificacion: '0953492150',
        nombres: 'Ana Gabriela',
        apellidos: 'Ramírez Pérez',
        correoElectronico: 'ana.ramirez@hotmail.com',
        correoNotificacion: 'aramirez@gmail.com',
        numeroConvencional: '023334455',
        numeroCelular: '0977564321'
    },
    {
        numeroIdentificacion: '0953492151',
        nombres: 'José Miguel',
        apellidos: 'Vásquez León',
        correoElectronico: 'jose.vasquez@outlook.com',
        correoNotificacion: 'jm.vasquez@hotmail.com',
        numeroConvencional: '021122334',
        numeroCelular: '0965432187'
    },
    {
        numeroIdentificacion: '0953492152',
        nombres: 'Andrea Carolina',
        apellidos: 'Gómez Rojas',
        correoElectronico: 'andrea.gomez@gmail.com',
        correoNotificacion: 'a.gomez@live.com',
        numeroConvencional: '026789012',
        numeroCelular: '0998877665'
    },
    {
        numeroIdentificacion: '0953492153',
        nombres: 'Ricardo Esteban',
        apellidos: 'Ortega Salazar',
        correoElectronico: 'ricardo.ortega@outlook.com',
        correoNotificacion: 'r.ortega@gmail.com',
        numeroConvencional: '025678901',
        numeroCelular: '0954321890'
    },
    {
        numeroIdentificacion: '0953492154',
        nombres: 'Valeria Alejandra',
        apellidos: 'Fernández Castillo',
        correoElectronico: 'valeria.fernandez@yahoo.com',
        correoNotificacion: 'v.fernandez@outlook.com',
        numeroConvencional: '029876543',
        numeroCelular: '0943218765'
    },
    {
        numeroIdentificacion: '0953492155',
        nombres: 'Daniel Arturo',
        apellidos: 'Hernández Ruiz',
        correoElectronico: 'daniel.hernandez@gmail.com',
        correoNotificacion: 'dhernandez@hotmail.com',
        numeroConvencional: '021234567',
        numeroCelular: '0987654322'
    },
    {
        numeroIdentificacion: '0953492156',
        nombres: 'Gabriela Sofía',
        apellidos: 'Pérez Ramírez',
        correoElectronico: 'gabriela.perez@outlook.com',
        correoNotificacion: 'g.perez@gmail.com',
        numeroConvencional: '022345678',
        numeroCelular: '0976543210'
    },
    {
        numeroIdentificacion: '0953492157',
        nombres: 'Fernando Javier',
        apellidos: 'Cruz Benítez',
        correoElectronico: 'fernando.cruz@yahoo.com',
        correoNotificacion: 'fcruz@hotmail.com',
        numeroConvencional: '023456789',
        numeroCelular: '0999988775'
    },
    {
        numeroIdentificacion: '0953492158',
        nombres: 'Samantha Elizabeth',
        apellidos: 'Martínez López',
        correoElectronico: 'samantha.martinez@gmail.com',
        correoNotificacion: 'smartinez@outlook.com',
        numeroConvencional: '027654321',
        numeroCelular: '0981122334'
    },
    {
        numeroIdentificacion: '0953492159',
        nombres: 'Javier Alejandro',
        apellidos: 'Gutiérrez Silva',
        correoElectronico: 'javier.gutierrez@hotmail.com',
        correoNotificacion: 'jgutierrez@yahoo.com',
        numeroConvencional: '028765432',
        numeroCelular: '0956784321'
    }
];


export const TestPage = () => {

    const [isNewUserFormOpen, setIsNewUserFormOpen] = useState(false);

    const [isUpdateUserFormOpen, setIsUpdateUserFormOpen] = useState(false);

    const [userData, setUserData] = useState<UserData | undefined>(undefined);

    function onCreate() {
        setIsNewUserFormOpen(true);
    }

    function onEdit(user: UserData) {
        console.log(user);
        setIsUpdateUserFormOpen(true);
        setUserData(user);
    }

    return (
        <div className="h-full">
            <Table data={data} columns={columns} openNewForm={onCreate} openEditForm={onEdit} />
            <Modal isOpen={isNewUserFormOpen} onClose={() => setIsNewUserFormOpen(false)} title="Crear nuevo usuario" description="Complete los campos para crear un nuevo usuario">
                <EmpleadosForm className="w-full" onClose={() => setIsNewUserFormOpen(false)} />
            </Modal>
            <Modal isOpen={isUpdateUserFormOpen} onClose={() => setIsUpdateUserFormOpen(false)} title="Editar usuario" description="Complete los campos para actualizar el usuario">
                <EmpleadosForm className="w-full" onClose={() => setIsUpdateUserFormOpen(false)} user={userData}/>
            </Modal>
        </div>
    )
}