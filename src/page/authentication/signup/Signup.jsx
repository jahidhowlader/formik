import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { createUser } from '../../../app/features/userSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
}

const validationSchema = Yup.object({
    name: Yup.string().required('Please enter your name'),
    email: Yup.string().email('Please enter valid email').required('Please enter your email'),
    password: Yup.string().required('Password is required').min(6),
    confirmPassword: Yup.string().required('Confirm Password is required').oneOf([Yup.ref('password')], `Password doesn't match`)
})


const Signup = () => {

    const dispath = useDispatch()
    const { error, email, isLoading } = useSelector((state) => state.userSlice)
    const navigate = useNavigate()

    console.log('checkError', error);

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

            dispath(createUser({
                email: values.email,
                password: values.password,
                name: values.name,
            }))
        }
    })

    console.log('values', values);

    return (
        <>
            <Flex justifyContent="center" alignItems="center" h="100vh">
                <Box border="1px solid" p={5}>
                    <Heading as="h4">SignUp</Heading>

                    <form onSubmit={handleSubmit}>

                        <FormControl w="300px" mt={5}>
                            <FormLabel>Name</FormLabel>
                            <Input
                                name='name'
                                type='text'
                                placeholder='Name'
                                value={values.name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                w="100%"
                            />
                        </FormControl>
                        {
                            errors.name && <span style={{ color: 'red' }}>{errors.name}</span>
                        }

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

                        <FormControl mt={5}>
                            <FormLabel>Confirm Password</FormLabel>
                            <Input
                                name='confirmPassword'
                                type='password'
                                placeholder='Confirm Password'
                                value={values.confirmPassword}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                        </FormControl>
                        {
                            errors.confirmPassword && <Text style={{ color: 'red' }}>{errors.confirmPassword}</Text>
                        }

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

export default Signup;