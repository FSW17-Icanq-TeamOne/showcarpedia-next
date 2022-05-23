import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchRoom = createAsyncThunk("chats/fetchRoom", async (_,thunkAPI) => {
        try {
            const response = await fetch("http://localhost:3001/v1/chat/room/", {
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

export const getRoomSlice = createSlice({
    name:"getRoom",
    initialState:{
        data:[],
        isLoading:false,
        errMessage:"",   
    },
    extraReducers:builder => {
        builder.addCase(fetchRoom.pending, (state,action) => {
            state.isLoading = true
        })
        builder.addCase(fetchRoom.fulfilled, (state,action) => {
            state.isLoading = false
            state.data = action.payload
        })
        builder.addCase(fetchRoom.rejected, (state,action) => {
            state.isLoading = false
            state.errMessage = action.payload
        });
    }
})