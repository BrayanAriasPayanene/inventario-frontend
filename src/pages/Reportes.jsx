import React from "react";
import { FaChartLine, FaExclamationTriangle } from "react-icons/fa";

export default function Reportes() {
  return (
    <div className="flex flex-col items-center justify-start pt-12 pb-8 px-8 bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      {/* Título */}
      <h1 className="text-4xl font-extrabold mb-4 text-gray-800 dark:text-white">
        Reportes
      </h1>

      {/* Descripción */}
      <p className="text-gray-600 dark:text-gray-300 text-lg text-center max-w-2xl">
        Visualiza reportes y estadísticas sobre tu inventario y ventas.
      </p>

      {/* Tarjetas */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl overflow-hidden">

        {/* Ventas Mensuales */}
        <div className="relative">
          <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 
            transform-gpu will-change-transform transition-transform duration-300 hover:scale-105 hover:z-10">
            <FaChartLine className="text-blue-600 dark:text-blue-400 text-5xl mb-4" />
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              Ventas Mensuales
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Aquí se mostrará un gráfico con las ventas de cada mes.
            </p>
          </div>
        </div>

        {/* Stock Bajo */}
        <div className="relative">
          <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 
            transform-gpu will-change-transform transition-transform duration-300 hover:scale-105 hover:z-10">
            <FaExclamationTriangle className="text-yellow-500 dark:text-yellow-400 text-5xl mb-4" />
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              Stock Bajo
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Listado de productos que necesitan reposición.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
