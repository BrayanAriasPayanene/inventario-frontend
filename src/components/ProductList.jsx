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
    console.log(`Eliminando producto con ID: ${id}`);
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
    <section className="p-4">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800 dark:text-gray-100">
        📦 Productos disponibles
      </h2>

      {productos.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300 text-lg">
          No hay productos registrados. ¡Agrega uno nuevo!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productos.map((prod) => (
            <div
              key={prod.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700
                         transform transition-all duration-300 hover:shadow-2xl relative"
            >
              <div className="h-32 overflow-hidden rounded-t-2xl">
                <img
                  src={prod.imagen_url || `https://placehold.co/400x250/E5E7EB/4B5563?text=Producto+${prod.id}`}
                  alt={`Imagen de ${prod.nombre}`}
                  className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
                  onError={(e) => e.target.src = 'https://placehold.co/400x250/E5E7EB/4B5563?text=Imagen+no+disponible'}
                />
              </div>

              <div className="p-6">
                {editandoId === prod.id ? (
                  <>
                    <input type="text" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      className="border p-3 mb-3 w-full rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500" />
                    <input type="text" value={formData.categoria} onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                      className="border p-3 mb-3 w-full rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500" />
                    <input type="number" value={formData.precio} onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                      className="border p-3 mb-3 w-full rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500" />
                    <input type="number" value={formData.cantidad} onChange={(e) => setFormData({ ...formData, cantidad: e.target.value })}
                      className="border p-3 mb-3 w-full rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500" />
                    <input type="text" value={imagenUrl} onChange={(e) => setImagenUrl(e.target.value)}
                      placeholder="URL de la imagen"
                      className="border p-3 mb-3 w-full rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500" />
                    <textarea value={formData.descripcion} onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                      className="border p-3 mb-3 w-full rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500" rows="2" />

                    <div className="flex gap-2">
                      <button onClick={guardarCambios} className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                        💾 Guardar
                      </button>
                      <button onClick={() => setEditandoId(null)} className="flex-1 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors font-semibold">
                        ❌ Cancelar
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{prod.nombre}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{prod.categoria}</p>
                    <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 mb-3">${prod.precio}</p>
                    <p className="text-md text-gray-600 dark:text-gray-300 mb-4">Cantidad: {prod.cantidad}</p>
                    {prod.descripcion && (
                      <p className="text-sm italic text-gray-500 dark:text-gray-400 mt-1 line-clamp-3">
                        {prod.descripcion}
                      </p>
                    )}

                    <div className="flex gap-2 mt-6">
                      <button onClick={() => iniciarEdicion(prod)}
                        className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors font-semibold">
                        ✏️ Editar
                      </button>
                      <button onClick={() => eliminarProducto(prod.id)}
                        className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold">
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