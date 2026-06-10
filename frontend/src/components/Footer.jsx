// src/components/Footer.jsx
import { FaWhatsapp, FaTiktok, FaFacebook, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer>
      <div className="footerContent">
        <div className="footerInfo">
          <h3>Sea Scape Aquarium</h3>
          <p>Especialistas en acuarios y vida submarina</p>
          <p>Por que la vida bajo el agua merece ser contada</p>
        </div>

        <div className="footerLinks">
          <h4>Enlaces rápidos</h4>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/catalogo">Catálogo</a></li>
            <li><a href="/servicios">Servicios</a></li>
            <li><a href="/contacto">Contacto</a></li>
          </ul>
        </div>

        <div className="footerSocial">
          <h4>Síguenos</h4>
          <div className="socialIcons">
            <a 
              href="https://chat.whatsapp.com/Gn4bPqeArnd0aLV2jyrtnB" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="socialIcon whatsapp"
            >
              <FaWhatsapp />
              <span>WhatsApp</span>
            </a>
            <a 
              href="https://www.tiktok.com/@sea.scape.acuariu?_r=1&_t=ZS-96WGKN2V5iD" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="socialIcon tiktok"
            >
              <FaTiktok />
              <span>TikTok</span>
            </a>
            <a 
              href="https://www.facebook.com/share/17pt48haPm/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="socialIcon facebook"
            >
              <FaFacebook />
              <span>Facebook</span>
            </a>
            <a 
              href="https://www.instagram.com/sea_scape_acuarium?igsh=MWV0NzE1c3Bka2FobA==" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="socialIcon instagram"
            >
              <FaInstagram />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>

      <div className="footerBottom">
        <p>&copy; 2026 Sea Scape Aquarium - Todos los derechos reservados</p>
      </div>
    </footer>
  );
}

export default Footer;