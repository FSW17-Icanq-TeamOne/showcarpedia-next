import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUname = createAsyncThunk("chats/fetchUname", async (_,thunkAPI) => {
    try {
        const response = await fetch("http://localhost:3001/v1/chat/name/", {
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

export const getUnameSlice = createSlice({
    name:"getUname",
    initialState:{
        data:[],
        isLoading:false,
        errMessage:"",   
    },
    extraReducers:builder => {
        builder.addCase(fetchUname.pending, (state,action) => {
            state.isLoading = true
        })
        builder.addCase(fetchUname.fulfilled, (state,action) => {
            state.isLoading = false
            state.data = action.payload
        })
        builder.addCase(fetchUname.rejected, (state,action) => {
            state.isLoading = false
            state.errMessage = action.payload
        });
    }
})