import dbClient from '../libs/db';

export class HuespedesRepository {
    /**
     * Obtiene solo la información básica de todos los huéspedes registrados.
     * Útil para los selectores de huéspedes.
     */
    async findAll(empresaId?: number): Promise<any[]> {
        let query = `
      SELECT DISTINCT
        h.id_huesped,
        h.nombre,
        h.apellido,
        h.documento_numero
      FROM huespedes h
    `;

        const queryParams: any[] = [];
        const conditions: string[] = [
            "h.nombre IS NOT NULL",
            "TRIM(h.nombre) != ''",
            "h.nombre NOT ILIKE 'sin nombre%'",
            "h.apellido IS NOT NULL",
            "TRIM(h.apellido) != ''",
            "h.apellido NOT ILIKE 'sin apellido%'"
        ];

        if (empresaId) {
            query += `
        INNER JOIN huespedes_reservas hr ON h.id_huesped = hr.id_huesped
        INNER JOIN reservas r ON hr.id_reserva = r.id_reserva
        INNER JOIN inmuebles i ON r.id_inmueble = i.id_inmueble
      `;
            conditions.push("i.id_empresa = $1");
            queryParams.push(empresaId);
        }

        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(' AND ')}`;
        }

        const { rows } = await dbClient.query(query, queryParams);
        return rows;
    }

    /**
     * Obtiene la lista de todos los huéspedes con detalles completos, 
     * incluyendo ciudad de procedencia, residencia y motivo de su última reserva.
     */
    async findAllWithDetails(empresaId?: number): Promise<any[]> {
        // Usamos DISTINCT ON para obtener la información más reciente de la reserva de cada huésped
        let query = `
      SELECT DISTINCT ON (h.id_huesped)
        h.id_huesped,
        h.nombre,
        h.apellido,
        h.documento_numero,
        h.documento_tipo,
        h.email,
        h.telefono,
        h.fecha_nacimiento,
        hr.ciudad_residencia,
        hr.ciudad_procedencia,
        hr.motivo
      FROM huespedes h
      LEFT JOIN huespedes_reservas hr ON h.id_huesped = hr.id_huesped
      LEFT JOIN reservas r ON hr.id_reserva = r.id_reserva
      LEFT JOIN inmuebles i ON r.id_inmueble = i.id_inmueble
    `;

        const queryParams: any[] = [];
        const conditions: string[] = [
            "h.nombre IS NOT NULL",
            "TRIM(h.nombre) != ''",
            "h.nombre NOT ILIKE 'sin nombre%'",
            "h.apellido IS NOT NULL",
            "TRIM(h.apellido) != ''",
            "h.apellido NOT ILIKE 'sin apellido%'"
        ];

        if (empresaId) {
            conditions.push("i.id_empresa = $1");
            queryParams.push(empresaId);
        }

        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(' AND ')}`;
        }

        // Recomendado por DISTINCT ON para obtener el último en tiempo de reserva
        query += ` ORDER BY h.id_huesped, r.created_at DESC NULLS LAST`;

        const { rows } = await dbClient.query(query, queryParams);
        return rows;
    }

    /**
     * Obtiene los detalles completos de un huésped específico por su ID.
     */
    async findById(id: number, empresaId?: number): Promise<any | null> {
        let query = `
      SELECT DISTINCT ON (h.id_huesped)
        h.id_huesped,
        h.nombre,
        h.apellido,
        h.documento_numero,
        h.documento_tipo,
        h.email,
        h.telefono,
        h.fecha_nacimiento,
        hr.ciudad_residencia,
        hr.ciudad_procedencia,
        hr.motivo
      FROM huespedes h
      LEFT JOIN huespedes_reservas hr ON h.id_huesped = hr.id_huesped
      LEFT JOIN reservas r ON hr.id_reserva = r.id_reserva
      LEFT JOIN inmuebles i ON r.id_inmueble = i.id_inmueble
    `;

        const queryParams: any[] = [id];
        const conditions: string[] = ["h.id_huesped = $1"];

        if (empresaId) {
            conditions.push("i.id_empresa = $2");
            queryParams.push(empresaId);
        }

        query += ` WHERE ${conditions.join(' AND ')}`;
        query += ` ORDER BY h.id_huesped, r.created_at DESC NULLS LAST`;

        const { rows } = await dbClient.query(query, queryParams);
        return rows[0] || null;
    }
}
