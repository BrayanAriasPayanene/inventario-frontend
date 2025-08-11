import React, { useEffect, useState } from 'react';

export default function ProductList() {
  const [productos, setProductos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '', categoria: '', precio: '', cantidad: '', descripcion: ''
  });

  const obtenerProductos = () => {
    fetch('http://localhost:8000/api/productos')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error(err));
  };

  useEffect(() => { obtenerProductos(); }, []);

  const eliminarProducto = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este producto?')) {
      try {
        const res = await fetch(`http://localhost:8000/api/productos/${id}`, { method: 'DELETE' });
        if (res.ok) {
          setProductos(productos.filter(prod => prod.id !== id));
        }
      } catch (error) {
        console.error('Error:', error);
      }
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
  };

  const guardarCambios = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/productos/${editandoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
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
    <section>
      <h2 className="text-2xl font-semibold mb-4">Lista de productos</h2>
      {productos.length === 0 ? (
        <p className="text-gray-500">No hay productos registrados.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((prod) => (
            <div key={prod.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition">
              
              {editandoId === prod.id ? (
                <>
                  <input type="text" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="border p-1 rounded w-full mb-2" />
                  <input type="text" value={formData.categoria} onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                    className="border p-1 rounded w-full mb-2" />
                  <input type="number" value={formData.precio} onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                    className="border p-1 rounded w-full mb-2" />
                  <input type="number" value={formData.cantidad} onChange={(e) => setFormData({ ...formData, cantidad: e.target.value })}
                    className="border p-1 rounded w-full mb-2" />
                  <textarea value={formData.descripcion} onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    className="border p-1 rounded w-full mb-2" rows="3" />

                  <div className="flex gap-2">
                    <button onClick={guardarCambios} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                      Guardar
                    </button>
                    <button onClick={() => setEditandoId(null)} className="bg-gray-400 px-3 py-1 rounded hover:bg-gray-500">
                      Cancelar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-bold mb-2">{prod.nombre}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{prod.categoria}</p>
                  <p className="mt-2 font-semibold text-blue-600">${prod.precio}</p>
                  <p className="mt-1 text-sm">Cantidad: {prod.cantidad}</p>
                  {prod.descripcion && (
                    <p className="mt-1 text-xs text-gray-500">{prod.descripcion}</p>
                  )}
                  <div className="mt-4 flex justify-between">
                    <button onClick={() => iniciarEdicion(prod)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                      Editar
                    </button>
                    <button onClick={() => eliminarProducto(prod.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                      Eliminar
                    </button>
                  </div>
                </>
              )}

            </div>
          ))}
        </div>
      )}
    </section>
  );
}
