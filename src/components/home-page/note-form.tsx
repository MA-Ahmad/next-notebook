import * as React from "react";
import {
  Button,
  ModalContent,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  useToast
} from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export interface NoteFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedNote?: note;
}

type FormInputs = {
  title: string;
  body: string;
};

const NoteForm: React.SFC<NoteFormProps> = ({
  isOpen,
  onClose,
  selectedNote
}) => {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = React.useState<boolean>(false);
  const { register, handleSubmit, formState, errors } = useForm<FormInputs>({
    mode: "onChange"
  });

  const onSubmit: SubmitHandler<FormInputs> = data => {
    let newNote: note = {
      id: "",
      title: data.title,
      body: data.body
    };
    if (selectedNote) {
      newNote.id = selectedNote ? selectedNote.id : "";
      handleUpdate(newNote);
    } else {
      newNote.id = nanoid();
      handleCreate(newNote);
    }
  };

  async function handleUpdate(note: note) {
    setLoading(true);
    const response = await fetch("/api/update-note", {
      method: "PUT",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    if (!response.ok) {
      setLoading(false);
      throw new Error(data.message || "Something went wrong!");
    } else {
      setLoading(false);
      showToast("Note updated.");
      router.replace(router.asPath);
      onClose();
    }
  }

  async function handleCreate(note: note) {
    setLoading(true);
    const response = await fetch("/api/create-note", {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    if (!response.ok) {
      setLoading(false);
      throw new Error(data.message || "Something went wrong!");
    } else {
      setLoading(false);
      showToast("Note created.");
      router.push('/');
      onClose();
    }
  }

  const showToast = title => {
    toast({
      title: title,
      status: "success",
      position: "top",
      duration: 2000,
      isClosable: true
    });
  };

  const validateTitle = (value: string) => {
    if (!value) {
      return "Title is required";
    } else return true;
  };

  const validateBody = (value: string) => {
    if (!value) {
      return "Body is required";
    } else return true;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>{selectedNote ? "Edit" : "Create"} a Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={!!errors?.title} isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                placeholder="Title"
                defaultValue={selectedNote?.title}
                ref={register({ validate: validateTitle })}
              />
              <FormErrorMessage>
                {!!errors?.title && errors?.title?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl size="lg" mt={4} isInvalid={!!errors?.body} isRequired>
              <FormLabel>Body</FormLabel>
              <Textarea
                name="body"
                placeholder="Body"
                size="md"
                borderRadius="5px"
                defaultValue={selectedNote?.body}
                ref={register({ validate: validateBody })}
              />
              <FormErrorMessage>
                {!!errors?.body && errors?.body?.message}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              isLoading={loading}
              colorScheme="blue"
              // isLoading={formState.isSubmitting}
              mr={3}
            >
              {selectedNote ? "Update" : "Save"}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default NoteForm;
