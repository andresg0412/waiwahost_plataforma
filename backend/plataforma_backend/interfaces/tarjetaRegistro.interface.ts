export interface TarjetaRegistro {
    id: number;
    id_reserva: number;
    id_huesped: number;
    id_inmueble: number;

    estado: 'pendiente'|
            'enviado'|
            'confirmado'|
            'error'|
            'reintento'|
            'pendiente'|
            'enviado'|
            'confirmado'|
            'error'|
            'reintento';
    fecha: string;
    intentos: number;
    ultimo_error: string | null;

    payload: Record<string, any>;
    respuesta_tra: Record<string, any>;

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
  estado?: string;
  fecha?: string;
}

export interface CreateTarjetaRequest {
    id_reserva: number;
    id_huesped: number;
    id_inmueble: number;

    fecha?: string;
}

export interface CreateReservaResponse {
  isError: boolean;
  data: Reserva;
  message: string;
}

export interface EditReservaRequest {
  fecha_inicio?: string;
  fecha_fin?: string;
  numero_huespedes?: number;
  huespedes?: CreateHuespedData[];
  precio_total?: number;
  // Nuevos campos financieros
  total_reserva?: number;
  total_pagado?: number;
  estado?: string;
  observaciones?: string;
  // Campo de plataforma de origen (opcional)
  plataforma_origen?: string;
}
