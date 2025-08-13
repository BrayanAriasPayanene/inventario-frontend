// src/pages/Inventario.jsx
import React, { useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import { FaPlus, FaTimes, FaTrash, FaEdit } from "react-icons/fa";

export default function Inventario() {
  const [reload, setReload] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Estados para modales
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  return (
    <div className="p-6">
      <h1 className="flex flex-col items-center mt-10 space-y-6">
        Inventario
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-2xl">
        Administra todos los productos de tu inventario de manera rápida y sencilla.
      </p>

      {/* Botón añadir producto */}
    <div className="flex justify-center">
    <button
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
        className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition duration-200"
    >
        {mostrarFormulario ? <FaTimes /> : <FaPlus />}
        {mostrarFormulario ? "Cerrar formulario" : "Añadir producto"}
    </button>
    </div>

      {/* Formulario para añadir/editar producto */}
      {mostrarFormulario && (
        <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <ProductForm
            producto={productoAEditar}
            onProductoAgregado={() => {
              setReload(!reload);
              setMostrarFormulario(false);
              setProductoAEditar(null);
            }}
          />
        </div>
      )}

      {/* Lista de productos */}
      <div className="mt-6">
        <ProductList
          reload={reload}
          onEditar={(producto) => {
            setProductoAEditar(producto);
            setMostrarFormulario(true);
          }}
          onEliminar={(producto) => setProductoAEliminar(producto)}
        />
      </div>

      {/* Modal de confirmación de eliminación */}
      {productoAEliminar && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-96 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-bold mb-4 text-red-500">
              Confirmar eliminación
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              ¿Estás seguro de que quieres eliminar el producto{" "}
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
                onClick={async () => {
                  try {
                    await fetch(`http://localhost:3001/api/productos/${productoAEliminar.id}`, {
                      method: "DELETE",
                    });
                    setReload(!reload);
                    setProductoAEliminar(null);
                  } catch (error) {
                    console.error("Error eliminando producto:", error);
                  }
                }}
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
