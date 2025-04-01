import { useReactTable, getCoreRowModel, flexRender, AccessorKeyColumnDef, getSortedRowModel, getFilteredRowModel, getPaginationRowModel } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search, SquarePen, Trash2 } from 'lucide-react';
import { useState } from 'react';

type tableprops<T> = {
    data: T[] | undefined;
    columns: AccessorKeyColumnDef<T, string>[];
    openNewForm: () => void;
    openEditForm: (data: T) => void;
}

function Table<T>({ data, columns, openNewForm, openEditForm}: tableprops<T>) {

    const [buscador, setBuscador] = useState<string>('')

    const table = useReactTable({
        data: data || [],
        columns,
        state: {
            globalFilter: buscador
        },
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onGlobalFilterChange: setBuscador,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    })

    function onCreate(){
        openNewForm()
    }

    function onEdit(data: T) {
        openEditForm(data)
    }

    return (
        <>
            <div className='flex flex-col p-4 mx-auto h-auto'>
                <div className='flex justify-between gap-3'>
                    <div className='flex mb-4 relative w-full'>
                        <Search className="size-6 text-gray-400 absolute left-2 top-2.5" />
                        <input type="text" value={buscador} onChange={(e) => setBuscador(e.target.value)} placeholder='Buscar' className='w-full pl-10 py-2 rounded-lg border-2 border-gray-300' />
                    </div>
                    <div className='flex justify-between mb-4'>
                        <button className='bg-blue-500 text-white px-4 py-2 rounded-lg' onClick={() => onCreate()}>Agregar</button>
                    </div>
                </div>
                <div className='bg-white shadow-md rounded-lg overflow-auto'>
                    <table className='w-full'>
                        <thead className='bg-gray-200'>
                            {
                                table.getHeaderGroups().map(headerGroup => (
                                    <tr key={headerGroup.id}>
                                        {
                                            headerGroup.headers.map(header => (
                                                <th className='text-gray-500 uppercase cursor-pointer' onClick={header.column.getToggleSortingHandler()} key={header.id}>
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                </th>
                                            ))
                                        }
                                        <th className='acciones min-w-[20vw] py-5 px-4 text-gray-500 uppercase'>Acciones</th>
                                    </tr>
                                ))
                            }
                        </thead>
                        <tbody>
                            {
                                table.getRowModel().rows.map(row => (
                                    <tr className='h-[60px] hover:bg-gray-100 hover:font-semibold' key={row.id}>
                                        {
                                            row.getVisibleCells().map(cell => (
                                                <td className='text-gray-500' key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>
                                            ))
                                        }
                                        <td className='acciones min-w-[20vw] text-gray-500'>
                                            <div className='flex gap-3 items-center'>
                                                <button className='text-green-600 flex flex-row rounded-sm hover:bg-green-200 hover:border hover:border-green-500 py-1 px-3' onClick={() => onEdit(row.original)}><SquarePen />Editar</button>
                                                <button className='text-red-600 flex flex-row rounded-sm hover:bg-red-200 hover:border hover:border-red-500 py-1 px-3'><Trash2 />Eliminar</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-3 items-center p-3'>
                        <span>Filas por página</span>
                        <select value={table.getState().pagination.pageSize} onChange={e => { table.setPageSize(Number(e.target.value)) }} className='w-16 border-2 border-gray-300 rounded-lg p-1'>
                            {
                                [5, 10, 15, 20, 30].map((pageSize) => (
                                    <option key={pageSize} value={pageSize}>{pageSize}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='flex gap-3 items-center justify-center p-3'>
                        <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} className={`bg-gray-200 p-2 rounded-lg ${!table.getCanPreviousPage() && 'cursor-not-allowed opacity-60'}`}>
                            <ChevronsLeft className='size-6 text-gray-400' />
                        </button>
                        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className={`bg-gray-200 p-2 rounded-lg ${!table.getCanPreviousPage() && 'cursor-not-allowed opacity-60'}`}>
                            <ChevronLeft className='size-6 text-gray-400' />
                        </button>
                        <span> Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}</span>
                        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className={`bg-gray-200 p-2 rounded-lg ${!table.getCanNextPage() && 'cursor-not-allowed opacity-60'}`}>
                            <ChevronRight className='size-6 text-gray-400' />
                        </button>
                        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()} className={`bg-gray-200 p-2 rounded-lg ${!table.getCanNextPage() && 'cursor-not-allowed opacity-60'}`}>
                            <ChevronsRight className='size-6 text-gray-400' />
                        </button>
                    </div>
                </div>
            </div>

        </>
    )

}

export default Table;