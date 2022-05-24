import React from 'react'
import io from 'socket.io-client'
const SocketContext = React.createContext()
const SocketProvider = ({children}) => {
    const ENDPOINT = 'http://localhost:3001'
    const socket =  io("http://localhost:3001", {transports: ['websocket']})
    return(
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}
export {SocketContext, SocketProvider}