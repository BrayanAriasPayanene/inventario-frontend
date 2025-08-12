import React, { useEffect, useState } from 'react';

export default function ProductList({ reload }) {
  const [productos, setProductos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '', categoria: '', precio: '', cantidad: '', descripcion: ''
  });
  const [imagenUrl, setImagenUrl] = useState('');

  const obtenerProductos = () => {
    fetch('http://localhost:8000/api/productos')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error(err));
  };

  useEffect(() => { obtenerProductos(); }, [reload]);

  const eliminarProducto = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/productos/${id}`, { method: 'DELETE' });
      if (res.ok) {
        obtenerProductos();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const iniciarEdicion = (producto) => {
    setEditandoId(producto.id);
    setFormData({
      nombre: producto.nombre,
      categoria: producto.categoria,
      precio: producto.precio,
      cantidad: producto.cantidad || '',
      descripcion: producto.descripcion || ''
    });
    setImagenUrl(producto.imagen_url || '');
  };

  const guardarCambios = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/productos/${editandoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, imagen_url: imagenUrl }),
      });

      if (res.ok) {
        obtenerProductos();
        setEditandoId(null);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <section className="p-4 bg-gray-100 dark:bg-gray-900 min-h-screen font-sans">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800 dark:text-gray-100">
        📦 Productos Destacados
      </h2>

      {productos.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300 text-lg">
          No hay productos registrados. ¡Agrega uno nuevo!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {productos.map((prod) => (
            <div
              key={prod.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700
                         flex flex-col overflow-hidden transition-shadow duration-200 hover:shadow-xl"
            >
              {/* Imagen con tamaño fijo + overflow para que el zoom no sobrepase */}
              <div className="w-full h-48 overflow-hidden flex items-center justify-center bg-gray-50 dark:bg-gray-700">
                <img
                  src={prod.imagen_url || `https://placehold.co/400x400/E5E7EB/4B5563?text=Producto+${prod.id}`}
                  alt={`Imagen de ${prod.nombre}`}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/400x400/E5E7EB/4B5563?text=Imagen+no+disponible';
                  }}
                />
              </div>

              {/* Contenido */}
              <div className="flex-grow p-4 text-center">
                {editandoId === prod.id ? (
                  <>
                    <input type="text" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      className="border p-2 mb-2 w-full rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    <input type="text" value={formData.categoria} onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                      className="border p-2 mb-2 w-full rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    <input type="number" value={formData.precio} onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                      className="border p-2 mb-2 w-full rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    <input type="number" value={formData.cantidad} onChange={(e) => setFormData({ ...formData, cantidad: e.target.value })}
                      className="border p-2 mb-2 w-full rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    <input type="text" value={imagenUrl} onChange={(e) => setImagenUrl(e.target.value)}
                      placeholder="URL de la imagen"
                      className="border p-2 mb-2 w-full rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    <textarea value={formData.descripcion} onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                      className="border p-2 mb-3 w-full rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" rows="2" />

                    <div className="flex gap-2">
                      <button onClick={guardarCambios} className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-semibold">
                        💾 Guardar
                      </button>
                      <button onClick={() => setEditandoId(null)} className="flex-1 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 font-semibold">
                        ❌ Cancelar
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{prod.nombre}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{prod.categoria}</p>
                    <p className="mt-1 text-xl font-extrabold text-indigo-600 dark:text-indigo-400">${prod.precio}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Cantidad: {prod.cantidad}</p>
                    {prod.descripcion && (
                      <p className="text-xs italic text-gray-500 dark:text-gray-400 mt-1 line-clamp-3">
                        {prod.descripcion}
                      </p>
                    )}

                    <div className="flex gap-2 mt-4 relative z-10">
                      <button onClick={() => iniciarEdicion(prod)}
                        className="flex-1 bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 font-semibold">
                        ✏️ Editar
                      </button>
                      <button onClick={() => eliminarProducto(prod.id)}
                        className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 font-semibold">
                        🗑 Eliminar
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
