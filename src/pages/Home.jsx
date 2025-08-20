import React, { useState, useCallback } from "react";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";

export default function Home() {
  const [reload, setReload] = useState(false);

  const handleProductoAgregado = useCallback(() => {
    setReload(prev => !prev);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6 shadow-md">
        Inventario de Productos Tecnológicos
      </h1>

      {/* Formulario fijo, no se desmonta */}
      <div className="mb-6">
        <ProductForm key="form-producto" onProductoAgregado={handleProductoAgregado} />
      </div>

      <hr className="my-6 border-gray-300" />

      {/* Lista que solo se actualiza con reload */}
      <ProductList reload={reload} />
    </div>
  );
}
