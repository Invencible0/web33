import {
  useEffect,
  useState,
  useContext
} from "react";

import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import GraficaProductos from "../components/GraficaProductos";
import { CarritoContext } from "../context/CarritoContext";

import Carrito from "../components/Carrito";
import jsPDF from "jspdf";

function Catalogo() {

  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: "",
    stock: 0,
    categoria: "",
    imagen: ""
  });

  // Define si el usuario es admin
  const esAdmin = localStorage.getItem("rol") === "admin";

  // Funcion generarPDF
  const generarPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text("Catalogo Sea Scape Aquarium", 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Generado: ${new Date().toLocaleString()}`, 20, 30);
    
    let y = 45;
    doc.setFontSize(10);
    
    doc.text("ID", 20, y);
    doc.text("Nombre", 40, y);
    doc.text("Categoria", 100, y);
    doc.text("Precio", 150, y);
    doc.text("Stock", 180, y);
    
    y += 10;
    
    productos.forEach((p) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.text(String(p.id), 20, y);
      doc.text(p.nombre.substring(0, 20), 40, y);
      doc.text(p.categoria.substring(0, 15), 100, y);
      doc.text(`Bs ${p.precio}`, 150, y);
      doc.text(String(p.stock), 180, y);
      y += 10;
    });
    
    doc.save("catalogo.pdf");
  };

  const {
    agregarAlCarrito,
    agregarFavorito,
    carrito
  } = useContext(CarritoContext);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = () => {
    fetch("http://localhost:3001/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.log(err));
  };

  const agregarProducto = () => {
    if (!nuevoProducto.nombre || !nuevoProducto.precio || !nuevoProducto.categoria) {
      alert("Nombre, precio y categoria son requeridos");
      return;
    }

    fetch("http://localhost:3001/productos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre: nuevoProducto.nombre,
        precio: nuevoProducto.precio,
        stock: nuevoProducto.stock,
        categoria: nuevoProducto.categoria,
        imagen: nuevoProducto.imagen
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Respuesta:", data);
        if (data.mensaje && data.mensaje.includes("correctamente")) {
          obtenerProductos();
          setMostrarForm(false);
          setNuevoProducto({
            nombre: "",
            precio: "",
            stock: 0,
            categoria: "",
            imagen: ""
          });
        }
        alert(data.mensaje);
      })
      .catch((err) => console.log(err));
  };

  const eliminarProducto = (id) => {
    if (window.confirm("Eliminar este producto?")) {
      fetch(`http://localhost:3001/productos/${id}`, {
        method: "DELETE"
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.mensaje);
          obtenerProductos();
        })
        .catch((err) => console.log(err));
    }
  };

  const editarProducto = (producto) => {
    setEditando(true);
    setMostrarForm(true);
    setProductoEditando(producto);
    setNuevoProducto({
      nombre: producto.nombre,
      precio: producto.precio,
      stock: producto.stock,
      categoria: producto.categoria,
      imagen: producto.imagen
    });
  };

  const actualizarProducto = () => {
    fetch(`http://localhost:3001/productos/${productoEditando.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(nuevoProducto)
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.mensaje);
        obtenerProductos();
        setEditando(false);
        setProductoEditando(null);
        setNuevoProducto({
          nombre: "",
          precio: "",
          stock: 0,
          categoria: "",
          imagen: ""
        });
        setMostrarForm(false);
      })
      .catch((err) => console.log(err));
  };

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <div className="catalogoHero">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>Catalogo Premium</h1>
          <p>Productos premium para acuarios.</p>
        </motion.div>
      </div>

      {esAdmin && (
        <div style={{ textAlign: "center", margin: "20px" }}>
          <button
            className="comprarBtn"
            onClick={() => setMostrarForm(!mostrarForm)}
          >
            {mostrarForm ? "Cerrar" : "Anadir producto"}
          </button>
          
          <button
            className="comprarBtn"
            onClick={generarPDF}
            style={{ marginLeft: "10px" }}
          >
            Generar PDF
          </button>
        </div>
      )}

      {!esAdmin && (
        <div style={{ textAlign: "center", margin: "20px" }}>
          <button
            className="comprarBtn"
            onClick={generarPDF}
          >
            Generar PDF del Catalogo
          </button>
        </div>
      )}

      {esAdmin && mostrarForm && (
        <div className="formAdmin" style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
          <input
            placeholder="Nombre *"
            value={nuevoProducto.nombre}
            onChange={(e) =>
              setNuevoProducto({
                ...nuevoProducto,
                nombre: e.target.value
              })
            }
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />

          <input
            placeholder="Categoria *"
            value={nuevoProducto.categoria}
            onChange={(e) =>
              setNuevoProducto({
                ...nuevoProducto,
                categoria: e.target.value
              })
            }
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />

          <input
            placeholder="Precio *"
            type="number"
            step="0.01"
            value={nuevoProducto.precio}
            onChange={(e) =>
              setNuevoProducto({
                ...nuevoProducto,
                precio: e.target.value
              })
            }
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />

          <input
            placeholder="Stock"
            type="number"
            value={nuevoProducto.stock}
            onChange={(e) =>
              setNuevoProducto({
                ...nuevoProducto,
                stock: e.target.value
              })
            }
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />

          <input
            placeholder="URL de Imagen"
            value={nuevoProducto.imagen}
            onChange={(e) =>
              setNuevoProducto({
                ...nuevoProducto,
                imagen: e.target.value
              })
            }
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />

          <button
            className="comprarBtn"
            onClick={editando ? actualizarProducto : agregarProducto}
            style={{ width: "100%" }}
          >
            {editando ? "Actualizar producto" : "Guardar producto"}
          </button>
        </div>
      )}

      <div className="buscadorContainer">
        <input
          type="text"
          placeholder="Buscar productos..."
          className="buscador"
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="contadorCarrito">
        {carrito.length}
      </div>

      <div className="productos">
        {productosFiltrados.length === 0 ? (
          <p style={{ textAlign: "center", width: "100%" }}>No hay productos disponibles</p>
        ) : (
          productosFiltrados.map((producto, index) => (
            <motion.div
              key={producto.id}
              className="card"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <img
                src={producto.imagen || "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5"}
                alt={producto.nombre}
                className="imagenProducto"
              />

              <div className="cardContenido">
                <h2>{producto.nombre}</h2>
                <p>Categoria: {producto.categoria}</p>
                <p className="precio">Bs {producto.precio}</p>
                <p>Stock: {producto.stock}</p>

                <button
                  className="comprarBtn"
                  onClick={() => agregarAlCarrito(producto)}
                >
                  Comprar
                </button>

                <button
                  className="favoritoBtn"
                  onClick={() => agregarFavorito(producto)}
                >
                  <FaHeart /> Favorito
                </button>

                {esAdmin && (
                  <button
                    className="comprarBtn"
                    onClick={() => editarProducto(producto)}
                  >
                    Editar
                  </button>
                )}

                {esAdmin && (
                  <button
                    className="eliminarBtn"
                    onClick={() => eliminarProducto(producto.id)}
                  >
                    Eliminar
                  </button>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Grafico de Productos */}
      <GraficaProductos productos={productos} />
      
      <Carrito />
    </div>
  );
}

export default Catalogo;