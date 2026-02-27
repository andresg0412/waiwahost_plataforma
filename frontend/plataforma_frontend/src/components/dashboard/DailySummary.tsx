import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';
import { IResumenDiario } from '../../interfaces/Movimiento';

interface DailySummaryProps {
  resumen: IResumenDiario | null;
  loading: boolean;
}

const DailySummary: React.FC<DailySummaryProps> = ({ resumen, loading }) => {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white dark:bg-card border border-gray-100 dark:border-border rounded-[1rem] p-5 shadow-sm flex flex-col justify-between h-[140px] animate-pulse">
            <div className="flex justify-between items-start">
              <div className="h-8 bg-gray-200 dark:bg-muted/60 rounded w-1/2"></div>
              <div className="h-10 w-10 bg-gray-200 dark:bg-muted/60 rounded-full"></div>
            </div>
            <div className="h-4 bg-gray-200 dark:bg-muted/60 rounded w-1/3 mt-2"></div>
            <div className="flex items-center gap-2 mt-4">
              <div className="h-5 bg-gray-200 dark:bg-muted/60 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-muted/60 rounded w-1/3"></div>
            </div>
          </div>
        ))}
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

  const balanceColor = resumen.balance >= 0 ? 'text-green-600' : 'text-red-600';
  const balanceIcon = resumen.balance >= 0 ? TrendingUp : TrendingDown;
  const BalanceIcon = balanceIcon;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
      {/* Balance */}
      <div className="bg-white dark:bg-card rounded-[1rem] p-5 shadow-sm border border-gray-100 dark:border-border flex flex-col hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <h3 className={`text-2xl xl:text-3xl font-bold truncate pr-2 ${balanceColor}`}>
            {formatCurrency(resumen.balance)}
          </h3>
          <div className="p-2.5 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400 shrink-0">
            <DollarSign className="w-5 h-5 xl:w-6 xl:h-6" />
          </div>
        </div>
        <p className="text-sm font-medium text-gray-500 dark:text-muted-foreground mt-1">
          Balance
        </p>
        <div className="flex items-center gap-2 mt-4">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] uppercase tracking-wider font-bold ${resumen.balance >= 0
              ? 'bg-[#dcfce7] text-[#15803d] dark:bg-green-900/30 dark:text-green-400'
              : 'bg-[#fee2e2] text-[#b91c1c] dark:bg-red-900/30 dark:text-red-400'
            }`}>
            <BalanceIcon className="w-3 h-3" />
            {resumen.balance >= 0 ? 'Positivo' : 'Negativo'}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">estado actual</span>
        </div>
      </div>

      {/* Total Ingresos */}
      <div className="bg-white dark:bg-card rounded-[1rem] p-5 shadow-sm border border-gray-100 dark:border-border flex flex-col hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <h3 className="text-2xl xl:text-3xl font-bold text-gray-900 dark:text-foreground truncate pr-2">
            {formatCurrency(resumen.total_ingresos)}
          </h3>
          <div className="p-2.5 rounded-full bg-green-50 text-green-600 dark:bg-green-900/40 dark:text-green-400 shrink-0">
            <TrendingUp className="w-5 h-5 xl:w-6 xl:h-6" />
          </div>
        </div>
        <p className="text-sm font-medium text-gray-500 dark:text-muted-foreground mt-1">
          Total Ingresos
        </p>
        <div className="flex items-center gap-2 mt-4">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] uppercase tracking-wider font-bold bg-[#dcfce7] text-[#15803d] dark:bg-green-900/30 dark:text-green-400">
            <TrendingUp className="w-3 h-3" />
            Ingresos
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">en el periodo</span>
        </div>
      </div>

      {/* Total Egresos */}
      <div className="bg-white dark:bg-card rounded-[1rem] p-5 shadow-sm border border-gray-100 dark:border-border flex flex-col hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <h3 className="text-2xl xl:text-3xl font-bold text-gray-900 dark:text-foreground truncate pr-2">
            {formatCurrency(resumen.total_egresos)}
          </h3>
          <div className="p-2.5 rounded-full bg-red-50 text-red-600 dark:bg-red-900/40 dark:text-red-400 shrink-0">
            <TrendingDown className="w-5 h-5 xl:w-6 xl:h-6" />
          </div>
        </div>
        <p className="text-sm font-medium text-gray-500 dark:text-muted-foreground mt-1">
          Total Egresos
        </p>
        <div className="flex items-center gap-2 mt-4">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] uppercase tracking-wider font-bold bg-[#fee2e2] text-[#b91c1c] dark:bg-red-900/30 dark:text-red-400">
            <TrendingDown className="w-3 h-3" />
            Egresos
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">en el periodo</span>
        </div>
      </div>

      {/* Cantidad de Movimientos */}
      <div className="bg-white dark:bg-card rounded-[1rem] p-5 shadow-sm border border-gray-100 dark:border-border flex flex-col hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <h3 className="text-2xl xl:text-3xl font-bold text-gray-900 dark:text-foreground truncate pr-2">
            {resumen.cantidad_movimientos}
          </h3>
          <div className="p-2.5 rounded-full bg-purple-50 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400 shrink-0">
            <Activity className="w-5 h-5 xl:w-6 xl:h-6" />
          </div>
        </div>
        <p className="text-sm font-medium text-gray-500 dark:text-muted-foreground mt-1">
          Movimientos
        </p>
        <div className="flex items-center gap-2 mt-4">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] uppercase tracking-wider font-bold bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
            <Activity className="w-3 h-3" />
            Total
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">registrados</span>
        </div>
      </div>
    </div>
  );
};

export default DailySummary;