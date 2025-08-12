import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';

export default function Home() {
  const [reload, setReload] = useState(false);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6 shadow-md">
        Inventario de Productos Tecnológicos
      </h1>

      {/* Cambié a onProductoAgregado para que coincida con ProductForm.jsx */}
      <ProductForm onProductoAgregado={() => setReload(!reload)} />

      <hr className="my-6 border-gray-300" />

      <ProductList reload={reload} />
    </main>
  );
}
