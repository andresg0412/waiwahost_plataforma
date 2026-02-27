import React from 'react';
import { Building2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface InmuebleOption {
  id: string;
  nombre: string;
}

interface PropertySelectorProps {
  inmuebles: InmuebleOption[];
  selectedInmueble: InmuebleOption | null;
  onInmuebleChange: (inmueble: InmuebleOption | null) => void;
  loading?: boolean;
}

const PropertySelector: React.FC<PropertySelectorProps> = ({
  inmuebles,
  selectedInmueble,
  onInmuebleChange,
  loading = false
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value === '') {
      onInmuebleChange(null);
    } else {
      const inmueble = inmuebles.find(inm => inm.id === value);
      if (inmueble) {
        onInmuebleChange(inmueble);
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-card rounded-[1rem] shadow-sm border border-gray-100 dark:border-border p-4">
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          <div className="h-4 bg-gray-200 dark:bg-muted/60 rounded w-32 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-card p-4 rounded-[1rem] shadow-sm border border-gray-100 dark:border-border">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-tourism-navy dark:text-foreground" />
          <label className="text-sm font-medium text-tourism-navy dark:text-foreground">
            Filtrar por Inmueble:
          </label>
        </div>

        <Select
          value={selectedInmueble?.id || "todos"}
          onValueChange={(value) => {
            if (value === "todos") {
              onInmuebleChange(null);
            } else {
              const inmueble = inmuebles.find(inm => inm.id === value);
              if (inmueble) onInmuebleChange(inmueble);
            }
          }}
        >
          <SelectTrigger className="w-full sm:w-[260px] border-gray-200 dark:border-border bg-white dark:bg-muted/40 text-gray-700 dark:text-gray-200 focus:ring-tourism-teal focus:border-tourism-teal">
            <SelectValue placeholder="Todos los inmuebles" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-card border-gray-100 dark:border-border shadow-md">
            <SelectItem value="todos" className="focus:bg-gray-50 dark:focus:bg-muted/50 focus:text-tourism-teal dark:focus:text-tourism-teal cursor-pointer">
              Todos los inmuebles
            </SelectItem>
            {inmuebles.map((inmueble) => (
              <SelectItem key={inmueble.id} value={inmueble.id} className="focus:bg-gray-50 dark:focus:bg-muted/50 focus:text-tourism-teal dark:focus:text-tourism-teal cursor-pointer">
                {inmueble.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedInmueble && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-100 dark:border-blue-900/30">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            Mostrando información para: <span className="font-semibold">{selectedInmueble.nombre}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default PropertySelector;