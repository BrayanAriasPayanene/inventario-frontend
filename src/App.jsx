import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Inicio from "./pages/Inicio";
import Reportes from "./pages/Reportes";
import Inventario from "./pages/Inventario";
import Configuracion from "./pages/Configuracion"; // 👈 Importar

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/configuracion" element={<Configuracion />} /> {/* 👈 Agregar */}
        </Routes>
      </Layout>
    </Router>
  );
}
