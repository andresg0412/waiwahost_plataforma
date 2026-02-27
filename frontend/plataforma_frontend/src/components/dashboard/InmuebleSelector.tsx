import React from 'react';
import { Inmueble } from '../../interfaces/Inmueble';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface InmuebleSelectorProps {
  inmuebles: Inmueble[];
  selectedInmueble: number;
  setSelectedInmueble: (id: number) => void;
}

const InmuebleSelector: React.FC<InmuebleSelectorProps> = ({
  inmuebles,
  selectedInmueble,
  setSelectedInmueble,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Select value={String(selectedInmueble)} onValueChange={(val) => setSelectedInmueble(Number(val))}>
        <SelectTrigger className="w-full min-w-[160px] border-gray-200 dark:border-border dark:bg-background dark:text-foreground focus:ring-waiwa-amber h-10">
          <SelectValue placeholder="Filtro Inmuebles" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="-1">Todos los inmuebles</SelectItem>
          {inmuebles.map((inmueble) => (
            <SelectItem key={inmueble.id} value={String(inmueble.id)}>
              {inmueble.nombre}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default InmuebleSelector;
