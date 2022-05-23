import { configureStore } from "@reduxjs/toolkit"
import { accountSlice } from "./slices/accountSlice"
import { collectionsSlice } from "./slices/collectionsSlice"
import { getRoomSlice } from "./slices/chatsSlice/getRoomSlice"
import { getUnameSlice } from "./slices/chatsSlice/getUnameSlice"
import { getChatsSlice } from "./slices/chatsSlice/getChats"

export const store = configureStore({
    reducer:{
        account: accountSlice.reducer,
        collections: collectionsSlice.reducer,
        getRoom: getRoomSlice.reducer,
        getUname: getUnameSlice.reducer,
        getChats: getChatsSlice.reducer
    }
})