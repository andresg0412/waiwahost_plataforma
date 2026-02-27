import React from 'react';

export const Spinner: React.FC = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center min-h-screen bg-white/40 dark:bg-[#0a1f1a]/50 backdrop-blur-md transition-all">

    <div className="flex flex-col items-center justify-center animate-pulse">
      {/* Círculo con el logo (similar a la referencia) */}
      <div className="w-24 h-24 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0f2d26] shadow-sm flex items-center justify-center mb-4 overflow-hidden">
        <img
          src="/img/Waiwa Host_Logo (15).png"
          alt="Waiwahost"
          className="h-16 w-16 object-contain"
        />
      </div>

      {/* Texto debajo */}
      <p className="text-sm font-medium text-gray-600 dark:text-gray-300 tracking-wide">
        Cargando...
      </p>
    </div>

  </div>
);
