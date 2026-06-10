import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (

    <div className="home">

      <div className="bubbles">

        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>

      </div>

      <motion.div

        className="hero"

        initial={{
          opacity: 0,
          y: 50
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        transition={{
          duration: 1
        }}
      >

        <h1>
           SEA SCAPE ACUARIUM
        </h1>

        <p>
          Por que la vida bajo el agua merece ser contada
        </p>

        <button
          className="heroBtn"

          onClick={() =>
            navigate("/catalogo")
          }
        >
          Explorar Catálogo
        </button>

      </motion.div>

      {/* INFO CARDS */}

      <div className="infoCards">

        <motion.div
          className="infoCard"

          whileHover={{
            scale: 1.05
          }}
        >
           Peces 
        </motion.div>

        <motion.div
          className="infoCard"

          whileHover={{
            scale: 1.05
          }}
        >
           Acuarios
        </motion.div>

        <motion.div
          className="infoCard"

          whileHover={{
            scale: 1.05
          }}
        >
            Asesoramientos
        </motion.div>

      </div>

    </div>
  );
}

export default Home;