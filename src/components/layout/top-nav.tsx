import * as React from "react";
import {
  Box,
  Text,
  Flex,
  Spacer,
  Heading,
  Menu,
  MenuItem,
  MenuDivider,
  MenuButton,
  IconButton,
  MenuList,
  HStack,
  Button,
  useDisclosure
} from "@chakra-ui/react";
import Link from 'next/link'
import { AddIcon, HamburgerIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { ColorModeSwitcher } from "ColorModeSwitcher";
import NoteForm from "../home-page/note-form";
import { motion } from "framer-motion";

export interface TopNavProps {
  handleNoteCreate?: (note: note) => void;
}

export const TopNav: React.SFC<TopNavProps> = ({ handleNoteCreate }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex mb={"30px"} align="center">
        <HStack>
          <Link href="/">
          <Box p="2">
            <motion.div whileHover={{ scale: 1.1 }}>
              <Heading
                as="h1"
                size="xl"
                bgGradient="linear(to-l, #7928CA,#FF0080)"
                bgClip="text"
                _focus={{ boxShadow: "none", outline: "none" }}
                _hover={{
                  textDecoration: "none",
                  bgGradient: "linear(to-r, red.500, yellow.500)"
                }}
              >
                Notebook App
              </Heading>
            </motion.div>
          </Box>
          </Link>
        </HStack>
        <Spacer />
        <Box>
          <HStack>
            <HStack d={["none", "none", "block"]}>
              <Button
                leftIcon={<AddIcon />}
                bgGradient="linear(to-l, #7928CA,#FF0080)"
                _hover={{ bgGradient: "linear(to-r, red.500, yellow.500)" }}
                variant="solid"
                size="sm"
                onClick={onOpen}
              >
                Add new note
              </Button>
              <Link href="/projects">
              <Button
                leftIcon={<ArrowRightIcon />}
                bgGradient="linear(to-l, #7928CA,#FF0080)"
                _hover={{ bgGradient: "linear(to-r, red.500, yellow.500)" }}
                variant="solid"
                size="sm"
              >
                Open source
              </Button>
              </Link>
            </HStack>
            <Box d={["block", "block", "none"]}>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<HamburgerIcon />}
                  transition="all 0.2s"
                  size="md"
                  variant="outline"
                  _hover={{ bg: "gray.400" }}
                  _focus={{ boxShadow: "outline" }}
                />
                <MenuList fontSize="sm" zIndex={5}>
                  <MenuItem icon={<AddIcon />} onClick={onOpen}>
                    {" "}
                    <Text textShadow="1px 1px #9c1786">Add new note</Text>
                  </MenuItem>
                  <MenuDivider />
                  <Link href="/projects">
                  <MenuItem icon={<ArrowRightIcon />}>
                    {" "}
                    <Text textShadow="1px 1px #9c1786">
                      Open source repositories
                    </Text>
                  </MenuItem>
                  </Link>
                </MenuList>
              </Menu>
            </Box>
            <ColorModeSwitcher justifySelf="flex-end" />
          </HStack>
        </Box>
      </Flex>
      <NoteForm
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};
