export type EstadoTarjeta =
  | 'pendiente'
  | 'enviado'
  | 'confirmado'
  | 'error'
  | 'reintento';


export interface PayloadTarjeta {
    tipo_identificacion: string;
    numero_identificacion: string;
    nombres: string;
    apellidos: string;
    ciudad_residencia: string;
    ciudad_procedencia: string;
    motivo: string;
    numero_habitacion: string;
    tipo_acomodacion: string;
    nombre_establecimiento: string;
    rnt_establecimiento: string;
    costo: number;
    check_in: string;
    check_out: string;
}
export interface ResponseTarjeta {
    isError: boolean;
    data?: unknown;
    message: string;
}

export interface TarjetaRegistro {
    id: number;
    id_reserva: number;
    id_huesped: number;
    id_inmueble: number;

    estado: EstadoTarjeta;
    fecha: string;
    intentos: number;
    ultimo_error: string | null;

    payload: PayloadTarjeta;
    respuesta_tra: Record<string, unknown> | null;

    created_at: string;
    updated_at: string;
}

export interface TarjetaResponse {
    isError: boolean;
    data: TarjetaRegistro[];
    message: string;
}

export interface GetTarjetaQuery {
  id?: number;
  id_reserva?: number;
  id_huesped?: number;
  id_inmueble?: number;
  estado?: EstadoTarjeta;
  fecha?: string;
}
export interface EditTarjeta {
  id: number;
  payload?: Partial<PayloadTarjeta>;
  estado?: EstadoTarjeta;
  intentos?: number;
  ultimo_error?: string | null;
  respuesta_tra?: unknown;
}
