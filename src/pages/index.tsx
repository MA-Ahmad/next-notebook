import * as React from "react";
import Head from "next/head";
import { HomePage } from "../components/home-page/home-page";
import { MongoClient } from "mongodb";

export interface IndexPageProps {
  notes: note[];
  setNotes: (note: note[]) => void;
}

const IndexPage: React.SFC<IndexPageProps> = props => {
  const [notes, setNotes] = React.useState<note[]>([]);

  React.useEffect(() => {
    const dummyNotes = [
      {
        id: "Odork5n5jPVd0wvm0w_dY",
        title: "Hey 👋",
        body:
          "I'm dummy note here. Try to update me. Click me to see my remaining part. You can also delete me 😔. But I'll be here again by reopening the app link 😃. "
      }
    ];
    const newNotes = [...dummyNotes, ...props.notes];
    setNotes(newNotes);
    console.log(newNotes);
  }, [props.notes]);

  const updateNotes = (newNotes: note[]) => {
    setNotes(newNotes);
  };

  return (
    <React.Fragment>
      <Head>
        <title>Notebook App</title>
        <meta
          name="description"
          content="Notebook app: Make notes for your daily work"
        />
      </Head>
      <HomePage notes={notes} setNotes={updateNotes} />
    </React.Fragment>
  );
};

export async function getStaticProps() {
  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}/${process.env.mongodb_database}?retryWrites=true&w=majority`;
  let client = await MongoClient.connect(connectionString);
  const db = client.db();
  const result = await db.collection("notes");
  const notes = await result.find().toArray();
  client.close();

  return {
    props: {
      notes: notes.map(note => ({
        // id: note._id.toString(),
        id: note.id,
        title: note.title,
        body: note.body
      }))
    },
    revalidate: 1
  };
}

export default IndexPage;
