// src/pages/Inventario.jsx
import React, { useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import { FaPlus, FaTimes, FaTrash } from "react-icons/fa";

export default function Inventario() {
  const [reload, setReload] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  const handleProductoAgregado = () => {
    setReload(!reload);
    setMostrarFormulario(false);
    setProductoAEditar(null);
  };

  const confirmarEliminacion = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/productos/${productoAEliminar.id}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        setReload(!reload);
        alert(`✅ Producto "${productoAEliminar.nombre}" eliminado correctamente`);
      } else {
        const data = await res.json();
        alert(`❌ Error eliminando: ${data.error}`);
      }
    } catch (error) {
      console.error("Error eliminando producto:", error);
      alert("❌ Error de conexión con el servidor.");
    } finally {
      setProductoAEliminar(null);
    }
  };

  return (
    <div className="pt-2 px-6">
      <h1 className="flex flex-col items-center mt-[1rem]">Inventario</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-2x1">
        Administra todos los productos de tu inventario de manera rápida y sencilla.
      </p>

      {/* Botón para mostrar/ocultar formulario */}
      <div className="flex justify-center">
        <button
          onClick={() => {
            setMostrarFormulario(!mostrarFormulario);
            if (mostrarFormulario) setProductoAEditar(null);
          }}
          className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition duration-200"
        >
          {mostrarFormulario ? <FaTimes /> : <FaPlus />}
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
          onEliminar={(producto) => setProductoAEliminar(producto)} // <- pasa el producto
        />
      </div>

      {/* Modal de confirmación */}
      {productoAEliminar && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-96 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-bold mb-4 text-red-500">
              Confirmar eliminación
            </h2>
            <p className="mb-2 text-gray-700 dark:text-gray-300">
              ¿Seguro que quieres eliminar el producto{" "}
              <span className="font-semibold">{productoAEliminar.nombre}</span>?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setProductoAEliminar(null)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarEliminacion}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                <FaTrash /> Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
