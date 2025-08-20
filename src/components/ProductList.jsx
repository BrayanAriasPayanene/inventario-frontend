// src/components/ProductList.jsx
import React, { useEffect, useState } from "react";

export default function ProductList({ reload, onEditar, onEliminar }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/productos/")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error cargando productos:", err));
  }, [reload]);

  const handleEditar = (e, producto) => {
    e.preventDefault();
    e.stopPropagation();
    onEditar(producto);
  };

  const handleEliminar = (e, producto) => {
    e.preventDefault();
    e.stopPropagation();
    // 🔹 Aquí mandamos el producto al padre (Inventario.jsx)
    if (onEliminar) {
      onEliminar(producto);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 px-6">
      {productos.map((producto) => (
        <div
          key={producto.id}
          className="relative bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition"
        >
          {/* Imagen */}
          <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-700 h-48">
            {producto.imagen_url ? (
              <img
                src={producto.imagen_url}
                alt={producto.nombre}
                className="w-28 h-auto object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/fallback.jpg"; // opcional
                }}
              />
            ) : (
              <span className="text-gray-400 italic">Sin imagen</span>
            )}
          </div>

          {/* Información */}
          <div className="p-4 text-center">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {producto.nombre}
            </h3>

            {/* Precio */}
            <p className="text-xl font-semibold text-red-600">
              ${Number(producto.precio).toLocaleString()}
            </p>

            {/* Botones */}
            <div className="mt-4 flex flex-col gap-2">
              <button className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                Añadir al carrito
              </button>
              <div className="flex justify-center gap-6 relative z-10">
                <button
                  onClick={(e) => handleEditar(e, producto)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Editar
                </button>
                <button
                  onClick={(e) => handleEliminar(e, producto)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
