import {
  createContext,
  useState,
  useEffect
} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // ===== FUNCIÓN PARA REGISTRAR LOGS =====
  const registrarLog = async (evento, email) => {
    console.log(" Función registrarLog llamada:", { evento, email });

    const logData = {
      usuario_email: email,
      ip: window.location.hostname,
      evento: evento,
      browser: navigator.userAgent,
      fecha: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };
    
    console.log(" Enviando log:", logData);

    try {
      const response = await fetch("http://localhost:3001/api/logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logData)
      });
      
      const data = await response.json();
      console.log(" Respuesta del servidor:", data);
    } catch (error) {
      console.error(" Error al registrar log:", error);
    }
  };

  const login = async (email, password) => {

    try {

      const res = await fetch(
        "http://localhost:3001/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return false;
      }

      const userData = {
        nombre: data.usuario,
        rol: data.rol,
        email: email
      };

      setUser(userData);

      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );

      console.log(" Login exitoso, registrando log de ingreso...");
      await registrarLog("ingreso", email);

      return true;

    } catch (error) {

      console.log(error);
      return false;

    }

  };

  const logout = () => {

    console.log(" Cerrando sesión, registrando log de salida...");

    if (user && user.email) {
      registrarLog("salida", user.email);
    }

    setUser(null);
    localStorage.removeItem("user");

  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};