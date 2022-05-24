import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchRoomLists = createAsyncThunk("chats/fetchRoomLists", async (_,thunkAPI) => {
        try {
            const response = await fetch("http://localhost:3001/v1/chat/rooms/", {
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

export const getRoomListsSlice = createSlice({
    name:"getRoomLists",
    initialState:{
        data:[],
        isLoading:false,
        errMessage:"",   
    },
    extraReducers:builder => {
        builder.addCase(fetchRoomLists.pending, (state,action) => {
            state.isLoading = true
        })
        builder.addCase(fetchRoomLists.fulfilled, (state,action) => {
            state.isLoading = false
            state.data = action.payload
        })
        builder.addCase(fetchRoomLists.rejected, (state,action) => {
            state.isLoading = false
            state.errMessage = action.payload
        });
    }
})