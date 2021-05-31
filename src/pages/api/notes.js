import { MongoClient } from "mongodb";

async function handler() {
  const connectionString =
    "mongodb+srv://next_blog:lbxaIA8rnFhQukEJ@cluster0.j2ej3.mongodb.net/next-blog?retryWrites=true&w=majority";
  let client = await MongoClient.connect(connectionString);
  const db = client.db();
  const result = await db.collection("notes");
  const notes = await result.find().toArray();
  client.close();

  return notes;
}

export default handler;
