import { Box, Button, Grid, IconButton, Input, Textarea, useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotes, createNotes } from "../redux/notes/note_actions";
import NoteCard from "../components/Notes/NoteCard/NoteCard";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";

export default function Notespage()
{
    const dispatch = useDispatch()
    const {loading, error, data} = useSelector((state)=>state.noteReducer)
    const [notes, setNotes] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    useEffect(()=>{
        dispatch(getNotes())
    }, [])

    useEffect(()=>{
        setNotes(data)
    }, [data])

    const createNote = ()=>{
        dispatch(createNotes({title, body}))
        onClose()
    }

    return <Box mt={20} padding={8}>
        <Grid gap={10} w={"100%"} margin={"auto"} gridTemplateColumns="repeat(4, 1fr)">
            {notes?.map((el)=><NoteCard {...el}/>)}
        </Grid>
        <>
        <IconButton boxShadow={"rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;"} position={"fixed"} w={"100px"} h={"100px"} bg={"#5b9cf2"} bottom={0} right={0} margin={16} icon={<AddIcon fontSize={30} />} 
        onClick={onOpen}></IconButton>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create New Note</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>

                <Input value={title}m placeholder="Please enter title" onChange={(e)=>setTitle(e.target.value)}></Input>
                <Textarea mt={8} value={body} placeholder={'Please enter description'} onChange={(e)=>setBody(e.target.value)}></Textarea>
              
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={createNote}>
                Create
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        </>
    </Box>
}