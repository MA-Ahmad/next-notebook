import * as React from "react";
import { Heading, Box, SimpleGrid, Flex } from "@chakra-ui/react";
import Head from "next/head";
import repositoriesList from "data/repositories-list";
import { motion } from "framer-motion";
import RepositoriesListItem from "../../components/projects/repositories-list-item";
import { AnimatePage } from "../../components/motion/motion";

const IndexPage = props => {
  return (
    <>
      <Head>
        <title>Notebook | Projects</title>
        <meta
          name="description"
          content="Notebook app: Make notes for your daily work"
        />
      </Head>
      <AnimatePage>
        <Box minH={"50vh"}>
          <Flex p="2" justifyContent="center">
            <Heading
              as="h1"
              size="xl"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
              _focus={{ boxShadow: "none", outline: "none" }}
              _hover={{
                textDecoration: "none",
                bgGradient: "linear(to-r, red.500, yellow.500)"
              }}
            >
              Repositories
            </Heading>
          </Flex>
          {/* <SlideFade in={true} offsetY="50vh"> */}
          <SimpleGrid
            columns={[1, 2, 2, 3]}
            mt="40px"
            gridGap="10px"
            position="relative"
            overflow="hidden"
          >
            {props.repos.map((repo, index) => (
              <motion.div whileHover={{ y: -10 }} key={index}>
                <RepositoriesListItem repo={repo} />
              </motion.div>
            ))}
          </SimpleGrid>
          {/* </SlideFade> */}
        </Box>
      </AnimatePage>
    </>
  );
};

export function getStaticProps() {
  const repositories_list = repositoriesList;

  return {
    props: {
      repos: repositories_list
    }
  };
}

export default IndexPage;
