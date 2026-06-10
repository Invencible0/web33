import {
  createContext,
  useState
} from "react";

export const CarritoContext =
  createContext();

export function CarritoProvider({
  children
}) {

  // CARRITO

  const [carrito, setCarrito] =
    useState([]);

  // FAVORITOS

  const [favoritos, setFavoritos] =
    useState([]);

  // AGREGAR CARRITO

  const agregarAlCarrito = (
    producto
  ) => {

    setCarrito([
      ...carrito,
      producto
    ]);
  };

  // ELIMINAR CARRITO

  const eliminarDelCarrito = (
    id
  ) => {

    setCarrito(

      carrito.filter(
        (item) =>
          item.id !== id
      )

    );
  };

  // FAVORITOS

  const agregarFavorito = (
    producto
  ) => {

    const existe =
      favoritos.find(
        (item) =>
          item.id === producto.id
      );

    if(existe) return;

    setFavoritos([
      ...favoritos,
      producto
    ]);
  };

  // ELIMINAR FAVORITO

  const eliminarFavorito = (
    id
  ) => {

    setFavoritos(

      favoritos.filter(
        (item) =>
          item.id !== id
      )

    );
  };

  return (

    <CarritoContext.Provider
      value={{

        carrito,
        favoritos,

        agregarAlCarrito,
        eliminarDelCarrito,

        agregarFavorito,
        eliminarFavorito

      }}
    >

      {children}

    </CarritoContext.Provider>
  );
}