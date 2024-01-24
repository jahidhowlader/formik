import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import auth from '../utils/firebase.config';
import { setUser, toggleLoading } from '../app/features/userSlice';

const PrivateRoute = ({ children }) => {
    const { pathname } = useLocation();

    const { email, isLoading } = useSelector((state) => state.userSlice)

    // console.log(email);
    // console.log(name);
    // console.log(isLoading);

    const dispatch = useDispatch()

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user) {

                dispatch(setUser({
                    name: user.displayName,
                    email: user.email
                }))

                dispatch(toggleLoading(false))
            } else {

                dispatch(toggleLoading(false))
            }
        })
    }, [])

    // console.log('email', email);
    // console.log('isLoading', isLoading);

    if (isLoading) {
        return "Loading"
    }

    if (!isLoading && !email) {
        return <Navigate to="/login" state={{ path: pathname }} />;
    }

    return children;
};

export default PrivateRoute;
