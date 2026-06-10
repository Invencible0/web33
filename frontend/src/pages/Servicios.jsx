import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShieldAlt, FaTruck, FaStar, FaWhatsapp, FaUser, FaUsers } from "react-icons/fa";

export default function Servicios() {

  const navigate = useNavigate();

  return (

    <section className="servicios">

      {/* Burbujas de fondo */}
      <div className="bubbles">
        <span></span><span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span><span></span>
      </div>

      {/* HERO */}
      <motion.div 
        className="serviciosHero"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Nuestros Servicios</h1>
        <p className="subtitulo">
          Todo lo que necesitas para crear un acuario moderno, saludable y lleno de vida.
        </p>
      </motion.div>

      {/* SERVICIOS PRINCIPALES */}
      <div className="servicios-container">

        {/* CARD 1 - Ajolotes y Acuarios */}
        <motion.div 
          className="vertical"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="icono">🦎</div>
          <h2>Ajolotes y Acuarios</h2>
          <p>
            Especialistas en ajolotes y acuarios. Todo lo necesario para crear tu acuario ideal,
            desde ajolotes hasta decoración y diseño completo.
          </p>
          <ul>
            <li>Ajolotes mexicanos de primera calidad</li>
            <li>Acuarios premium y personalizados para ajolotes</li>
            <li>Plantas y decoración natural</li>
            <li>Asesoramiento completo paso a paso</li>
          </ul>
          <button className="comprarBtn" onClick={() => navigate("/catalogo")}>
            Ver catálogo →
          </button>
        </motion.div>

        {/* CARD 2 - Comida y Accesorios */}
        <motion.div 
          className="vertical"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="icono">🍱</div>
          <h2>Comida y Accesorios</h2>
          <p>
            Productos especializados para mantener saludables a tus peces y ajolotes.
          </p>
          <ul>
            <li>Comida premium para ajolotes y peces</li>
            <li>Filtros de agua avanzados</li>
            <li>Bombas de oxígeno silenciosas</li>
            <li>Productos de limpieza profesional</li>
          </ul>
          <button className="comprarBtn" onClick={() => navigate("/catalogo")}>
            Ver catálogo →
          </button>
        </motion.div>

      </div>

      {/* SECCIÓN DE NOSOTROS (FOTOS Y FRASE) */}
      <motion.div 
        className="nosotrosSection"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="extraTitle">Detrás de Sea Scape</h2>
        <p className="nosotrosFrasePrincipal">
          "Porque la vida bajo el agua merece ser contada"
        </p>
        <div className="nosotrosGrid">
          
          {/* Tu Tarjeta */}
          <div className="nosotrosCard">
            <div className="fotoContainer">
              <img 
                src="https://cdn.phototourl.com/free/2026-06-10-1d676755-8ea9-4ab3-9048-36ae264fdf89.jpg" 
                alt="Tu nombre"
                className="fotoPerfil"
              />
            </div>
            <h3>Mateo Emiliano Tudela Romay</h3>
            <p className="cargo">Fundador / Especialista en Ajolotes</p>
            <p className="frasePersonal">
              "Apasionado por los ajolotes y la acuariofilia, creando espacios de vida submarina únicos"
            </p>
          </div>

          {/* Tarjeta de tu Compañero */}
          <div className="nosotrosCard">
            <div className="fotoContainer">
              <img 
                src="https://cdn.phototourl.com/free/2026-06-10-9538232c-b1cb-48ab-a5a3-0036b7087551.jpg" 
                alt="Nombre de tu compañero"
                className="fotoPerfil"
              />
            </div>
            <h3>Miguel Matias Valdez Paca</h3>
            <p className="cargo">Co-Fundador / Especialista en Acuarios</p>
            <p className="frasePersonal">
              "Creando ecosistemas acuáticos saludables y sostenibles"
            </p>
          </div>

        </div>
      </motion.div>

      {/* SECCIÓN: SERVICIOS DESTACADOS */}
      <motion.div 
        className="serviciosExtra"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="extraTitle">Servicios Destacados</h2>
        <div className="extraGrid">
          <div className="extraCard">
            <div className="extraIcon">🔧</div>
            <h3>Mantenimiento</h3>
            <p>Limpieza y mantenimiento profesional de acuarios y ajolotarios</p>
          </div>
          <div className="extraCard">
            <div className="extraIcon">📦</div>
            <h3>Envíos a Domicilio</h3>
            <p>Entregamos tus productos y ajolotes en toda la ciudad</p>
          </div>
          <div className="extraCard">
            <div className="extraIcon">🎓</div>
            <h3>Cuidado de Ajolotes</h3>
            <p>Aprende a cuidar correctamente a tu ajolote desde casa</p>
          </div>
          <div className="extraCard">
            <div className="extraIcon">🩺</div>
            <h3>Veterinaria Especializada</h3>
            <p>Atención especializada para ajolotes y peces</p>
          </div>
        </div>
      </motion.div>

      {/* SECCIÓN DE BENEFICIOS */}
      <motion.div 
        className="beneficiosSection"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="extraTitle">¿Por qué elegirnos?</h2>
        <div className="beneficiosGrid">
          <div className="beneficioItem">
            <FaShieldAlt className="beneficioIcon" />
            <span>Garantía en todos los productos</span>
          </div>
          <div className="beneficioItem">
            <FaTruck className="beneficioIcon" />
            <span>Envío rápido y seguro</span>
          </div>
          <div className="beneficioItem">
            <FaStar className="beneficioIcon" />
            <span>Mejor calidad del mercado</span>
          </div>
          <div className="beneficioItem">
            <FaWhatsapp className="beneficioIcon" />
            <span>Soporte 24/7 por WhatsApp</span>
          </div>
        </div>
      </motion.div>

      {/* SECCIÓN DE TESTIMONIOS */}
      <motion.div 
        className="testimoniosServicios"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="extraTitle">Lo que dicen nuestros clientes</h2>
        <div className="testimoniosGrid">
          <div className="testimonioCard">
            <div className="testimonioStars">★★★★★</div>
            <p>"Mi ajolote está sano y feliz gracias a sus consejos. Excelente servicio!"</p>
            <div className="testimonioAutor">- Yandira Paco</div>
          </div>
          <div className="testimonioCard">
            <div className="testimonioStars">★★★★★</div>
            <p>"Los mejores precios y la mejor calidad en ajolotes. Muy recomendados."</p>
            <div className="testimonioAutor">-  Mark Grayzon</div>
          </div>
          <div className="testimonioCard">
            <div className="testimonioStars">★★★★★</div>
            <p>"El envío fue rápido y mi ajolote llegó en perfecto estado."</p>
            <div className="testimonioAutor">- Mery López</div>
          </div>
        </div>
      </motion.div>

      {/* CALL TO ACTION FINAL */}
      <motion.div 
        className="ctaServicios"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h3>¿Tienes un proyecto en mente?</h3>
        <p>Contáctanos y te ayudamos a crear el acuario o ajolotario de tus sueños</p>
        <button className="ctaBtnServicios" onClick={() => navigate("/contacto")}>
          Contáctanos ahora
        </button>
      </motion.div>

    </section>
  );
}