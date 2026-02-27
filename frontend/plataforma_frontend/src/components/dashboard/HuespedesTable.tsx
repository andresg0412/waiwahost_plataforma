import React from 'react';
import { Edit2, Eye } from 'lucide-react';
import { IHuespedTableData } from '../../interfaces/Huesped';

interface HuespedesTableProps {
  huespedes: IHuespedTableData[];
  onEdit: (huesped: IHuespedTableData) => void;
  onViewDetail: (huesped: IHuespedTableData) => void;
  canEdit?: boolean;
}

const HuespedesTable: React.FC<HuespedesTableProps> = ({
  huespedes,
  onEdit,
  onViewDetail,
  canEdit = true
}) => {
  return (
    <div className="rounded-[1rem] border border-gray-100 dark:border-border overflow-hidden bg-white dark:bg-card shadow-sm w-full">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-sm text-left relative">
          <thead className="bg-waiwa-sky dark:bg-waiwa-amber text-[#64748b] dark:text-muted-foreground text-[13px] font-semibold border-b border-gray-100 dark:border-border">
            <tr>
              <th className="px-5 py-4 whitespace-nowrap font-medium dark:text-black">
                ID
              </th>
              <th className="px-5 py-4 whitespace-nowrap font-medium dark:text-black">
                Nombre
              </th>
              <th className="px-5 py-4 whitespace-nowrap font-medium dark:text-black">
                Apellido
              </th>
              <th className="px-5 py-4 whitespace-nowrap font-medium dark:text-black">
                Documento
              </th>
              <th className="px-5 py-4 whitespace-nowrap font-medium dark:text-black">
                Correo
              </th>
              <th className="px-5 py-4 whitespace-nowrap font-medium dark:text-black">
                Contacto
              </th>
              <th className="px-5 py-4 whitespace-nowrap dark:text-black font-medium text-center sticky right-0 bg-waiwa-sky dark:bg-waiwa-amber shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.05)] border-l border-gray-100 dark:border-border z-10 w-[120px]">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-border/50 bg-white dark:bg-card">
            {huespedes.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500 dark:text-muted-foreground">
                  No hay huéspedes registrados
                </td>
              </tr>
            ) : (
              huespedes.map((huesped) => (
                <tr key={huesped.id_huesped} className="hover:bg-gray-50/80 dark:hover:bg-muted/20 transition-colors group">
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="font-semibold text-gray-900 dark:text-foreground">
                      {huesped.id_huesped}
                    </div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="text-[13px] text-gray-700 dark:text-gray-300">{huesped.nombre}</div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="text-[13px] text-gray-700 dark:text-gray-300">{huesped.apellido}</div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="text-[13px] text-gray-700 dark:text-gray-300">{huesped.documento_numero}</div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="text-[13px] text-gray-700 dark:text-gray-300">{huesped.email}</div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="text-[13px] text-gray-700 dark:text-gray-300">{huesped.telefono}</div>
                  </td>
                  <td className="flex w-full h-full items-center justify-center text-center text-gray-500 dark:text-gray-400 gap-2 sticky right-0 bg-white dark:bg-card border-l border-gray-100 dark:border-border transition-colors z-10 h-[72px]">
                    <button
                      //onClick={() => onViewDetail(huesped)}
                      onClick={() => { }}
                      disabled={true}
                      className="p-1.5 rounded-md border border-transparent transition-colors items-center justify-center text-gray-400 cursor-not-allowed"
                      title="Ver detalle del huésped (Deshabilitado)"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      //onClick={() => onEdit(huesped)}
                      onClick={() => { }}
                      disabled={true}
                      className="p-1.5 rounded-md border border-transparent transition-colors items-center justify-center text-gray-400 cursor-not-allowed"
                      title="Editar huésped (Deshabilitado)"
                    >
                      <Edit2 className="h-4 w-4" />
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

export default HuespedesTable;
export type { IHuespedTableData };