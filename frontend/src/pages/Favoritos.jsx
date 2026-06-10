import {
  useContext
} from "react";

import {
  CarritoContext
} from "../context/CarritoContext";

function Favoritos() {

  const {
    favoritos,
    eliminarFavorito
  } = useContext(CarritoContext);

  return (

    <div className="favoritosPage">

      <h1>
         Mis Favoritos
      </h1>

      {

        favoritos.length === 0

        ? (

          <h2>
            No tienes favoritos aún
          </h2>

        )

        : (

          <div className="productos">

            {

              favoritos.map(
                (producto) => (

                <div
                  className="card"
                  key={producto.id}
                >

                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="imagenProducto"
                  />

                  <div className="cardContenido">

                    <h2>
                      {producto.nombre}
                    </h2>

                    <p>
                      {producto.descripcion}
                    </p>

                    <p className="precio">

                      Bs {producto.precio}

                    </p>

                    <button
                      className="eliminarBtn"

                      onClick={() =>
                        eliminarFavorito(
                          producto.id
                        )
                      }
                    >

                      Eliminar

                    </button>

                  </div>

                </div>

              ))
            }

          </div>

        )

      }

    </div>
  );
}

export default Favoritos;