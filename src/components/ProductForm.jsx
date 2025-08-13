import React, { useState } from "react";
import { FaBox, FaTags, FaDollarSign, FaWarehouse, FaImage, FaInfoCircle, FaSave } from "react-icons/fa";

export default function ProductForm({ onProductoAgregado }) {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          categoria,
          precio,
          cantidad,
          descripcion,
          imagen_url: imagenUrl,
        }),
      });

      if (res.ok) {
        const nuevo = await res.json();
        onProductoAgregado(nuevo);
        setNombre("");
        setCategoria("");
        setPrecio("");
        setCantidad("");
        setDescripcion("");
        setImagenUrl("");
      }
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  const InputGroup = ({ icon, type, placeholder, value, onChange }) => (
    <div className="flex items-center bg-white/90 border border-gray-300 rounded-lg overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
      <span className="p-3 text-gray-600">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-3 outline-none bg-transparent text-gray-700"
        required={type !== "text" || placeholder !== "Descripción (opcional)"}
      />
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-8 bg-white/95 rounded-2xl shadow-xl border border-gray-200 backdrop-blur"
    >
      <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
        ➕ Agregar nuevo producto
      </h2>

      <div className="space-y-4">
        <InputGroup
          icon={<FaBox />}
          type="text"
          placeholder="Nombre del producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <InputGroup
          icon={<FaTags />}
          type="text"
          placeholder="Categoría"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />
        <InputGroup
          icon={<FaDollarSign />}
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
        <InputGroup
          icon={<FaWarehouse />}
          type="number"
          placeholder="Cantidad"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />
        <InputGroup
          icon={<FaImage />}
          type="text"
          placeholder="URL de la imagen (opcional)"
          value={imagenUrl}
          onChange={(e) => setImagenUrl(e.target.value)}
        />

        <div className="flex items-start bg-white/90 border border-gray-300 rounded-lg overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-purple-500">
          <span className="p-3 text-gray-600">
            <FaInfoCircle />
          </span>
          <textarea
            placeholder="Descripción (opcional)"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full p-3 outline-none bg-transparent text-gray-700"
            rows="3"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-3 rounded-lg hover:opacity-90 transition-all duration-300 font-semibold shadow-md flex items-center justify-center gap-2"
      >
        <FaSave /> Guardar Producto
      </button>
    </form>
  );
}
