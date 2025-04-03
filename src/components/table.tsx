import { useReactTable, getCoreRowModel, flexRender, AccessorKeyColumnDef, getSortedRowModel, getFilteredRowModel } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search, SquarePen, Trash2 } from 'lucide-react';
import { useState } from 'react';
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
}

function Table<T>({token, tipo, data, columns, page, setPage, totalPages, setSize, openNewForm, openEditForm, openDelete }: tableprops<T>) {

    const [buscador, setBuscador] = useState<string>();

    const [cargos, setCarago] = useState<Cargo[]>([]);

    const [selectedCargo, setSelectedCargo] = useState<string>();

    async () => {
        const cargosRes = await getCargos(token);
        setCarago(cargosRes.data.content);
    }

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
        <div className='flex flex-col py-4 px-16 h-auto max-w-screen'>
            <div className='flex flex-row justify-between items-end mb-4'>
                <div className='flex flex-col gap-2 p-2'>
                    <h3 className='font-bold px-1 text-2xl text-slate-700'>Administración de {tipo}</h3>
                    <div className='flex flex-row gap-3'>
                        <select className="border-1 border-gray-400 rounded p-2 w-full" value={selectedCargo} onChange={handleSelectChange} id="cargo">
                            <option value="">Seleccione un cargo</option>
                            {cargos &&
                                cargos.map((cargo: Cargo, index: number) => (
                                    <option key={index} value={cargo.id.codigo}>
                                        {cargo.descripcion}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>
                <div className='flex flex-row gap-5 justify-end mb-2'>
                    <div className='flex relative w-60'>
                        <Search className="size-6 text-gray-400 absolute left-2 top-2.5" />
                        <input type="text" value={buscador} onChange={(e) => setBuscador(e.target.value)} placeholder='Buscar' className='w-full pl-10 py-2 rounded-lg border-2 border-gray-300' />
                    </div>
                    <button className='bg-slate-300 text-slate-700 font-medium max-h-11 px-6 py-2 rounded-sm border-1 border-slate-300 hover:border-slate-500' onClick={openNewForm}>Agregar {tipo}</button>
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
                                            <button className='border-1 border-white text-green-600 flex flex-row rounded-sm hover:bg-green-200 hover:border hover:border-green-500 py-1 px-3' onClick={() => openEditForm(row.original)}><SquarePen />Editar</button>
                                            <button className='border-1 border-white text-red-600 flex flex-row rounded-sm hover:bg-red-200 hover:border hover:border-red-500 py-1 px-3' onClick={() => (openDelete(row.original))}><Trash2 />Eliminar</button>
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
                    <button onClick={() => setPage(0)} className={`bg-slate-300 hover:bg-slate-400 p-2 rounded-lg`}>
                        <ChevronsLeft className='size-6 text-slate-700' />
                    </button>
                    <button onClick={() => setPage(page - 1)} disabled={page < 1} className={`bg-slate-300 hover:bg-slate-400 p-2 rounded-lg ${page < 1 && 'cursor-not-allowed opacity-60'}`}>
                        <ChevronLeft className='size-6 text-slate-700' />
                    </button>
                    <span>Página actual: {page + 1} de {totalPages}</span>
                    <button onClick={() => setPage(page + 1)} disabled={page >= totalPages - 1} className={`bg-slate-300 hover:bg-slate-400 p-2 rounded-lg ${page >= totalPages - 1 && 'cursor-not-allowed opacity-60'}`}>
                        <ChevronRight className='size-6 text-slate-700' />
                    </button>
                    <button onClick={() => setPage(totalPages - 1)} className={`bg-slate-300 hover:bg-slate-400 p-2 rounded-lg`}>
                        <ChevronsRight className='size-6 text-slate-700' />
                    </button>
                </div>
            </div>
        </div>
    )

}

export default Table;