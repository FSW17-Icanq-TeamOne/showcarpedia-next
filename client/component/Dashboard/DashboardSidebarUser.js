import {
    Home,
    AccountCircle,
    Favorite,
    Forum,
    ManageAccounts,
} from "@mui/icons-material";
import {
    Box,
    ListItem,
    ListItemText,
    ListItemIcon,
    ListItemButton,
    List,
    Link,
} from "@mui/material";
import React, {useState, useEffect, useContext} from "react";
import {MainContext} from '../../context/mainContext'
import {SocketContext} from '../../context/socketContext'

function DashboardSideBarUser () {
    const [role, setRole] = useState(null);
    const {room, setRoom} = useContext(MainContext)
    const socket = useContext(SocketContext)

    useEffect(() => {
        const getRole = localStorage.getItem('role');
        setRole(getRole);
    })

    const handleClick = () => {
      socket.emit('login', {room}, error => {
          if (error) {
              console.log(error)
          }
      })
 }

    return (
        <Box style={{ height: "calc(100vh - 64px)" }}>
        <List>
          <Link href="/" style={{ textDecoration: "none", color: "black" }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText
                  primary="Home Page"
                  sx={{ display: { xs: "none", sm: "unset" } }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
  
          <Link
            href="/user/profile/edit"
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText
                  primary="Profile"
                  sx={{ display: { xs: "none", sm: "unset" } }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
  
          <Link href="/wishlist" style={{ textDecoration: "none", color: "black" }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Favorite />
                </ListItemIcon>
                <ListItemText
                  primary="Wishlists"
                  sx={{ display: { xs: "none", sm: "unset" } }}
                />
              </ListItemButton>
            </ListItem>
          </Link>

          {role === "user" && (
          <Link href="/user/chat" style={{ textDecoration: "none", color: "black" }}>
            <ListItem disablePadding >
              <ListItemButton button onClick={handleClick}>
                <ListItemIcon>
                  <Forum />
                </ListItemIcon>
                <ListItemText
                  primary="Chat Room"
                  sx={{ display: { xs: "none", sm: "unset" } }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
          )}

          <Link
            href="/user/account/edit"
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ManageAccounts />
                </ListItemIcon>
                <ListItemText
                  primary="Account Settings"
                  sx={{ display: { xs: "none", sm: "unset" } }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </Box>
    )
}

export const UserSidebar = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} {...props}>
            <DashboardSideBarUser />
        </div>
    )
})