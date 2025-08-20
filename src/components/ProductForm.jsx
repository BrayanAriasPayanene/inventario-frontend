// src/components/ProductForm.jsx
import React, { useState, useEffect } from "react";
import {
  FaBox,
  FaTags,
  FaDollarSign,
  FaWarehouse,
  FaImage,
  FaInfoCircle,
  FaSave,
} from "react-icons/fa";

export default function ProductForm({ onProductoAgregado, productoAEditar }) {
  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    cantidad: "",
    descripcion: "",
    imagen_url: "",
  });

  useEffect(() => {
    if (productoAEditar) {
      setFormData({
        nombre: productoAEditar.nombre || "",
        categoria: productoAEditar.categoria || "",
        precio: productoAEditar.precio || "",
        cantidad: productoAEditar.cantidad || "",
        descripcion: productoAEditar.descripcion || "",
        imagen_url: productoAEditar.imagen_url || "",
      });
    } else {
      setFormData({
        nombre: "",
        categoria: "",
        precio: "",
        cantidad: "",
        descripcion: "",
        imagen_url: "",
      });
    }
  }, [productoAEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEditing = !!productoAEditar;
    const url = isEditing
      ? `http://localhost:8000/api/productos/${productoAEditar.id}`
      : "http://localhost:8000/api/productos";
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        onProductoAgregado();
      } else {
        console.error("Error en la petición:", res.status);
      }
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 backdrop-blur"
    >
      <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800 dark:text-white">
        {productoAEditar ? "✏️ Editar producto" : "➕ Agregar nuevo producto"}
      </h2>

      <div className="space-y-4">
        {/* Nombre */}
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
          <span className="p-3 text-gray-600 dark:text-gray-300"><FaBox /></span>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del producto"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full p-3 outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            required
          />
        </div>
        
        {/* Categoria */}
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
          <span className="p-3 text-gray-600 dark:text-gray-300"><FaTags /></span>
          <input
            type="text"
            name="categoria"
            placeholder="Categoría"
            value={formData.categoria}
            onChange={handleChange}
            className="w-full p-3 outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            required
          />
        </div>

        {/* Precio */}
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
          <span className="p-3 text-gray-600 dark:text-gray-300"><FaDollarSign /></span>
          <input
            type="number"
            name="precio"
            placeholder="Precio"
            value={formData.precio}
            onChange={handleChange}
            className="w-full p-3 outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            required
            step="0.01"
          />
        </div>
        
        {/* Cantidad */}
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
          <span className="p-3 text-gray-600 dark:text-gray-300"><FaWarehouse /></span>
          <input
            type="number"
            name="cantidad"
            placeholder="Cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            className="w-full p-3 outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            required
          />
        </div>

        {/* URL de la Imagen */}
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
          <span className="p-3 text-gray-600 dark:text-gray-300"><FaImage /></span>
          <input
            type="text"
            name="imagen_url"
            placeholder="URL de la imagen"
            value={formData.imagen_url}
            onChange={handleChange}
            className="w-full p-3 outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </div>

        {/* Previsualización */}
        {formData.imagen_url && (
          <img
            src={formData.imagen_url}
            alt="Previsualización"
            className="mt-2 rounded-lg shadow-md w-full h-48 object-cover"
          />
        )}
        
        {/* Descripción */}
        <div className="flex items-start border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-purple-500">
          <span className="p-3 text-gray-600 dark:text-gray-300"><FaInfoCircle /></span>
          <textarea
            name="descripcion"
            placeholder="Descripción (opcional)"
            value={formData.descripcion}
            onChange={handleChange}
            className="w-full p-3 outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-300"
            rows="3"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-3 rounded-lg hover:opacity-90 transition-all duration-300 font-semibold shadow-md flex items-center justify-center gap-2"
      >
        <FaSave /> {productoAEditar ? "Guardar cambios" : "Añadir producto"}
      </button>
    </form>
  );
}