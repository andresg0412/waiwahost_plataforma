import React from 'react';
import { Eye, Edit, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { IMovimiento } from '../../interfaces/Movimiento';
import PlataformaBadge from '../atoms/PlataformaBadge';

interface MovimientosTableProps {
  movimientos: IMovimiento[];
  loading: boolean;
  onView: (movimiento: IMovimiento) => void;
  onEdit: (movimiento: IMovimiento) => void;
  onDelete: (movimiento: IMovimiento) => void;
}

const MovimientosTable: React.FC<MovimientosTableProps> = ({
  movimientos,
  loading,
  onView,
  onEdit,
  onDelete
}) => {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getConceptoLabel = (concepto: string): string => {
    const conceptos: Record<string, string> = {
      reserva: 'Reserva',
      limpieza: 'Limpieza',
      deposito_garantia: 'Depósito de Garantía',
      servicios_adicionales: 'Servicios Adicionales',
      multa: 'Multa',
      mantenimiento: 'Mantenimiento',
      servicios_publicos: 'Servicios Públicos',
      suministros: 'Suministros',
      comision: 'Comisión',
      devolucion: 'Devolución',
      impuestos: 'Impuestos',
      otro: 'Otro'
    };
    return conceptos[concepto] || concepto;
  };

  const getMetodoPagoLabel = (metodo: string): string => {
    const metodos: Record<string, string> = {
      efectivo: 'Efectivo',
      transferencia: 'Transferencia',
      tarjeta: 'Tarjeta',
      otro: 'Otro'
    };
    return metodos[metodo] || metodo;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-tourism-navy">Movimientos del Día</h3>
        </div>
        <div className="p-4">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[1rem] border border-gray-100 dark:border-border overflow-hidden bg-white dark:bg-card shadow-sm w-full">
      <div className="p-4 border-b border-gray-100 dark:border-border bg-white dark:bg-card">
        <h3 className="text-lg font-semibold text-tourism-navy dark:text-foreground">Movimientos del Día</h3>
      </div>

      {movimientos.length === 0 ? (
        <div className="p-12 text-center">
          <p className="text-gray-500 dark:text-muted-foreground">No hay movimientos registrados para esta fecha</p>
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="w-full text-sm text-left relative">
            <thead className="bg-waiwa-sky dark:bg-waiwa-amber text-[#64748b] dark:text-muted-foreground text-[13px] font-semibold border-b border-gray-100 dark:border-border">
              <tr>
                <th className="px-5 py-4 whitespace-nowrap font-medium dark:text-black">
                  Hora
                </th>
                <th className="px-5 py-4 whitespace-nowrap font-medium dark:text-black">
                  Tipo
                </th>
                <th className="px-5 py-4 whitespace-nowrap font-medium dark:text-black">
                  Concepto
                </th>
                <th className="px-5 py-4 whitespace-nowrap font-medium dark:text-black">
                  Descripción
                </th>
                <th className="px-5 py-4 whitespace-nowrap font-medium dark:text-black">
                  Inmueble
                </th>
                <th className="px-5 py-4 whitespace-nowrap font-medium dark:text-black">
                  Reserva
                </th>
                <th className="px-5 py-4 whitespace-nowrap font-medium dark:text-black text-center">
                  Plataforma
                </th>
                <th className="px-5 py-4 whitespace-nowrap font-medium dark:text-black">
                  Método
                </th>
                <th className="px-5 py-4 whitespace-nowrap font-medium dark:text-black text-right">
                  Monto
                </th>
                <th className="px-5 py-4 whitespace-nowrap dark:text-black font-medium text-center sticky right-0 bg-waiwa-sky dark:bg-waiwa-amber shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.05)] border-l border-gray-100 dark:border-border z-10 w-[140px]">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-border/50 bg-white dark:bg-card">
              {movimientos.map((movimiento) => (
                <tr key={movimiento.id} className="hover:bg-gray-50/80 dark:hover:bg-muted/20 transition-colors group">
                  <td className="px-5 py-4 whitespace-nowrap text-[13px] text-gray-700 dark:text-gray-300">
                    {formatTime(movimiento.fecha_creacion)}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {movimiento.tipo === 'ingreso' ? (
                        <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-500" />
                      )}
                      <span className={`text-[13px] font-semibold capitalize ${movimiento.tipo === 'ingreso' ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'
                        }`}>
                        {movimiento.tipo}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-[13px] text-gray-700 dark:text-gray-300 font-medium">
                    {getConceptoLabel(movimiento.concepto)}
                  </td>
                  <td className="px-5 py-4 text-[13px] text-gray-700 dark:text-gray-300 max-w-xs truncate">
                    {movimiento.descripcion}
                  </td>
                  <td className="px-5 py-4 text-[13px] font-medium text-gray-900 dark:text-foreground">
                    {movimiento.nombre_inmueble}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-[13px]">
                    {movimiento.codigo_reserva ? (
                      <span className="text-tourism-teal font-semibold">
                        {movimiento.codigo_reserva}
                      </span>
                    ) : (
                      <span className="text-gray-400 dark:text-gray-500 italic">-</span>
                    )}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-center">
                    <PlataformaBadge plataforma={movimiento.plataforma_origen} showEmpty={false} />
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-[13px] text-gray-700 dark:text-gray-300">
                    {getMetodoPagoLabel(movimiento.metodo_pago)}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-right">
                    <div className={`text-[13px] font-bold ${movimiento.tipo === 'ingreso' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {movimiento.tipo === 'ingreso' ? '+' : '-'}{formatCurrency(movimiento.monto)}
                    </div>
                  </td>
                  <td className="flex w-full h-full items-center justify-center text-center text-gray-500 dark:text-gray-400 gap-2 sticky right-0 bg-white dark:bg-card border-l border-gray-100 dark:border-border transition-colors z-10 h-[72px]">
                    <button
                      onClick={() => onView(movimiento)}
                      className="p-1.5 rounded-md hover:bg-green-100 hover:text-green-800 dark:hover:bg-green-900/40 dark:hover:text-green-400 border border-transparent transition-colors items-center justify-center"
                      title="Ver detalle"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onEdit(movimiento)}
                      className="p-1.5 rounded-md hover:bg-blue-100 hover:text-blue-800 dark:hover:bg-blue-900/40 dark:hover:text-blue-400 border border-transparent transition-colors items-center justify-center"
                      title="Editar"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(movimiento)}
                      className="p-1.5 rounded-md hover:bg-red-100 hover:text-red-800 dark:hover:bg-red-900/40 dark:hover:text-red-400 border border-transparent transition-colors items-center justify-center"
                      title="Eliminar"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MovimientosTable;