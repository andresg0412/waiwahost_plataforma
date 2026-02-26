export interface IHuesped {
  id_huesped: number;
  nombre: string;
  apellido: string;
  documento_numero: string;
  email: string;
  telefono: string;
  direccion?: string;
  fecha_nacimiento?: string;
  estado: 'activo' | 'inactivo';
  id_empresa?: number;
  created_at?: string;
  updated_at?: string;
}

// Datos que retorna el selector de huéspedes recurrentes (info básica)
export interface IHuespedSelectorData {
  id_huesped: number;
  nombre: string;
  apellido: string;
  documento_numero: string | null;
}

export interface IHuespedTableData {
  id_huesped: number;
  nombre: string;
  apellido: string;
  documento_numero: string;
  email: string;
  telefono: string;
  estado: 'activo' | 'inactivo';
}

export interface IHuespedEditableFields {
  nombre?: string;
  apellido?: string;
  email?: string;
  telefono?: string;
  direccion?: string;
  fecha_nacimiento?: string;
  estado?: 'activo' | 'inactivo';
  id_empresa?: number;
}

// Datos completos de un huésped (incluyendo info de su última reserva)
export interface IHuespedDetailData {
  id_huesped: number;
  nombre: string;
  apellido: string;
  documento_numero?: string | null;
  documento_tipo?: string | null;
  email?: string | null;
  telefono?: string | null;
  fecha_nacimiento?: string | null;
  ciudad_residencia?: string | null;
  ciudad_procedencia?: string | null;
  motivo?: string | null;
  pais_residencia?: string | number | null;
  pais_procedencia?: string | number | null;
}