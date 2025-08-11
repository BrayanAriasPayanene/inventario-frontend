// src/components/Layout.jsx
import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md hidden md:block">
        <div className="p-4 text-2xl font-bold border-b dark:border-gray-700">
          Inventario
        </div>
        <nav className="p-4 space-y-2">
          <button className="block w-full text-left px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            Dashboard
          </button>
          <button className="block w-full text-left px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            Productos
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Panel de Inventario</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Nuevo Producto
          </button>
        </header>

        {/* Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
