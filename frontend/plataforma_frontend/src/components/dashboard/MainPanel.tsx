'use client';

import React from 'react';
import Availability from './Availability';
import { useAuth } from '../../auth/AuthContext';

const MainPanel: React.FC = () => {
  const { user } = useAuth();

  // Fecha actual formateada en español
  const today = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = today.toLocaleDateString('es-ES', dateOptions);

  // Intentamos obtener apellido si viene en el payload aunque no esté en la interfaz inicial
  const apellido = (user as any)?.apellido ? ` ${(user as any).apellido}` : '';

  return (
    <div>
      <h2 className="text-2xl font-bold text-waiwa-forest dark:text-waiwa-amber mb-2">
        Hola, Bienvenido {user?.nombre || 'Usuario'}
      </h2>
      <p className="text-gray-500 dark:text-gray-500 text-sm capitalize">
        {formattedDate}
      </p>
      <p className="text-black dark:text-white text-sm font-mono">{user?.email }</p>
      <div className="mt-8">
        <Availability />
      </div>
    </div>
  );
};

export default MainPanel;
