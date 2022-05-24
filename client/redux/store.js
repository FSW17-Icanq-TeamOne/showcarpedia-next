import { configureStore } from "@reduxjs/toolkit"
import { accountSlice } from "./slices/accountSlice"
import { collectionsSlice } from "./slices/collectionsSlice"
import { getRoomSlice } from "./slices/chatsSlice/getRoomSlice"
import { getUnameSlice } from "./slices/chatsSlice/getUnameSlice"
import { getChatsSlice } from "./slices/chatsSlice/getChats"
import { getRoomListsSlice } from "./slices/chatsSlice/getRoomLists"
import { carMakeSlice } from "./slices/carMakeSlice"
import { wishlistSlice } from "./slices/wishlistSlice"

export const store = configureStore({
    reducer:{
        account: accountSlice.reducer,
        collections: collectionsSlice.reducer,
        getRoom: getRoomSlice.reducer,
        getUname: getUnameSlice.reducer,
        getChats: getChatsSlice.reducer,
        getRoomLists: getRoomListsSlice.reducer,
        carMake:carMakeSlice.reducer,
        wishlist: wishlistSlice.reducer
    }
})