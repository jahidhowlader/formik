import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

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

const FormField = () => {

    const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: values => {
            console.log('from form', values);
        }
    })

    return (
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
                />
                {
                    errors.name && <span color='red'>{errors.name}</span>
                }
            </FormControl>

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

            <Button
                mt={4}
                colorScheme='teal'
                // isLoading={props.isSubmitting}
                type='submit'
            >
                Submit
            </Button>
        </form>
    );
};

export default FormField;