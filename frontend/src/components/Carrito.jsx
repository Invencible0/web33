import { useContext } from "react";

import { CarritoContext }
from "../context/CarritoContext";

function Carrito() {

  const {
    carrito,
    eliminarDelCarrito
  } = useContext(CarritoContext);

  const total = carrito.reduce(
    (acc, item) =>
      acc + Number(item.precio),
    0
  );

  return (

    <div className="carrito">

      <h2>🛒 Carrito</h2>

      {carrito.length === 0 ? (
        <p>No hay productos.</p>
      ) : (

        carrito.map((item, index) => (

          <div
            key={index}
            className="itemCarrito"
          >

            <div>

              <h4>{item.nombre}</h4>

              <p>Bs {item.precio}</p>

            </div>

            <button
              onClick={() =>
                eliminarDelCarrito(index)
              }
            >
              X
            </button>

          </div>

        ))

      )}

      <h3>Total: Bs {total}</h3>

    </div>
  );
}

export default Carrito;