// src/pages/Configuracion.jsx
import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaImage, FaLaptopCode } from "react-icons/fa";

export default function Configuracion() {
  const [nombreSistema, setNombreSistema] = useState("Sistema de Inventario");
  const [logo, setLogo] = useState(null);
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  const exportarCSV = () => {
    alert("Aquí se ejecutará la exportación a CSV");
  };

  const exportarExcel = () => {
    alert("Aquí se ejecutará la exportación a Excel");
  };

  const importarArchivo = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`Archivo importado: ${file.name}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Configuración del Sistema
        </h1>

        {/* Nombre del sistema */}
        <div className="flex items-center border rounded-lg px-2 py-2 mb-4">
          <FaLaptopCode className="text-gray-400 mr-2" />
          <input
            type="text"
            value={nombreSistema}
            onChange={(e) => setNombreSistema(e.target.value)}
            placeholder="Nombre del sistema"
            className="w-full outline-none"
          />
        </div>

        {/* Logo */}
        <div className="flex items-center border rounded-lg px-3 py-2 mb-4">
          <FaImage className="text-gray-400 mr-2" />
          <input type="file" accept="image/*" onChange={handleLogoChange} className="w-full" />
        </div>
        {logo && <img src={logo} alt="Logo" className="h-20 mx-auto mb-4" />}

        {/* Teléfono */}
        <div className="flex items-center border rounded-lg px-3 py-2 mb-4">
          <FaPhone className="text-gray-400 mr-2" />
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Teléfono"
            className="w-full outline-none"
          />
        </div>

        {/* Email */}
        <div className="flex items-center border rounded-lg px-3 py-2 mb-4">
          <FaEnvelope className="text-gray-400 mr-2" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            className="w-full outline-none"
          />
        </div>

        {/* Botones de respaldo */}
        <button
          onClick={exportarCSV}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg mb-2"
        >
          Exportar CSV
        </button>
        <button
          onClick={exportarExcel}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg mb-4"
        >
          Exportar Excel
        </button>

        {/* Importar archivo */}
        <label className="block mb-2 text-gray-600 font-medium">
          Importar inventario
        </label>
        <input type="file" accept=".csv, .xlsx" onChange={importarArchivo} />
      </div>
    </div>
  );
}
