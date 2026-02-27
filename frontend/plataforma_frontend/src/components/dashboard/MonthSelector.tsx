import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface MonthSelectorProps {
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({ selectedMonth, setSelectedMonth }) => {
  const months = [
    { value: -1, label: 'Todos los meses' },
    { value: 0, label: 'Enero' },
    { value: 1, label: 'Febrero' },
    { value: 2, label: 'Marzo' },
    { value: 3, label: 'Abril' },
    { value: 4, label: 'Mayo' },
    { value: 5, label: 'Junio' },
    { value: 6, label: 'Julio' },
    { value: 7, label: 'Agosto' },
    { value: 8, label: 'Septiembre' },
    { value: 9, label: 'Octubre' },
    { value: 10, label: 'Noviembre' },
    { value: 11, label: 'Diciembre' },
  ];

  return (
    <div className="flex items-center space-x-2">
      <Select value={String(selectedMonth)} onValueChange={(val) => setSelectedMonth(parseInt(val, 10))}>
        <SelectTrigger className="w-full min-w-[160px] border-gray-200 dark:border-border dark:bg-background dark:text-foreground focus:ring-waiwa-amber h-10">
          <SelectValue placeholder="Mes" />
        </SelectTrigger>
        <SelectContent>
          {months.map((month) => (
            <SelectItem key={month.value} value={String(month.value)}>
              {month.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default MonthSelector;
