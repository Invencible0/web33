import { motion } from "framer-motion";
import { FaCalendarAlt, FaHeart, FaComment, FaEye } from "react-icons/fa";

export default function Noticias() {

  const noticias = [
    {
      id: 1,
      titulo: "Participamos en la FIPAZ 2025",
      fecha: "26 Octubre 2025",
      descripcion: "Sea Scape Aquarium tuvo el honor de participar en la FIPAZ 2025, presentando especies ornamentales, accesorios para acuarios y asesoramiento especializado para aficionados y profesionales del mundo acuático. Esta experiencia nos permitió crecer y conectar con más amantes de la acuariofilia.",
      imagen: "https://sea-scape-acuarium.odoo.com/web/image/1682-6f193f0c/WhatsApp%20Image%202026-06-07%20at%206.29.47%20PM.webp?access_token=22f34a0e-36c3-405d-9bfc-bcc92449f7c2",
      categoria: "Eventos",
      likes: 234,
      comentarios: 45
    },
    {
      id: 2,
      titulo: "Importancia del Agua Limpia",
      fecha: "15 Enero 2026",
      descripcion: "Mantener el agua filtrada ayuda a prevenir enfermedades y mejora la vida de los peces. Descubre los mejores métodos de filtración para tu acuario.",
      imagen: "https://i.pinimg.com/1200x/70/0c/9d/700c9dd91ab6f37cff9cafa44fe3287b.jpg",
      categoria: "Consejos",
      likes: 189,
      comentarios: 32
    },
    {
      id: 3,
      titulo: "Iluminación LED para Acuarios",
      fecha: "3 Febrero 2026",
      descripcion: "La iluminación LED reduce el consumo eléctrico y mejora la apariencia del acuario. Conoce las mejores opciones del mercado.",
      imagen: "https://i.pinimg.com/1200x/b7/c9/f3/b7c9f3a099647d86f139f8576ab26413.jpg",
      categoria: "Tecnología",
      likes: 312,
      comentarios: 67
    },
    {
      id: 4,
      titulo: "Nuevas Especies Disponibles",
      fecha: "20 Febrero 2026",
      descripcion: "Llegaron nuevas especies ornamentales ideales para acuarios decorativos. Peces exóticos y plantas acuáticas de primera calidad.",
      imagen: "https://i.pinimg.com/1200x/53/be/09/53be094661f62a10475082a6898ef37f.jpg",
      categoria: "Novedades",
      likes: 456,
      comentarios: 89
    }
  ];

  return (

    <section className="noticias">

      {/* Burbujas de fondo */}
      <div className="bubbles">
        <span></span><span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span><span></span>
      </div>

      {/* HERO con la frase */}
      <motion.div 
        className="noticiasHero"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Noticias y Curiosidades</h1>
        <p className="frasePrincipal">
          "Porque la vida bajo el agua merece ser contada"
        </p>
      </motion.div>

      {/* NOTICIA DESTACADA */}
      <motion.div 
        className="noticiaDestacada"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <img 
          src="https://sea-scape-acuarium.odoo.com/web/image/1682-6f193f0c/WhatsApp%20Image%202026-06-07%20at%206.29.47%20PM.webp?access_token=22f34a0e-36c3-405d-9bfc-bcc92449f7c2" 
          alt="Noticia destacada"
          className="destacadaImage"
        />
        <div className="destacadaContent">
          <span className="destacadaCategoria">Evento Especial</span>
          <h2>Sea Scape Aquarium en la FIPAZ 2025</h2>
          <p>Participamos en la feria más importante de acuariofilia, presentando especies ornamentales y asesoramiento especializado. Esta experiencia nos permitió crecer y conectar con más amantes de la acuariofilia.</p>
        </div>
      </motion.div>

      {/* GRID DE NOTICIAS */}
      <div className="noticias-grid">
        {noticias.map((noticia, index) => (
          <motion.div 
            key={noticia.id}
            className="news-card-modern"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
          >
            <div className="cardImageContainer">
              <img src={noticia.imagen} alt={noticia.titulo} className="cardImage" />
              <span className="cardCategoria">{noticia.categoria}</span>
            </div>
            <div className="cardContent">
              <div className="cardFecha">
                <FaCalendarAlt className="fechaIcon" />
                <span>{noticia.fecha}</span>
              </div>
              <h3>{noticia.titulo}</h3>
              <p>{noticia.descripcion}</p>
              <div className="cardStats">
                <div className="stat"><FaHeart className="statIcon" /> {noticia.likes}</div>
                <div className="stat"><FaComment className="statIcon" /> {noticia.comentarios}</div>
                <div className="stat"><FaEye className="statIcon" /> {Math.floor(noticia.likes * 1.5)}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FRASE FINAL */}
      <motion.div 
        className="fraseFinal"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="fraseComillas">"</div>
        <p className="fraseTexto">Porque la vida bajo el agua merece ser contada</p>
        <div className="fraseAutor">- Sea Scape Aquarium</div>
      </motion.div>

    </section>
  );
}