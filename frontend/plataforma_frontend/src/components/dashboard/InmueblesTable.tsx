import React from 'react';
import { Eye, Edit2, Trash2, Share2, Maximize, BedDouble, Users, Home } from 'lucide-react';
import { useAuth } from '../../auth/AuthContext';
import { IInmueble } from '../../interfaces/Inmueble';
import { copyToClipboard } from '../../lib/utils';

export interface IDataInmuebleIn extends IInmueble { }

interface InmueblesTableProps {
  inmuebles: IDataInmuebleIn[];
  onEdit: (inmueble: IDataInmuebleIn) => void;
  onDelete: (inmueble: IDataInmuebleIn) => void;
  onViewDetail: (inmueble: IDataInmuebleIn) => void;
}

const InmueblesTable: React.FC<InmueblesTableProps> = ({ inmuebles, onEdit, onDelete, onViewDetail }) => {
  const { user } = useAuth();
  const canEdit = user?.permisos?.includes('editar_inmuebles') || true; // TEMPORAL: siempre true para debugging
  const canDelete = user?.permisos?.includes('eliminar_inmuebles') || true; // TEMPORAL: siempre true para debugging

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="flex flex-col gap-4 pb-12">
      {inmuebles.length === 0 ? (
        <div className="py-12 text-center text-gray-500 bg-white dark:bg-card border border-gray-100 dark:border-border rounded-[1rem] shadow-sm">
          No hay inmuebles registrados
        </div>
      ) : (
        inmuebles.map((inmueble) => {
          const price = inmueble.precio || 0;
          const area = inmueble.area || 0;
          const beds = inmueble.habitaciones || 1;
          const guests = inmueble.capacidad_maxima || 2;
          const bedType = inmueble.especificacion_acomodacion || inmueble.tipo || 'Cama Est.',
            title = inmueble.nombre || inmueble.tipo_acomodacion || `Inmueble ${inmueble.id_inmueble || inmueble.id}`;

          let description = inmueble.descripcion;
          if (!description) {
            const locationParts = [inmueble.direccion, inmueble.ciudad].filter(Boolean).join(', ');
            description = locationParts ? `Ubicado en ${locationParts}. ${inmueble.tipo_acomodacion || ''}` : 'Propiedad cómoda y bien situada. Equipada con todas las facilidades necesarias para una excelente estadía.';
          }

          const isAvailable = inmueble.estado !== 'inactivo' && inmueble.estado !== 'mantenimiento';
          const formatRNT = inmueble.rnt ? `RNT: ${inmueble.rnt}` : (inmueble.comision ? `${inmueble.comision}% Comis.` : null);

          return (
            <div key={inmueble.id} className="flex flex-col bg-white dark:bg-card border border-gray-100 dark:border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow group relative w-full p-5 lg:p-6">
              <div className="flex flex-col w-full justify-between">

                <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-4">

                  <div className="flex-1 space-y-1.5 order-2 sm:order-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-foreground line-clamp-1">
                      {title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-muted-foreground line-clamp-2 leading-relaxed max-w-xl pr-4">
                      {description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {inmueble.tipo_acomodacion && (
                        <span className="px-2.5 py-1 bg-gray-50 dark:bg-muted/50 text-gray-600 dark:text-gray-300 rounded-md text-[12px] font-medium border border-gray-100 dark:border-border">
                          {inmueble.tipo_acomodacion}
                        </span>
                      )}
                      <span className="px-2.5 py-1 bg-gray-50 dark:bg-muted/50 text-gray-600 dark:text-gray-300 rounded-md text-[12px] font-medium border border-gray-100 dark:border-border">
                        Comisión: {inmueble.comision ? `${parseFloat(inmueble.comision.toString())}%` : '0%'}
                      </span>
                      {inmueble.id_propietario && (
                        <span className="px-2.5 py-1 bg-gray-50 dark:bg-muted/50 text-gray-600 dark:text-gray-300 rounded-md text-[12px] font-medium border border-gray-100 dark:border-border">
                          Propietario: {inmueble.id_propietario}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start w-full sm:w-auto shrink-0 order-1 sm:order-2">
                    <div className="flex items-center gap-2 mb-2 sm:mb-4">
                      <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500 hidden sm:inline-block">ID: {inmueble.id_inmueble || inmueble.id}</span>
                      {isAvailable ? (
                        <span className="px-3 py-1 bg-[#e0eafe] text-[#2463eb] dark:bg-blue-900/40 dark:text-blue-400 rounded-full text-xs font-semibold whitespace-nowrap">
                          Disponible
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-[#fee2e2] text-[#b91c1c] dark:bg-red-900/40 dark:text-red-400 rounded-full text-xs font-semibold whitespace-nowrap">
                          Ocupado
                        </span>
                      )}
                    </div>
                    {price > 0 && (
                      <div className="text-right">
                        <span className="text-2xl font-bold text-gray-900 dark:text-foreground">{formatCurrency(price)}</span>
                        <span className="text-[13px] text-gray-500 dark:text-muted-foreground font-medium ml-1">/noche</span>
                      </div>
                    )}
                  </div>
                </div>

                <hr className="my-5 border-gray-100 dark:border-border" />

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Maximize className="w-[18px] h-[18px] text-gray-400" />
                      <span className="font-medium text-[13px]">{area} m²</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BedDouble className="w-[18px] h-[18px] text-gray-400" />
                      <span className="font-medium text-[13px] line-clamp-1 max-w-[120px]">{beds} {bedType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-[18px] h-[18px] text-gray-400" />
                      <span className="font-medium text-[13px]">{guests} huesp.</span>
                    </div>
                    {formatRNT && (
                      <div className="flex items-center gap-2">
                        <Home className="w-[18px] h-[18px] text-gray-400" />
                        <span className="font-medium text-[13px] text-gray-500">{formatRNT}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-1 shrink-0 mt-2 sm:mt-0">
                    <button
                      onClick={() => onViewDetail(inmueble)}
                      className="p-2 rounded-lg text-gray-500 hover:text-green-600 hover:bg-green-50 dark:hover:text-green-400 dark:hover:bg-green-900/30 transition-all border border-transparent"
                      title="Ver detalle del inmueble"
                    >
                      <Eye className="h-[18px] w-[18px]" />
                    </button>
                    <button
                      onClick={() => canEdit && onEdit(inmueble)}
                      disabled={!canEdit}
                      className={`p-2 rounded-lg transition-all border border-transparent ${canEdit
                        ? 'text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-blue-900/30'
                        : 'text-gray-300 cursor-not-allowed opacity-50'
                        }`}
                      title={canEdit ? 'Editar inmueble' : 'No tienes permisos para editar'}
                    >
                      <Edit2 className="h-[18px] w-[18px]" />
                    </button>
                    <button
                      onClick={() => canDelete && onDelete(inmueble)}
                      disabled={!canDelete}
                      className={`p-2 rounded-lg transition-all border border-transparent ${canDelete
                        ? 'text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-900/30'
                        : 'text-gray-300 cursor-not-allowed opacity-50'
                        }`}
                      title={canDelete ? 'Eliminar inmueble' : 'No tienes permisos para eliminar'}
                    >
                      <Trash2 className="h-[18px] w-[18px]" />
                    </button>
                    <button
                      onClick={async () => {
                        const baseUrl = process.env.NEXT_PUBLIC_FORM_URL || window.location.origin.replace('3001', '3000');
                        const link = `${baseUrl}/checkin?inmueble=${inmueble.id_inmueble || inmueble.id}`;
                        const success = await copyToClipboard(link);
                        if (success) {
                          alert(`Enlace copiado al portapapeles: ${link}`);
                        } else {
                          alert(`No se pudo copiar el enlace automáticamente. Por favor copia manualmente: ${link}`);
                        }
                      }}
                      className="p-2 rounded-lg text-gray-500 hover:text-purple-600 hover:bg-purple-50 dark:hover:text-purple-400 dark:hover:bg-purple-900/30 transition-all border border-transparent"
                      title="Compartir enlace formulario check-in"
                    >
                      <Share2 className="h-[18px] w-[18px]" />
                    </button>
                  </div>

                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default InmueblesTable;
