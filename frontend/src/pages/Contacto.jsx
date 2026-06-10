import { motion } from "framer-motion";
import { useState } from "react";

function Contacto() {

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    mensaje: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const enviarFormulario = (e) => {
    e.preventDefault();

    console.log(form);
    alert("Mensaje enviado");

    setForm({
      nombre: "",
      email: "",
      mensaje: ""
    });
  };

  return (
    <div className="contactoContainer">

      {/* ===== BURBUJAS AGREGADAS AQUÍ ===== */}
      <div className="bubbles">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {/* ===== FIN BURBUJAS ===== */}

      <motion.div
        className="contactoBox"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >

        <h1>Contactanos</h1>

        <p className="contactoTexto">
          Tienes dudas sobre peces, acuarios o pedidos?
        </p>

        <form onSubmit={enviarFormulario} className="contactoForm">

          <input
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Tu email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="mensaje"
            placeholder="Escribe tu mensaje..."
            value={form.mensaje}
            onChange={handleChange}
            required
          />

          <button type="submit" className="contactoBtn">
            Enviar mensaje
          </button>

        </form>

        <div className="contactoInfo">
          <p>La Paz, Bolivia</p>
          <p>+591 73082060 - 64281855</p>
          <p>Especialistas en acuarios</p>
        </div>

      </motion.div>

    </div>
  );
}

export default Contacto;