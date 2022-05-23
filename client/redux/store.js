import {configureStore} from "@reduxjs/toolkit"
import { accountSlice } from "./slices/accountSlice"
import { collectionsSlice } from "./slices/collectionsSlice"

export const store = configureStore({
    reducer:{
        account: accountSlice.reducer,
        collections: collectionsSlice.reducer
    }
})