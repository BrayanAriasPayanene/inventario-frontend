// src/pages/Inventario.jsx
import React, { useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import { FaPlus, FaTimes, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

export default function Inventario() {
  const [reload, setReload] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [mensaje, setMensaje] = useState(null); // ✅ notificación

  const handleProductoAgregado = () => {
    setReload(!reload);
    setMostrarFormulario(false);
    setProductoAEditar(null);
  };

  const confirmarEliminacion = async (producto) => {
    // ✅ Usamos confirmación nativa
    const confirmar = window.confirm(
      `⚠️ ¿Seguro que deseas eliminar el producto "${producto.nombre}"?`
    );

    if (!confirmar) return; // si cancela, no hace nada

    try {
      const res = await fetch(
        `http://localhost:8000/api/productos/${producto.id}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        setReload(!reload);
        setMensaje({
          tipo: "exito",
          texto: `Producto "${producto.nombre}" eliminado correctamente ✅`,
        });
      } else {
        const data = await res.json();
        setMensaje({
          tipo: "error",
          texto: `Error eliminando: ${data.error || "Error desconocido"}`,
        });
      }
    } catch (error) {
      console.error("Error eliminando producto:", error);
      setMensaje({
        tipo: "error",
        texto: "Error de conexión con el servidor ❌",
      });
    } finally {
      // Auto-cierra mensaje después de 3s
      setTimeout(() => setMensaje(null), 3000);
    }
  };

  return (
    <div className="pt-2 px-6">
      <h1 className="flex flex-col items-center mt-[1rem] text-2xl font-bold">Inventario</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-2x1">
        Administra todos los productos de tu inventario de manera rápida y sencilla.
      </p>

      {/* Botón para mostrar/ocultar formulario */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => {
            setMostrarFormulario(!mostrarFormulario);
            if (mostrarFormulario) setProductoAEditar(null);
          }}
          className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition duration-200"
        >
          {mostrarFormulario ? <FaTimes /> : "➕"}
          {mostrarFormulario ? "Cerrar formulario" : "Añadir producto"}
        </button>
      </div>

      {/* Formulario */}
      {mostrarFormulario && (
        <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <ProductForm
            key={productoAEditar ? productoAEditar.id : "nuevo"}
            onProductoAgregado={handleProductoAgregado}
            productoAEditar={productoAEditar}
          />
        </div>
      )}

      {/* Lista de productos */}
      <div className="mt-4">
        <ProductList
          reload={reload}
          onEditar={(producto) => {
            setProductoAEditar(producto);
            setMostrarFormulario(true);
          }}
          onEliminar={(producto) => confirmarEliminacion(producto)} // ✅ directo con confirm
        />
      </div>

      {/* Mensaje flotante */}
      {mensaje && (
        <div
          className={`fixed bottom-6 right-6 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 transition ${
            mensaje.tipo === "exito"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {mensaje.tipo === "exito" ? <FaCheckCircle /> : <FaExclamationTriangle />}
          <span>{mensaje.texto}</span>
        </div>
      )}
    </div>
  );
}
