import React from 'react';
import { TrendingUp, DollarSign, Activity, Building2 } from 'lucide-react';
import { IResumenIngresos } from '../../interfaces/Ingreso';

interface IncomesSummaryProps {
  resumen: IResumenIngresos | null;
  loading: boolean;
  inmuebleSeleccionado?: { id: string; nombre: string } | null;
}

const IncomesSummary: React.FC<IncomesSummaryProps> = ({
  resumen,
  loading,
  inmuebleSeleccionado
}) => {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-card rounded-[1rem] shadow-sm border border-gray-100 dark:border-border p-6 mb-6 animate-pulse flex flex-col md:flex-row gap-6 h-[220px]">
        <div className="flex-1 bg-gray-200 dark:bg-muted/60 rounded-xl hidden md:block"></div>
        <div className="flex-1 grid grid-cols-2 gap-4">
          <div className="bg-gray-100 dark:bg-muted/40 rounded-xl h-full"></div>
          <div className="bg-gray-100 dark:bg-muted/40 rounded-xl h-full"></div>
        </div>
      </div>
    );
  }

  if (!resumen) {
    return (
      <div className="bg-white dark:bg-card rounded-[1rem] shadow-sm border border-gray-100 dark:border-border p-8 mb-6 text-center">
        <p className="text-gray-500 dark:text-muted-foreground font-medium">No hay datos disponibles para esta fecha</p>
      </div>
    );
  }

  const titulo = inmuebleSeleccionado
    ? `Ingresos - ${inmuebleSeleccionado.nombre}`
    : 'Ingresos - Todos los Inmuebles';

  return (
    <div className="space-y-4 mb-6">
      {/* Master Card Container */}
      <div className="bg-tourism-navy dark:bg-card rounded-[1rem] p-6 text-white shadow-sm border border-transparent dark:border-border relative overflow-hidden flex flex-col md:flex-row gap-6">

        {/* Left Section (Total Incomes) */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="h-5 w-5 text-gray-300 dark:text-gray-400" />
            <p className="text-sm font-medium text-gray-300 dark:text-gray-400">
              {titulo}
            </p>
          </div>
          <div className="mt-auto pt-6">
            <h3 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              {resumen ? formatCurrency(resumen.total_ingresos) : formatCurrency(0)}
            </h3>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded text-[13px] font-bold bg-[#dcfce7] text-[#15803d] dark:bg-green-900/50 dark:text-green-400">
              <TrendingUp className="w-4 h-4" />
              Total Ingresado
            </span>
          </div>
        </div>

        {/* Right Section (Stats Cards) */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Card 1: Cantidad Ingresos */}
          <div className="bg-white dark:bg-[#1e293b] rounded-xl p-5 flex flex-col justify-between text-gray-900 dark:text-white shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Cantidad Ingresos
              </p>
              <div className="p-2 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                <Activity className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h4 className="text-3xl font-bold mb-3 text-tourism-navy dark:text-white">{resumen?.cantidad_ingresos || 0}</h4>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-gray-100 text-gray-600 dark:bg-muted/50 dark:text-gray-400">
                En el periodo
              </span>
            </div>
          </div>

          {/* Card 2: Promedio por Ingreso */}
          <div className="bg-white dark:bg-[#1e293b] rounded-xl p-5 flex flex-col justify-between text-gray-900 dark:text-white shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Promedio
              </p>
              <div className="p-2 rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-3 truncate text-indigo-600 dark:text-indigo-400 pr-2">
                {resumen?.cantidad_ingresos && resumen.cantidad_ingresos > 0
                  ? formatCurrency(resumen.total_ingresos / resumen.cantidad_ingresos)
                  : formatCurrency(0)}
              </h4>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-gray-100 text-gray-600 dark:bg-muted/50 dark:text-gray-400">
                Por transacción
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Desglose por inmuebles (solo si no hay filtro específico) */}
      {!inmuebleSeleccionado && resumen.ingresos_por_inmueble && resumen.ingresos_por_inmueble.length > 0 && (
        <div className="bg-white dark:bg-card rounded-[1rem] shadow-sm border border-gray-100 dark:border-border p-5">
          <h3 className="text-md font-semibold text-gray-800 dark:text-foreground mb-4">Desglose por Inmueble</h3>
          <div className="space-y-3">
            {resumen.ingresos_por_inmueble?.map((inmueble) => (
              <div key={inmueble.id_inmueble} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-muted/30 rounded-[0.75rem] border border-gray-100 dark:border-border/50">
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">{inmueble.nombre_inmueble}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{inmueble.cantidad_ingresos} ingresos</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600 dark:text-green-500">{formatCurrency(inmueble.total_ingresos)}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {inmueble.cantidad_ingresos > 0
                      ? formatCurrency(inmueble.total_ingresos / inmueble.cantidad_ingresos)
                      : 'N/A'
                    } promedio
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IncomesSummary;