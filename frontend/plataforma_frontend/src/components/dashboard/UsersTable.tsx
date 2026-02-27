import React from 'react';
import { useAuth } from '../../auth/AuthContext';
import UserRow from './UserRow';

export interface IDataUserIn {
  id: string;
  cedula: string;
  nombre: string;
  apellido: string;
  username: string;
  email: string;
  rol: string;
  empresa: string;
  estado: string;
}

interface UsersTableProps {
  users: IDataUserIn[];
  onEdit: (user: IDataUserIn) => void;
  onDelete: (user: IDataUserIn) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, onEdit, onDelete }) => {
  const { user } = useAuth();
  const canDelete = user?.permisos?.includes('eliminar_usuarios');
  return (
    <div className="rounded-[1rem] border border-gray-100 dark:border-border overflow-hidden bg-white dark:bg-card shadow-sm w-full">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-sm text-left relative">
          <thead className="bg-waiwa-sky dark:bg-waiwa-amber text-[#64748b] dark:text-muted-foreground text-[13px] font-semibold border-b border-gray-100 dark:border-border">
            <tr>
              <th className="px-5 py-4 whitespace-nowrap font-medium dark:text-black">Cédula</th>
              <th className="px-5 py-4 whitespace-nowrap font-medium dark:text-black">Nombre</th>
              <th className="px-5 py-4 whitespace-nowrap font-medium dark:text-black">Apellido</th>
              <th className="px-5 py-4 whitespace-nowrap font-medium dark:text-black">Username</th>
              <th className="px-5 py-4 whitespace-nowrap font-medium dark:text-black">Email</th>
              <th className="px-5 py-4 whitespace-nowrap font-medium dark:text-black">Rol</th>
              <th className="px-5 py-4 whitespace-nowrap font-medium dark:text-black">Empresa</th>
              <th className="px-5 py-4 whitespace-nowrap font-medium dark:text-black text-center">Estado</th>
              <th className="px-5 py-4 whitespace-nowrap dark:text-black font-medium text-center sticky right-0 bg-waiwa-sky dark:bg-waiwa-amber shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.05)] border-l border-gray-100 dark:border-border z-10 w-[120px]">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-border/50 bg-white dark:bg-card">
            {users.map(userRow => (
              <UserRow
                key={userRow.id}
                cedula={userRow.cedula}
                nombre={userRow.nombre}
                apellido={userRow.apellido}
                username={userRow.username}
                email={userRow.email}
                rol={userRow.rol}
                empresa={userRow.empresa}
                estado={userRow.estado}
                onEdit={() => onEdit(userRow)}
                onDelete={() => onDelete(userRow)}
                canDelete={!!canDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
