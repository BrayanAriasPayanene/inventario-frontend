import React from "react";
import { Link } from "react-router-dom";
import { FaBoxes, FaChartBar, FaCogs, FaHandSparkles } from "react-icons/fa";
import fondo from "../assets/fondo.png"; // Cambia el nombre si tu imagen tiene otro

export default function Inicio() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-8 overflow-hidden">
      
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${fondo})` }}
      ></div>

      {/* Capa oscura para contraste */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center text-center text-white drop-shadow-lg">
        
        {/* Ícono de bienvenida */}
        <div className="mb-6 text-yellow-300 animate-bounce">
          <FaHandSparkles size={60} />
        </div>

        {/* Título */}
        <h1 className="text-4xl font-extrabold mb-4">Bienvenido</h1>

        {/* Descripción */}
        <p className="text-gray-200 text-lg max-w-2xl mb-8">
          Este es el panel principal del sistema de inventario. Aquí podrás acceder a la gestión de productos,
          visualizar reportes y administrar toda la información de manera sencilla y rápida.
        </p>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Inventario */}
          <Link
            to="/inventario"
            className="bg-white/95 backdrop-blur-lg rounded-xl shadow-lg p-6 transform hover:scale-110 transition-all duration-300 cursor-pointer text-center"
          >
            <FaBoxes className="text-5xl text-purple-600 mb-4 mx-auto" />
            <h2 className="text-xl font-bold text-gray-800">Inventario</h2>
            <p className="text-gray-600">
              Administra todos los productos y controla el stock disponible.
            </p>
          </Link>

          {/* Reportes */}
          <Link
            to="/reportes"
            className="bg-white/95 backdrop-blur-lg rounded-xl shadow-lg p-6 transform hover:scale-110 transition-all duration-300 cursor-pointer text-center"
          >
            <FaChartBar className="text-5xl text-green-600 mb-4 mx-auto" />
            <h2 className="text-xl font-bold text-gray-800">Reportes</h2>
            <p className="text-gray-600">
              Visualiza reportes detallados sobre las ventas y el inventario.
            </p>
          </Link>

          {/* Configuración */}
          <Link
            to="/configuracion"
            className="bg-white/95 backdrop-blur-lg rounded-xl shadow-lg p-6 transform hover:scale-110 transition-all duration-300 cursor-pointer text-center"
          >
            <FaCogs className="text-5xl text-blue-600 mb-4 mx-auto" />
            <h2 className="text-xl font-bold text-gray-800">Configuración</h2>
            <p className="text-gray-600">
              Personaliza el sistema según tus necesidades.
            </p>
          </Link>

        </div>
      </div>
    </div>
  );
}
