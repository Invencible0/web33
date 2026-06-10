import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRol, setUserRol] = useState(null);

  useEffect(() => {
    const rol = localStorage.getItem("rol");
    const usuario = localStorage.getItem("usuario");
    
    if (usuario) {
      setIsLoggedIn(true);
      setUserRol(rol);
    } else {
      setIsLoggedIn(false);
      setUserRol(null);
    }
  }, []);

  // ===== FUNCIÓN PARA CERRAR SESIÓN CON LOG =====
  const cerrarSesion = async () => {
    const email = localStorage.getItem("email");
    
    // Registrar log de salida
    if (email) {
      const logData = {
        usuario_email: email,
        ip: window.location.hostname,
        evento: "salida",
        browser: navigator.userAgent,
        fecha: new Date().toISOString().slice(0, 19).replace('T', ' ')
      };
      
      try {
        await fetch("http://localhost:3001/api/logs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(logData)
        });
        console.log(" Log de salida registrado");
      } catch (error) {
        console.error("Error al registrar log de salida:", error);
      }
    }
    
    // Limpiar localStorage
    localStorage.removeItem("usuario");
    localStorage.removeItem("rol");
    localStorage.removeItem("email");
    localStorage.removeItem("user");
    
    // Redirigir al login
    navigate("/login");
    window.location.reload(); // Recargar para actualizar el navbar
  };

  return (

    <div className="navbar">

      <div className="logoBox">

        <img
          src="https://www.image2url.com/r2/default/images/1779230736143-906a6f94-c210-4e99-bbdd-f34b63cd254e.jpeg"
          alt="Logo Sea Scape"
          className="logoImagen"
        />

        <div className="logo">
          SEA SCAPE ACUARIUM
        </div>

      </div>

      <div className="menu">

        <Link to="/">Inicio</Link>
        <Link to="/catalogo">Catálogo</Link>
        <Link to="/servicios">Servicios</Link>
        <Link to="/noticias">Noticias</Link>
        <Link to="/contacto">Contacto</Link>

        {!isLoggedIn ? (
          <Link to="/login">Login</Link>
        ) : (
          <>
            <Link to="/favoritos">Favoritos</Link>
            {userRol === "admin" && (
              <Link to="/admin">Admin</Link>
            )}
            <button onClick={cerrarSesion} className="cerrarSesionBtn">
              Cerrar Sesión
            </button>
          </>
        )}

      </div>

    </div>
  );
}

export default Navbar;