import { Flex, Heading, List, ListItem } from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { logout } from '../app/features/userSlice';
import { signOut } from "firebase/auth";
import auth from '../utils/firebase.config';



const Navbar = () => {

    const { email } = useSelector((state) => state.userSlice)

    const dispatch = useDispatch()

    const handleLogout = () => {

        signOut(auth)
        dispatch(logout())

    }

    console.log('nav', email);

    return (
        <>
            <Flex as="nav" bg="black" color="white" p={3} alignItems="center" justifyContent="space-between">
                <Link to="/">
                    <Heading as="h3" fontSize="24px">Authentication</Heading>
                </Link>

                <List style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {
                        email ? <>
                            <ListItem>
                                <Link onClick={handleLogout} to='/login'>Logout</Link>
                            </ListItem>
                        </> : <>
                            <ListItem>
                                <Link to='/login'>Login</Link>
                            </ListItem>
                            <ListItem>
                                <Link to='/signup'>SignUp</Link>
                            </ListItem>
                        </>
                    }
                </List>
            </Flex>
        </>
    );
};

export default Navbar;