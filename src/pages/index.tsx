import * as React from "react";
import Head from "next/head";
import { HomePage } from "../components/home-page/home-page";

export interface IndexPageProps {
  notes: note[];
  setNotes: (note: note[]) => void;
}

const IndexPage: React.SFC<IndexPageProps> = ({ notes, setNotes }) => {
  
  return (
    <React.Fragment>
      <Head>
        <title>Notebook App</title>
        <meta
          name="description"
          content="Notebook app: Make notes for your daily work"
        />
      </Head>
      <HomePage notes={notes} setNotes={setNotes} />
    </React.Fragment>
  );
};

export default IndexPage;
