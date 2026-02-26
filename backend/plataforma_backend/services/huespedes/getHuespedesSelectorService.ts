import { HuespedesRepository } from '../../repositories/huespedes.repository';

interface GetHuespedesParams {
    id_roles: number;
    empresaId?: number;
}

export const getHuespedesSelectorService = async (params: GetHuespedesParams) => {
    const { id_roles, empresaId } = params;

    try {
        const repo = new HuespedesRepository();

        // Si no es superadmin (rol 1), filtrar por empresa
        if (id_roles !== 1) {
            if (!empresaId) {
                return { error: { status: 400, message: 'Empresa ID es requerido para este usuario' } };
            }
            const data = await repo.findAll(empresaId);
            return { data };
        }

        const data = await repo.findAll();
        return { data };
    } catch (error) {
        console.error('Error en getHuespedesSelectorService:', error);
        return { error: { status: 500, message: 'Error al obtener huéspedes para selector', details: error } };
    }
};
