import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { createUser, loginUser } from '../../../app/features/userSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const initialValues = {
    email: "",
    password: "",
}

const validationSchema = Yup.object({
    email: Yup.string().email('Please enter valid email').required('Please enter your email'),
})


const Login = () => {

    const dispath = useDispatch()
    const { error, email, isLoading } = useSelector((state) => state.userSlice)
    const navigate = useNavigate()

    useEffect(() => {

        if (!isLoading && email) {
            return navigate('/')
        }
    }, [isLoading, email, error])


    const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: values => {
            console.log('from form', values);

            dispath(loginUser({
                email: values.email,
                password: values.password,
            }))

            if (email) {
                alert('Successfully Login')
            }
        }
    })

    return (
        <>
            <Flex justifyContent="center" alignItems="center" h="100vh">
                <Box border="1px solid" p={5}>
                    <Heading as="h4">Login</Heading>

                    <form onSubmit={handleSubmit}>
                        <FormControl mt={5}>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                name='email'
                                type='email'
                                placeholder='Email'
                                value={values.email}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                        </FormControl>
                        {
                            errors.email && <span style={{ color: 'red' }}>{errors.email}</span>
                        }

                        <FormControl mt={5}>
                            <FormLabel>Password</FormLabel>
                            <Input
                                name='password'
                                type='password'
                                placeholder='Password'
                                value={values.password}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            {
                                errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>
                            }
                        </FormControl>

                        <Button
                            mt={4}
                            colorScheme='teal'
                            // isLoading={props.isSubmitting}
                            type='submit'
                        >
                            Submit
                        </Button>
                    </form>
                </Box>
            </Flex>

        </>
    );
};

export default Login;