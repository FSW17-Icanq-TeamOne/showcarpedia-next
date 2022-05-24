import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchChats = createAsyncThunk("chats/fetchChats", async (_,thunkAPI) => {
    try {
        const response = await fetch("http://localhost:3001/v1/chat/chat/", {
            method: "GET",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    credentials: "include",
    })
    return await response.json()
}catch (error) {
    thunkAPI.rejectWithValue("try again later")
}
});

export const getChatsSlice = createSlice({
    name:"getChats",
    initialState:{
        data:[],
        isLoading:false,
        errMessage:"",   
    },
    extraReducers:builder => {
        builder.addCase(fetchChats.pending, (state,action) => {
            state.isLoading = true
        })
        builder.addCase(fetchChats.fulfilled, (state,action) => {
            state.isLoading = false
            state.data = action.payload
        })
        builder.addCase(fetchChats.rejected, (state,action) => {
            state.isLoading = false
            state.errMessage = action.payload
        });
    }
})