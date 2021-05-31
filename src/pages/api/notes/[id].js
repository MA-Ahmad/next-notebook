import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "DELETE") {
    const { id } = req.query;
    let client;
    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}/${process.env.mongodb_database}?retryWrites=true&w=majority`;
    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res.status(500).json({ message: "Could not connect to database." });
      return;
    }
    const db = client.db();
    try {
      await db.collection("notes").findOneAndDelete({ id: id });
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Error" });
      return;
    }

    client.close();
  }
}

export default handler;
