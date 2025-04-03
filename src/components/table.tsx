import { useReactTable, getCoreRowModel, flexRender, AccessorKeyColumnDef, getSortedRowModel, getFilteredRowModel } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, SquarePen, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Cargo } from '../interfaces/empleadosInterface';
import { getCargos } from '../services/requests';

type tableprops<T> = {
    token: string;
    tipo: string;
    data: T[] | undefined;
    columns: AccessorKeyColumnDef<T, string>[];
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>
    totalPages: number;
    setSize: React.Dispatch<React.SetStateAction<number>>
    openNewForm: () => void;
    openEditForm: (data: T) => void;
    openDelete: (data: T) => void;
    filterTable: (filter: string) => void;
}

function Table<T>({ token, tipo, data, columns, page, setPage, totalPages, setSize, openNewForm, openEditForm, openDelete, filterTable }: tableprops<T>) {

    const [cargos, setCarago] = useState<Cargo[]>([]);

    const [buscador, setBuscador] = useState<string>("");

    const [selectedCargo, setSelectedCargo] = useState<string>();

    useEffect(() => {
        async function infoCargos() {
            const cargosRes = await getCargos(token);
            setCarago(cargosRes.data.content);
        }
        infoCargos();
        if (selectedCargo) {
            filterTable(selectedCargo)
        } else {
            filterTable(buscador)
        }
    }, [selectedCargo, buscador])

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCargo(event.target.value);
    };

    const table = useReactTable({
        data: data || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel()
    })

    return (
        <div className='flex flex-col py-4 px-16 h-auto max-w-screen w-full'>
            <div className='flex flex-row justify-between items-end mb-4'>
                <div className='flex flex-col gap-2 p-2'>
                    <h3 className='font-bold px-1 text-2xl text-slate-700'>Administración de {tipo}</h3>
                    <div className='flex flex-row gap-3'>
                        <select className="focus:shadow-slate-400 shadow-md focus:ring-2 focus:ring-slate-400 outline-none duration-300 hover:cursor-pointer border-1 border-gray-400 text-slate-700 rounded p-2 w-full" value={selectedCargo} onChange={handleSelectChange} id="cargo">
                            <option value="">Seleccione un cargo</option>
                            {cargos &&
                                cargos.map((cargo: Cargo, index: number) => (
                                    <option key={index} value={cargo.descripcion}>
                                        {cargo.descripcion}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>
                <div className='flex flex-row gap-5 justify-end mb-2'>
                    <div className='flex w-60'>
                        <input type="text" value={buscador} onChange={(e) => { setBuscador(e.target.value); setSelectedCargo("") }} placeholder='Buscar' className='w-full px-3 py-2 rounded border-2 border-slate-500 bg-white text-slate-700 focus:ring-2 focus:ring-slate-400 outline-none duration-300 placeholder:text-slate-600 placeholder:opacity-50 shadow-md focus:shadow-lg focus:shadow-slate-400' />
                    </div>
                    <button className='active:bg-slate-400 focus:outline-4 focus:outline-offset-4 focus:outline-slate-300 hover:cursor-pointer bg-slate-300 text-slate-700 font-medium max-h-11 px-6 py-2 rounded-sm border-1 border-slate-300 hover:border-slate-500 active:' onClick={openNewForm}>Agregar {tipo}</button>
                </div>
            </div>
            <div className='bg-white shadow-md rounded-sm overflow-auto'>
                <table className='w-full'>
                    <thead className='bg-gray-300'>
                        {
                            table.getHeaderGroups().map(headerGroup => (
                                <tr className='h-[60px]' key={headerGroup.id}>
                                    {
                                        headerGroup.headers.map(header => (
                                            <th className='text-slate-700 uppercase cursor-pointer' onClick={header.column.getToggleSortingHandler()} key={header.id}>
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </th>
                                        ))
                                    }
                                    <th className='acciones min-w-[20vw] py-5 px-4 text-slate-700 uppercase'>Acciones</th>
                                </tr>
                            ))
                        }
                    </thead>
                    <tbody>
                        {
                            table.getRowModel().rows.map(row => (
                                <tr className='h-[60px] hover:bg-gray-200' key={row.id}>
                                    {
                                        row.getVisibleCells().map(cell => (
                                            <td className='text-slate-700' key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))
                                    }
                                    <td className='acciones text-gray-500'>
                                        <div className='flex gap-3 items-center'>
                                            <button className='hover:cursor-pointer border-1 border-white text-green-600 flex flex-row rounded-sm hover:bg-green-200 focus:bg-green-200 focus:border-green-500 hover:border hover:border-green-500 py-1 px-3' onClick={() => openEditForm(row.original)}><SquarePen />Editar</button>
                                            <button className='hover:cursor-pointer border-1 border-white text-pink-700 flex flex-row rounded-sm hover:bg-pink-200 focus:bg-pink-200 focus:border-pink-500 hover:border hover:border-pink-500 py-1 px-3' onClick={() => (openDelete(row.original))}><Trash2 />Eliminar</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {data === undefined ? <p className='flex justify-center text-red-400 font-semibold italic'>No hay datos qué mostrar por el momento</p> : <></>}
            </div>
            <div className='flex justify-between items-center'>
                <div className='flex gap-3 items-center p-3'>
                    <span>Filas por página</span>
                    <select onChange={e => { setSize(Number(e.target.value)) }} className='w-16 border-2 border-gray-300 rounded-lg p-1'>
                        {
                            [5, 10, 15, 20, 30].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>{pageSize}</option>
                            ))
                        }
                    </select>
                </div>
                <div className='flex gap-3 items-center justify-center p-3'>
                    <button onClick={() => setPage(0)} className={`bg-slate-300 hover:bg-slate-400 p-2 rounded`}>
                        <ChevronsLeft className='size-6 text-slate-700' />
                    </button>
                    <button onClick={() => setPage(page - 1)} disabled={page < 1} className={`bg-slate-300 hover:bg-slate-400 p-2 rounded ${page < 1 && 'cursor-not-allowed opacity-70'}`}>
                        <ChevronLeft className='size-6 text-slate-700' />
                    </button>
                    <span>Página actual: {page + 1} de {totalPages}</span>
                    <button onClick={() => setPage(page + 1)} disabled={page >= totalPages - 1} className={`bg-slate-300 hover:bg-slate-400 p-2 rounded ${page >= totalPages - 1 && 'cursor-not-allowed opacity-70'}`}>
                        <ChevronRight className='size-6 text-slate-700' />
                    </button>
                    <button onClick={() => setPage(totalPages - 1)} className={`bg-slate-300 hover:bg-slate-400 p-2 rounded`}>
                        <ChevronsRight className='size-6 text-slate-700' />
                    </button>
                </div>
            </div>
        </div>
    )

}

export default Table;