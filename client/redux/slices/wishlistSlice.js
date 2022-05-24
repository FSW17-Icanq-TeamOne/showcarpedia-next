import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchWishlistData = createAsyncThunk("wishlist/fetchData", async (_,thunkAPI) => {
    try {
        const response = await fetch("http://localhost:3001/v1/wishlist", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
          })
          if(response.status !== 200) return thunkAPI.rejectWithValue(await response.json())
          return await response.json()
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const addWishlist = createAsyncThunk("wishlist/addWishlist", async (id,thunkAPI) => {
    try {
        const response = await fetch('http://localhost:3001/v1/wishlist', {
        method: 'post',
        headers: { 
            Accept: 'application/json',
            "Content-Type": 'application/json',
          },
        credentials: "include",
        body: JSON.stringify({ProductId:id})
    })
    return await response.json()
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const deleteWishlist = createAsyncThunk("wishlist/deleteWishlist", async (id,thunkAPI) => {
    try {
      const response =   await fetch("http://localhost:3001/v1/wishlist/delete",{
            method:"delete",
            headers: { 
              Accept: 'application/json',
              "Content-Type": 'application/json',
            },
          credentials: "include",
          body: JSON.stringify({ProductId:id})
          })
        return await response.json()
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const wishlistSlice = createSlice({
    name:"wishlist",
    initialState:{
        isloading: false,
        data:[],
        message:""
    },
    extraReducers: builder => {
        builder.addCase(fetchWishlistData.pending,(state,action) => {
            state.isloading = true
        })
        builder.addCase(fetchWishlistData.fulfilled,(state,action) => {
            state.isloading = false
            state.data = action.payload.map(data => data.Product)
        })
        builder.addCase(fetchWishlistData.rejected,(state,action) => {
            state.isloading = false
            state.message = action.payload
        })
        builder.addCase(addWishlist.pending,(state,action) => {
            state.isloading = true
        })
        builder.addCase(addWishlist.fulfilled,(state,action) => {
            state.message = action.payload.message
            state.isloading = false
            
        })
        builder.addCase(addWishlist.rejected,(state,action) => {
            state.isloading = false
            state.message = action.payload
        })
        builder.addCase(deleteWishlist.pending,(state,action) => {
            state.isloading = true
        })
        builder.addCase(deleteWishlist.fulfilled,(state,action) => {
            state.data = state.data.filter(datum => datum.id !== action.payload.id)
            state.isloading = false
            state.message = action.payload.message
        })
        builder.addCase(deleteWishlist.rejected,(state,action) => {
            state.isloading = false
            state.message = action.payload
        })
    }
})