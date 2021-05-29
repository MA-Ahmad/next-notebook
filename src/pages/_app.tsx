import * as React from "react";
import { useRouter } from 'next/router';
import { AppProps } from "next/app";
import { ChakraProvider, Box, theme } from "@chakra-ui/react";
import { TopNav } from "../components/layout/top-nav";
import { PageFooter } from "../components/layout/page-footer";
import "assets/stylesheets/carousel.css";

const App = ({ Component, pageProps }: AppProps) => {
  const [notes, setNotes] = React.useState<note[]>([]);
  const router = useRouter()

  React.useEffect(() => {
    const dummyNotes = [
      {
        id: "Odork5n5jPVd0wvm0w_dY",
        title: "Hey 👋",
        body:
          "I'm dummy note here. Try to update me. Click me to see my remaining part. You can also delete me 😔. But I'll be here again by reopening the app link 😃. "
      }
    ];
    setNotes(dummyNotes);
  }, []);

  console.log(pageProps)
  const handleNoteCreate = (note: note) => {
    const newNotesState: note[] = [...notes];
    newNotesState.push(note);
    setNotes(newNotesState);
    router.push('/')
  };

  const updateNote = (newNotes: note[]) => {
    setNotes(newNotes)
  }

  return (
    <Box maxW="1050px" mx="auto">
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl" p={5}>
        <TopNav handleNoteCreate={handleNoteCreate} />
        <Component {...pageProps} notes={notes} setNotes={updateNote} />
        <PageFooter />
      </Box>
    </ChakraProvider>
    </Box>
  );
};

export default App;
