const { MongoClient } = require('mongodb');

const url = "mongodb+srv://davilopes:1234@cluster0.s9nkkby.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(url);

async function conectarDb() {
  await client.connect();
  console.log("Conectado ao MongoDB Atlas com sucesso!");
  
  return client.db("agenda");
}

module.exports = { conectarDb };
