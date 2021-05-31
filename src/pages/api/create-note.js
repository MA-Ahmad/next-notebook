import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { id, title, body } = req.body;

    const newNote = {
      id,
      title,
      body
    };

    let client;

    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}/${process.env.mongodb_database}?retryWrites=true&w=majority`;
    // const connectionString =
    //   "mongodb+srv://next_blog:lbxaIA8rnFhQukEJ@cluster0.j2ej3.mongodb.net/next-blog?retryWrites=true&w=majority";
    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res.status(500).json({ message: "Could not connect to database." });
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection("notes").insertOne(newNote);
      newNote.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Storing notes failed!" });
      return;
    }

    client.close();

    res
      .status(201)
      .json({ message: "Successfully stored note!", note: newNote });
  }
}

export default handler;
