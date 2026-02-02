export interface IPayloadTarjeta {
	costo: string, f
	motivo: string, f
	nombres: string, f
	check_in: string, f
	apellidos: string, f
	check_out: string, f
	tipo_acomodacion: string,
	cuidad_residencia: string,
	numero_habitacion: string,
	cuidad_procedencia: string,
	numero_acompanantes: number,
	rnt_establecimiento: number,
	tipo_identificacion: string, f
	numero_identificacion: number,
	nombre_establecimiento: string
}

export interface ITarjeta {
    id: number,
	id_reserva: number,
	id_huesped: number,
	id_inmueble: number,
	estado: string,
	fecha: string,
	intentos: number,
	ultimo_error: string | null,
	payload: IPayloadTarjeta,
	respuesta_tra: Record<string, unknown> | null,
	created_at: string,
	updated_at: string
}

export interface IEstadoTarjetaResponse {
    id: number,
	id_reserva: number,
	id_inmueble: number,
	estado: string,
	intentos: number,
	fecha: string,
	updated_at: string
}

export interface ITarjetaResponseApi {
    isError: boolean;
    data: ITarjeta[];
    message: string;
}
export interface IEstadoTarjetaResponseApi {
    isError: boolean;
    data: IEstadoTarjetaResponse[];
    message: string;
}

    
