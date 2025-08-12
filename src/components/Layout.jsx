// src/components/Layout.jsx
import React, { useState, useEffect } from 'react';

export default function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-gray-800 shadow-md p-4">
        <nav className="p-4 space-y-2">
        </nav>
        {/* Botón para cambiar de modo oscuro/claro */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="mt-4 w-full text-left px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          {darkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
        </button>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}