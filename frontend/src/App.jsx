import {
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import Servicios from "./pages/Servicios";
import Noticias from "./pages/Noticias";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import Favoritos from "./pages/Favoritos";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Footer from "./components/Footer";

function App() {

  return (

    <>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/catalogo"
          element={<Catalogo />}
        />

        <Route
          path="/servicios"
          element={<Servicios />}
        />

        <Route
          path="/noticias"
          element={<Noticias />}
        />

        <Route
          path="/contacto"
          element={<Contacto />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/favoritos"
          element={<Favoritos />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/admin"
          element={<Admin />}
        />

      </Routes>

      {/* ✅ AGREGAR EL FOOTER AQUÍ */}
      <Footer />

    </>

  );
}

export default App;