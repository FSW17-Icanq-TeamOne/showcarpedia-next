import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCarMakeData = createAsyncThunk("carMake/fetchData", async (_,thunkAPI) => {
    try {
        const response = await fetch("http://localhost:3001/v1/cars/make/", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
          return await response.json();
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})  


export const carMakeSlice = createSlice({
    name:"carMake",
    initialState:{
        isLoading:false,
        brands:[],
        categories:[],
        year:[],
        mileages:["1000","5000","10000","20000","50000"],
        grades:["1","2","3","4","5"],
        errMessage:""
    },
    extraReducers:builder => {
        builder.addCase(fetchCarMakeData.pending,(state,action) => {
            state.isLoading = true
        })
        builder.addCase(fetchCarMakeData.fulfilled,(state,action) => {
            state.brands = action.payload.brand.sort()
            state.categories = action.payload.category.sort()
            state.year = action.payload.year.map(e => e.year)
            state.isLoading = false
        })
        builder.addCase(fetchCarMakeData.rejected,(state,action) => {
            state.isLoading = false
            state.errMessage = action.payload
        })
    
    }
    
})