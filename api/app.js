// app.js

const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require("pg");
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Replace the following connection string with your PostgreSQL connection details
const connectionString =
  "postgresql://dah:era.a@localhost:5432/BUSCACEP";
const client = new Client({
  connectionString: connectionString,
});
client.connect();

// Define a route to insert data into the database
app.post("/enderecos", async (req, res) => {
  try {
    const { cep, logradouro, complemento, bairro, localidade, uf, ibge, ddd } =
      req.body;
    
    console.log(req.body);

    const result = await client.query(
      "INSERT INTO enderecos(cep, logradouro, complemento, bairro, localidade, uf, ibge, ddd) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [cep, logradouro, complemento, bairro, localidade, uf, ibge, ddd]
    );

    const novoEndereco = result.rows[0];
    res.json(novoEndereco);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
