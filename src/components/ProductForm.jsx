import React, { useState } from 'react';

export default function ProductForm({ onProductoAgregado }) {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8000/api/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, categoria, precio, cantidad, descripcion }),
      });

      if (res.ok) {
        const nuevo = await res.json();
        onProductoAgregado(nuevo);
        setNombre('');
        setCategoria('');
        setPrecio('');
        setCantidad('');
        setDescripcion('');
      }
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        📦 Agregar nuevo producto
      </h2>

      {/* Nombre */}
      <input
        type="text"
        placeholder="Nombre del producto"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        required
      />

      {/* Categoría */}
      <input
        type="text"
        placeholder="Categoría"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        required
      />

      {/* Precio */}
      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        required
      />

      {/* Cantidad */}
      <input
        type="number"
        placeholder="Cantidad"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
        className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        required
      />

      {/* Descripción */}
      <textarea
        placeholder="Descripción (opcional)"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        rows="3"
      />

      {/* Botón */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-3 rounded-lg hover:opacity-90 transition-all duration-300 font-semibold shadow-md"
      >
        💾 Guardar Producto
      </button>
    </form>
  );
}
