import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaChartBar, FaBoxes, FaBars, FaTimes } from "react-icons/fa";

export default function Layout({ children }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { path: "/", name: "Inicio", icon: <FaHome /> },
    { path: "/reportes", name: "Reportes", icon: <FaChartBar /> },
    { path: "/inventario", name: "Inventario", icon: <FaBoxes /> },
  ];

  return (
    <div
      className="flex min-h-screen text-gray-900 relative"
      style={{
        backgroundImage: "url('/ruta/imagen-fondo.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Botón hamburguesa (solo en móvil) */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 text-white bg-purple-600 p-2 rounded-lg shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Fondo oscuro al abrir el menú en móvil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-gradient-to-b from-purple-600 to-indigo-800 p-5 shadow-xl flex flex-col transform transition-transform duration-300 z-40 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Sistema de Inventario
        </h1>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                location.pathname === item.path
                  ? "bg-purple-500 text-white shadow-md"
                  : "text-purple-100 hover:bg-purple-400 hover:text-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Contenido principal */}
      <main
        className={`flex-1 p-8 bg-white bg-opacity-80 rounded-lg m-4 shadow-lg w-full transition-all duration-300 
          ${sidebarOpen && "blur-sm lg:blur-0"}`}
      >
        {children}
      </main>
    </div>
  );
}
