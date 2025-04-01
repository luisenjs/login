import { useReactTable, getCoreRowModel, flexRender, AccessorKeyColumnDef, getSortedRowModel, getFilteredRowModel } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, SquarePen, Trash2 } from 'lucide-react';

type tableprops<T> = {
    tipo: string;
    data: T[] | undefined;
    columns: AccessorKeyColumnDef<T, string>[];
    setPage: React.Dispatch<React.SetStateAction<number>>
    setSize: React.Dispatch<React.SetStateAction<number>>
    openNewForm: () => void;
    openEditForm: (data: T) => void;
}

function Table<T>({ tipo, data, columns, setSize, openNewForm, openEditForm }: tableprops<T>) {

    const table = useReactTable({
        data: data || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel()
    })

    function onCreate() {
        openNewForm()
    }

    function onEdit(data: T) {
        openEditForm(data)
    }

    return (
        <div className='flex flex-col py-4 px-6 h-auto max-w-screen'>
            <div className='flex flex-row justify-between items-center mb-4'>
                <div className='flex flex-col gap-2 p-2'>
                    <h3 className='font-bold px-1 text-2xl text-slate-700'>Administración de {tipo}</h3>
                    <div className='flex flex-row gap-3'>
                        <select className='border border-slate-200 bg-slate-100 p-2 w-64' name="departamente" id="departamento">
                            <option value="1">Departamento 1</option>
                        </select >
                        <select className='border border-slate-200 bg-slate-100 p-2 w-64' name="departamente" id="departamento">
                            <option value="1">Campo 1</option>
                        </select>
                    </div>
                </div>
                <button className='bg-slate-300 text-slate-700 font-medium max-h-11 px-6 py-2 rounded-sm border-1 border-slate-300 hover:border-slate-500' onClick={() => onCreate()}>Agregar {tipo}</button>
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
                                <tr className='h-[60px] hover:bg-gray-200 hover:font-medium' key={row.id}>
                                    {
                                        row.getVisibleCells().map(cell => (
                                            <td className='text-slate-700' key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))
                                    }
                                    <td className='acciones text-gray-500'>
                                        <div className='flex gap-3 items-center'>
                                            <button className='border-1 border-white text-green-600 flex flex-row rounded-sm hover:bg-green-200 hover:border hover:border-green-500 py-1 px-3' onClick={() => onEdit(row.original)}><SquarePen />Editar</button>
                                            <button className='border-1 border-white text-red-600 flex flex-row rounded-sm hover:bg-red-200 hover:border hover:border-red-500 py-1 px-3'><Trash2 />Eliminar</button>
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
                    <select onChange={e => { setSize(Number(e.target.value)) }} className='w-16 border-2 border-gray-300 rounded-lg p-1'>
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
    )

}

export default Table;