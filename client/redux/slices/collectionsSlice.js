import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCollectionData = createAsyncThunk("collections/fetchData", async (_,thunkAPI) => {
  try {
    const response = await fetch("http://localhost:3001/v1/cars", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
    return await response.json()
  } catch (error) {
    thunkAPI.rejectWithValue("try again later")
  }
});

export const fetchCollectionDataById = createAsyncThunk("collections/fetchDataById", async (id,thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:3001/v1/cars/details/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
      return await response.json()
    } catch (error) {
      thunkAPI.rejectWithValue("try again later")
    }
  });

export const getFilterData = createAsyncThunk("collections/fetchFilterData", async(query,thunkAPI) => {

  console.log(query)
  try {
    const response = await fetch(
      `http://localhost:3001/v1/cars/search?mileages=${query.mileages}&minYear=${query.minYear}&grade=${query.grade}&brand=${query.brand}&category=${query.category}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    )
   if(response.status !== 200) return thunkAPI.rejectWithValue(await response.json())
   return await response.json()
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
})

export const collectionsSlice = createSlice({
    name:"collections",
    initialState:{
        data:[],
        isLoading:false,
        errMessage:"",   
    },
    extraReducers:builder => {
        builder.addCase(fetchCollectionData.pending, (state,action) => {
            state.isLoading = true
        })
        builder.addCase(fetchCollectionData.fulfilled, (state,action) => {
            state.isLoading = false
            state.data = action.payload
        })
        builder.addCase(fetchCollectionData.rejected, (state,action) => {
            state.isLoading = false
            state.errMessage = action.payload
        });
        builder.addCase(fetchCollectionDataById.pending, (state,action) => {
            state.isLoading = true
        })
        builder.addCase(fetchCollectionDataById.fulfilled, (state,action) => {
            console.log(action)
            state.isLoading = false
            state.data = action.payload
        })
        builder.addCase(fetchCollectionDataById.rejected, (state,action) => {
            state.isLoading = false
            state.errMessage = action.payload
        })
        builder.addCase(getFilterData.pending, (state,action) => {
            state.isLoading = true
        })
        builder.addCase(getFilterData.fulfilled, (state,action) => {
            console.log(action)
            state.isLoading = false
            state.data = action.payload
        })
        builder.addCase(getFilterData.rejected, (state,action) => {
          console.log(action)
            state.isLoading = false
            state.errMessage = action.payload
        })
    }
})
