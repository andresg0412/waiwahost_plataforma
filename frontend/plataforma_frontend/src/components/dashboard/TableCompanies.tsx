import React from 'react';
import { Edit2, Trash2, PowerOff, Eye } from 'lucide-react';
import { IEmpresa } from '../../interfaces/Empresa';

interface TableCompaniesProps {
    empresas: IEmpresa[];
    loading: boolean;
    onEdit: (empresa: IEmpresa) => void;
    onSoftDelete: (id: number | string) => void;
    onHardDelete: (id: number | string) => void;
    onViewDetails: (empresa: IEmpresa) => void;
}

const TableCompanies: React.FC<TableCompaniesProps> = ({
    empresas,
    loading,
    onEdit,
    onSoftDelete,
    onHardDelete,
    onViewDetails
}) => {
    return (
        <div className="rounded-[1rem] border border-gray-100 dark:border-border overflow-hidden bg-white dark:bg-card shadow-sm w-full">
            <div className="overflow-x-auto w-full">
                <table className="w-full text-sm text-left relative">
                    <thead className="bg-waiwa-sky dark:bg-waiwa-amber text-[#64748b] dark:text-muted-foreground text-[13px] font-semibold border-b border-gray-100 dark:border-border">
                        <tr>
                            <th className="px-5 py-4 whitespace-nowrap font-medium dark:text-black">ID</th>
                            <th className="px-5 py-4 whitespace-nowrap font-medium dark:text-black">Nombre</th>
                            <th className="px-5 py-4 whitespace-nowrap font-medium dark:text-black">NIT</th>
                            <th className="px-5 py-4 whitespace-nowrap dark:text-black font-medium text-center sticky right-0 bg-waiwa-sky dark:bg-waiwa-amber shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.05)] border-l border-gray-100 dark:border-border z-10 w-[180px]">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-border/50 bg-white dark:bg-card">
                        {loading ? (
                            <tr><td colSpan={4} className="text-center py-12 text-gray-500 dark:text-muted-foreground">Cargando empresas...</td></tr>
                        ) : empresas.length === 0 ? (
                            <tr><td colSpan={4} className="text-center py-12 text-gray-500 dark:text-muted-foreground">No hay empresas registradas.</td></tr>
                        ) : (
                            empresas.map((emp) => (
                                <tr key={emp.id_empresa} className="hover:bg-gray-50/80 dark:hover:bg-muted/20 transition-colors group">
                                    <td className="px-5 py-4 whitespace-nowrap text-[13px] text-gray-700 dark:text-gray-300">{emp.id_empresa}</td>
                                    <td className="px-5 py-4 whitespace-nowrap">
                                        <div className="font-semibold text-gray-900 dark:text-foreground">{emp.nombre}</div>
                                    </td>
                                    <td className="px-5 py-4 whitespace-nowrap text-[13px] text-gray-700 dark:text-gray-300">{emp.nit}</td>
                                    <td className="flex w-full h-full items-center justify-center text-center text-gray-500 dark:text-gray-400 gap-2 sticky right-0 bg-white dark:bg-card border-l border-gray-100 dark:border-border transition-colors z-10 h-[72px]">
                                        <button
                                            onClick={() => onViewDetails(emp)}
                                            className="p-1.5 rounded-md hover:bg-green-100 hover:text-green-800 dark:hover:bg-green-900/40 dark:hover:text-green-400 border border-transparent transition-colors items-center justify-center"
                                            title="Ver Detalles"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => onEdit(emp)}
                                            className="p-1.5 rounded-md hover:bg-indigo-100 hover:text-indigo-800 dark:hover:bg-indigo-900/40 dark:hover:text-indigo-400 border border-transparent transition-colors items-center justify-center"
                                            title="Editar"
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </button>

                                        <button
                                            onClick={() => onSoftDelete(emp.id_empresa!)}
                                            className="p-1.5 rounded-md hover:bg-orange-100 hover:text-orange-800 dark:hover:bg-orange-900/40 dark:hover:text-orange-400 border border-transparent transition-colors items-center justify-center"
                                            title="Desactivar"
                                        >
                                            <PowerOff className="h-4 w-4" />
                                        </button>

                                        <button
                                            onClick={() => onHardDelete(emp.id_empresa!)}
                                            className="p-1.5 rounded-md hover:bg-red-100 hover:text-red-800 dark:hover:bg-red-900/40 dark:hover:text-red-400 border border-transparent transition-colors items-center justify-center"
                                            title="Eliminar Permanentemente"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableCompanies;
