import React from 'react';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { IPropietarioTableData } from '../../interfaces/Propietario';

interface PropietariosTableProps {
  propietarios: IPropietarioTableData[];
  onEdit: (propietario: IPropietarioTableData) => void;
  onDelete: (propietario: IPropietarioTableData) => void;
  onViewDetail: (propietario: IPropietarioTableData) => void;
  onInmuebleClick: (inmuebleId: string) => void;
  canEdit?: boolean;
  canDelete?: boolean;
}

const PropietariosTable: React.FC<PropietariosTableProps> = ({
  propietarios = [],
  onEdit,
  onDelete,
  onViewDetail,
  onInmuebleClick,
  canEdit = true,
  canDelete = true
}) => {
  const renderInmuebles = (inmuebles?: string[]) => {
    if (!inmuebles || inmuebles.length === 0) {
      return <span className="text-gray-400 dark:text-gray-500 text-xs italic">Sin inmuebles</span>;
    }

    return (
      <div className="flex flex-wrap gap-1.5">
        {inmuebles.map((inmuebleId) => (
          <button
            key={inmuebleId}
            onClick={() => onInmuebleClick(inmuebleId)}
            className="inline-flex items-center px-2 py-1 rounded-md text-[12px] font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 transition-colors cursor-pointer border border-blue-100 dark:border-blue-900/50"
            title="Ver detalle del inmueble"
          >
            {inmuebleId}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="rounded-[1rem] border border-gray-100 dark:border-border overflow-hidden bg-white dark:bg-card shadow-sm w-full">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-sm text-left relative">
          <thead className="bg-waiwa-sky dark:bg-waiwa-amber text-[#64748b] dark:text-muted-foreground text-[13px] font-semibold border-b border-gray-100 dark:border-border">
            <tr>
              <th className="px-5 py-4 whitespace-nowrap font-medium dark:text-black">
                Nombre Completo
              </th>
              <th className="px-5 py-4 whitespace-nowrap font-medium dark:text-black">
                Cédula
              </th>
              <th className="px-5 py-4 whitespace-nowrap font-medium dark:text-black">
                Email
              </th>
              <th className="px-5 py-4 whitespace-nowrap font-medium dark:text-black">
                Teléfono
              </th>
              <th className="px-5 py-4 font-medium dark:text-black">
                Inmuebles
              </th>
              <th className="px-5 py-4 whitespace-nowrap dark:text-black font-medium text-center sticky right-0 bg-waiwa-sky dark:bg-waiwa-amber shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.05)] border-l border-gray-100 dark:border-border z-10 w-[160px]">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-border/50 bg-white dark:bg-card">
            {propietarios.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500 dark:text-muted-foreground">
                  No hay propietarios registrados
                </td>
              </tr>
            ) : (
              propietarios.map((propietario) => (
                <tr key={propietario.id} className="hover:bg-gray-50/80 dark:hover:bg-muted/20 transition-colors group">
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="font-semibold text-gray-900 dark:text-foreground">
                      {propietario.nombre} {propietario.apellido}
                    </div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="text-[13px] text-gray-700 dark:text-gray-300">{propietario.cedula}</div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="text-[13px] text-gray-700 dark:text-gray-300">{propietario.email}</div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="text-[13px] text-gray-700 dark:text-gray-300">{propietario.telefono}</div>
                  </td>
                  <td className="px-5 py-4">
                    {renderInmuebles(propietario.inmuebles)}
                  </td>
                  <td className="flex w-full h-full items-center justify-center text-center text-gray-500 dark:text-gray-400 gap-2 sticky right-0 bg-white dark:bg-card border-l border-gray-100 dark:border-border transition-colors z-10 h-[72px]">
                    <button
                      onClick={() => onViewDetail(propietario)}
                      className="p-1.5 rounded-md hover:bg-green-100 hover:text-green-800 dark:hover:bg-green-900/40 dark:hover:text-green-400 border border-transparent transition-colors items-center justify-center"
                      title="Ver detalle del propietario"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onEdit(propietario)}
                      disabled={!canEdit}
                      className={`p-1.5 rounded-md border border-transparent transition-colors items-center justify-center ${canEdit
                        ? 'hover:bg-blue-100 hover:text-blue-800 dark:hover:bg-blue-900/40 dark:hover:text-blue-400'
                        : 'cursor-not-allowed opacity-50'
                        }`}
                      title={canEdit ? 'Editar propietario' : 'No tienes permisos para editar'}
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(propietario)}
                      disabled={!canDelete}
                      className={`p-1.5 rounded-md border border-transparent transition-colors items-center justify-center ${canDelete
                        ? 'hover:bg-red-100 hover:text-red-800 dark:hover:bg-red-900/40 dark:hover:text-red-400'
                        : 'cursor-not-allowed opacity-50'
                        }`}
                      title={canDelete ? 'Eliminar propietario' : 'No tienes permisos para eliminar'}
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

export default PropietariosTable;
export type { IPropietarioTableData };
