import { HuespedesRepository } from '../../repositories/huespedes.repository';

interface GetHuespedByIdParams {
    id: number;
    id_roles: number;
    empresaId?: number;
}

export const getHuespedByIdService = async (params: GetHuespedByIdParams) => {
    const { id, id_roles, empresaId } = params;

    try {
        const repo = new HuespedesRepository();
        let data;

        // Si no es superadmin (rol 1), filtrar por empresa
        if (id_roles !== 1) {
            if (!empresaId) {
                return { error: { status: 400, message: 'Empresa ID es requerido para este usuario' } };
            }
            data = await repo.findById(id, empresaId);
        } else {
            data = await repo.findById(id);
        }

        if (!data) {
            return { error: { status: 404, message: 'Huésped no encontrado' } };
        }

        return { data };
    } catch (error) {
        console.error('Error en getHuespedByIdService:', error);
        return { error: { status: 500, message: 'Error al obtener huésped', details: error } };
    }
};
