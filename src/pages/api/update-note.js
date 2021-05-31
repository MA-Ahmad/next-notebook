import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "PUT") {
    const { id, title, body } = req.body;

    const newNote = {
      title,
      body
    };

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
      await db.collection("notes").findOneAndUpdate(
        { id: id },
        { $set: { title: title, body: body } },
        {
          new: true
        }
      );
    } catch (error) {
      client.close();
      console.log(error);
      res.status(500).json({ message: "Error" });
      return;
    }

    client.close();

    res
      .status(201)
      .json({ message: "Successfully updated note!", note: newNote });
  }
}

export default handler;
