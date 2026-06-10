import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import bcrypt from 'bcrypt';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sea_scape_acuarium'
});

db.connect((err) => {
  if (err) console.log('Error:', err);
  else console.log('MySQL conectado');
});

// =========================
// REGISTRO
// =========================
app.post('/registro', async (req, res) => {
  const { nombre, email, password } = req.body;
  
  if (!nombre || !email || !password) {
    return res.status(400).json({ mensaje: 'Datos incompletos' });
  }
  
  try {
    const hash = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, "usuario")';
    
    db.query(sql, [nombre, email, hash], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ mensaje: 'El email ya esta registrado' });
        }
        return res.status(500).json({ mensaje: 'Error en la base de datos' });
      }
      res.json({ mensaje: 'Registrado con exito' });
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

// =========================
// LOGIN
// =========================
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, result) => {
    if (err) return res.status(500).json({ mensaje: 'Error DB' });
    if (result.length === 0) return res.status(404).json({ mensaje: 'Usuario no existe' });
    
    const valid = await bcrypt.compare(password, result[0].password);
    if (!valid) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    
    res.json({
      mensaje: 'Login exitoso',
      usuario: result[0].nombre,
      rol: result[0].rol,
      email: result[0].email
    });
  });
});

// =========================
// ACTUALIZAR PRODUCTO
// =========================
app.put("/productos/:id", (req, res) => {

  const {
    nombre,
    precio,
    stock,
    categoria,
    imagen
  } = req.body;

  const sql = `
    UPDATE productos
    SET nombre=?, precio=?, stock=?, categoria=?, imagen=?
    WHERE id=?
  `;

  db.query(
    sql,
    [
      nombre,
      precio,
      stock,
      categoria,
      imagen,
      req.params.id
    ],
    (err) => {

      if (err) {
        return res.status(500).json({
          mensaje: "Error al editar"
        });
      }

      res.json({
        mensaje: "Producto actualizado"
      });

    }
  );

});

// =========================
// OBTENER PRODUCTOS
// =========================
app.get("/productos", (req, res) => {
  const sql = "SELECT * FROM productos";
  
  db.query(sql, (err, results) => {
    if (err) {
      console.log("Error:", err);
      return res.status(500).json({ mensaje: "Error al obtener productos" });
    }
    res.json(results);
  });
});

// =========================
// CREAR PRODUCTO
// =========================
app.post("/productos", (req, res) => {
  const { nombre, precio, stock, categoria, imagen } = req.body;
  
  console.log("Datos recibidos:", req.body);
  
  if (!nombre || !precio || !categoria) {
    return res.status(400).json({ mensaje: "Nombre, precio y categoria son requeridos" });
  }
  
  const sql = `INSERT INTO productos (nombre, precio, stock, categoria, imagen) VALUES (?, ?, ?, ?, ?)`;
  
  db.query(sql, [nombre, precio, stock || 0, categoria, imagen || null], (err, result) => {
    if (err) {
      console.log("Error SQL:", err);
      return res.status(500).json({ mensaje: "Error al crear producto", error: err.message });
    }
    console.log("Producto creado, ID:", result.insertId);
    res.status(201).json({ mensaje: "Producto creado correctamente", id: result.insertId });
  });
});

// =========================
// ELIMINAR PRODUCTO
// =========================
app.delete("/productos/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM productos WHERE id = ?";
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log("Error:", err);
      return res.status(500).json({ mensaje: "Error al eliminar producto" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    res.json({ mensaje: "Producto eliminado correctamente" });
  });
});
// =========================
// REGISTRAR LOG DE ACCESO
// =========================
app.post("/api/logs", (req, res) => {
  const { usuario_email, ip, evento, browser, fecha } = req.body;
  
  const sql = `INSERT INTO logs_acceso (usuario_email, ip, evento, browser, fecha) VALUES (?, ?, ?, ?, ?)`;
  
  db.query(sql, [usuario_email, ip, evento, browser, fecha], (err, result) => {
    if (err) {
      console.log("Error al guardar log:", err);
      return res.status(500).json({ mensaje: "Error al guardar log" });
    }
    res.json({ mensaje: "Log registrado" });
  });
});

// =========================
// OBTENER LOGS (para admin)
// =========================
app.get("/api/logs", (req, res) => {
  const sql = "SELECT * FROM logs_acceso ORDER BY fecha DESC LIMIT 100";
  
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ mensaje: "Error al obtener logs" });
    }
    res.json(results);
  });
});
// =========================
// SERVIDOR
// =========================
app.listen(3001, () => console.log('Servidor en puerto 3001'));