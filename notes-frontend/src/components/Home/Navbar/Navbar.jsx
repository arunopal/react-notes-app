import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '../../../redux/users/user_types';

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const {auth, user, token, loading, error} = useSelector((state)=>state.userReducer)
  return (
    <>
      <Box zIndex={"9999"} top = {0} position = {"fixed"} w = {"100%"} boxShadow = {"rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;"}
      bg={"#5b9cf2"} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box fontWeight={"bold"} cursor="pointer" onClick={()=>{
            nav("/")
          }}>React Notes App</Box>
          <Flex alignItems={'center'}>
            <Stack alignItems = {"center"} direction={'row'} spacing={7}>
              <Button display={auth?"block":"none"} bg={"#01d8fb"} onClick={()=>{
                nav("/notes")
              }}>All Notes</Button>
              <Button display={auth?"none":"block"} bg={"#01d8fb"} onClick={()=>{
                nav("/login")
              }}>Log In</Button>
              <Button display={auth?"none":"block"} bg={"#01d8fb"} onClick={()=>{
                nav("/register")
              }}>Sign Up</Button>
              <Button bg = {"#01d8fb"} onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton display={auth?"block":"none"}
                  as={Button}
                  border = "2px solid #5b9cf2"
                  padding = {2}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={"/user.png"}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'lg'}
                      src={'/user.png'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{user}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem onClick={()=>{
                    dispatch({type: LOGOUT})
                    }}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}