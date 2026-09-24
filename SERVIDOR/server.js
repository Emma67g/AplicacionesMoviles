const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

let client = null;
let db = null;

// Endpoint de Login para conectarse dinámicamente a MongoDB
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ mensaje: "Debes ingresar usuario y contraseña" });
  }

  // Codificamos caracteres especiales por seguridad en la URI
  const userEncoded = encodeURIComponent(username);
  const passEncoded = encodeURIComponent(password);

  const uri = `mongodb://${userEncoded}:${passEncoded}@ac-ouxyigx-shard-00-00.yn0gme8.mongodb.net:27017,ac-ouxyigx-shard-00-01.yn0gme8.mongodb.net:27017,ac-ouxyigx-shard-00-02.yn0gme8.mongodb.net:27017/sample_mflix?ssl=true&replicaSet=atlas-r4kzsp-shard-0&authSource=admin&appName=Cluster0`;

  try {
    // Cerrar conexión anterior si existía
    if (client) {
      await client.close();
    }

    client = new MongoClient(uri);
    await client.connect();
    db = client.db("sample_mflix");
    
    console.log(`Usuario "${username}" conectado exitosamente a MongoDB`);
    res.json({ mensaje: "Conexión exitosa" });
  } catch (error) {
    console.error("Error de autenticación:", error.message);
    res.status(401).json({ mensaje: "Credenciales incorrectas o fallo al conectar con MongoDB" });
  }
});

// Endpoint para obtener la lista de películas
app.get("/movies", async (req, res) => {
  if (!db) {
    return res.status(401).json({ mensaje: "No te has autenticado. Inicia sesión primero." });
  }

  try {
    const movies = await db.collection("movies")
      .find({}, { 
        projection: { 
          poster: 1, 
          title: 1, 
          fullplot: 1, 
          plot: 1,
          year: 1, 
          genres: 1, 
          cast: 1, 
          directors: 1, 
          imdb: 1, 
          rated: 1 
        } 
      })
      .limit(50)
      .toArray();

    res.json(movies);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los datos de la colección" });
  }
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});