import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/userSlice';

const store = configureStore({
    reducer: {
        userSlice: userSlice
    },
    //   middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware().concat(baseApi.middleware)
});

export default store;