const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const uri = "mongodb://Emma:Emma832005@ac-ouxyigx-shard-00-00.yn0gme8.mongodb.net:27017,ac-ouxyigx-shard-00-01.yn0gme8.mongodb.net:27017,ac-ouxyigx-shard-00-02.yn0gme8.mongodb.net:27017/sample_mflix?ssl=true&replicaSet=atlas-r4kzsp-shard-0&authSource=admin&appName=Cluster0";
const client = new MongoClient(uri);

async function conectarMongoDB() {
  try {
    await client.connect();
    console.log("Conectado a MongoDB");
    return client.db("sample_mflix"); 
  } catch (error) {
    console.error("Error en la conexion a MongoDB:", error);
    process.exit(1);
  }
}

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

let db;

conectarMongoDB().then(database => {
  db = database;
  console.log("Base de datos lista...");
});

app.get("/movies", async (req, res) => {
  if (!db) {
    return res.status(500).json({ mensaje: "La base de datos aún no está lista" });
  }

  try {
    const movies = await db.collection("movies")
      .find({}, { projection: { poster: 1, title: 1, fullplot: 1 } })
      .limit(50)
      .toArray();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los datos de la coleccion" });
  }
});

app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});
