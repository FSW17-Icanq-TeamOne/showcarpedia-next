import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const loginAccount = createAsyncThunk("account/login", async (values,thunkAPI) => {
    try {
        const response = await  fetch('http://localhost:4000/v1/login', {
            method: 'POST',
            headers: { 
                Accept: 'application/json',
                'Content-Type': 'application/json' },
            body: JSON.stringify(values),   
        })
        const data = await response.json()
        if(response.status === 200){
            return data
        } else {
            return thunkAPI.rejectWithValue(data)
        }
    } catch (error) {
        return thunkAPI.rejectWithValue("try again later")
    }
})

export const registerAccount = createAsyncThunk("account/register", async (values,thunkAPI) => {
    console.log(values)
    try {
        const response = await  fetch('http://localhost:4000/v1/register', {
            method: 'POST',
            headers: { 
                Accept: 'application/json',
                'Content-Type': 'application/json' },
            body: JSON.stringify(values),   
        })
        const data = await response.json()

        if(response.status === 201){
            return data
        } else {
            return thunkAPI.rejectWithValue(data)
        }
    } catch (error) {
        return thunkAPI.rejectWithValue("try again later")
    }
})

export const accountSlice = createSlice({
    name: "account",
    initialState:{
        data:{},
        isLoading:false,
        errMessage:"",
        isAuth:false
    },
    extraReducers:builder =>{
        builder.addCase(loginAccount.pending,(state,action) => {
            state.isLoading = true
        })
        builder.addCase(loginAccount.fulfilled,(state,action) => {
            state.isLoading = false
            state.data = action.payload
            state.isAuth = true
        })
        builder.addCase(loginAccount.rejected,(state,action) => {
            state.isLoading = false,
            state.errMessage = action.payload
        })
        builder.addCase(registerAccount.pending,(state,action) => {
            state.isLoading = true
        })
        builder.addCase(registerAccount.fulfilled,(state,action) => {
            state.isLoading = false
            state.data = action.payload
            state.isAuth = true
        })
        builder.addCase(registerAccount.rejected,(state,action) => {
            state.isLoading = false,
            state.errMessage = action.payload
        })
    }
})