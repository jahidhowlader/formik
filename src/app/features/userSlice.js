import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import auth from '../../utils/firebase.config'
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";

const initialState = {
    name: "",
    email: "",
    isLoading: true,
    isError: false,
    error: ""
}

export const createUser = createAsyncThunk("userSlice/createUser", async ({ email, password, name }) => {

    console.log('15', email, password);

    const data = await createUserWithEmailAndPassword(auth, email, password)

    await updateProfile(auth.currentUser, {
        displayName: name
    })

    console.log('data', data);

    return {
        email: data.user.email,
        displayName: data.user.displayName
    }
})


export const loginUser = createAsyncThunk(
    'userSlice/loginUser',
    async ({ email, password }) => {

        const data = await signInWithEmailAndPassword(auth, email, password)

        console.log(46, data.user);
        return {
            email: data.user.email,
            displayName: data.user.displayName
        }
    }
)

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {

        setUser: (state, { payload }) => {

            state.name = payload.name
            state.email = payload.email
        },
        toggleLoading: (state, { payload }) => {
            state.isLoading = payload
        },
        logout: (state) => {

            state.name = ''
            state.email = ''
        }
    },
    extraReducers: (builder) => {

        // SIGNUP USECASE
        builder.addCase(createUser.pending, (state) => {
            state.isLoading = true
            state.isError = false
            state.email = ""
            state.name = ""
            state.error = ""
        })
            .addCase(createUser.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.isError = false
                state.email = payload.email
                state.name = payload.displayName
                state.error = ""
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.email = ""
                state.name = ""
                state.error = action.error.message
            })

        // SIGNIN USECASE
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true
            state.isError = false
            state.email = ''
            state.error = ''
            state.name = ''
        })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.isError = false
                state.email = payload.email
                state.name = state.name
                state.error = ''
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.email = ''
                state.name = ''
                state.error = action.error.message
            })
    }
})


export const { setUser, toggleLoading, logout } = userSlice.actions

export default userSlice.reducer