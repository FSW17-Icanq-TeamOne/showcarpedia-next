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
import React, {useState, useEffect} from "react";

function DashboardSideBarUser () {
    const [role, setRole] = useState(null);

    useEffect(() => {
        const getRole = localStorage.getItem('role');
        setRole(getRole);
    })

    return (
        <Box style={{ height: 'calc(100vh - 64px)' }}>
            <List>
                <Link href='/' style={{ textDecoration: 'none', color: 'black' }}>
                    <listItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <Home />
                            </ListItemIcon>
                            <ListItemText
                                primary='Home Page'
                                sx={{ display: { xs: 'none', sm: 'unset' }}}
                            />
                        </ListItemButton>
                    </listItem>
                </Link>

                <Link 
                    href='/edit/profile'
                    style={{ textDecoration: 'none', color: 'black' }}
                >
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <AccountCircle />
                            </ListItemIcon>
                            <ListItemText
                                primary='Profile'
                                sx={{ display: { xs: 'none', sm: 'unset'}}}
                            />
                        </ListItemButton>
                    </ListItem>
                </Link>

                <Link href='#' style={{ textDecoration: 'none', color: 'black' }}>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <Favorite />
                            </ListItemIcon>
                            <ListItemText
                                primary='Wishlist'
                                sx={{ display: { xs: 'none', sm: 'unset' }}}
                            />
                        </ListItemButton>
                    </ListItem>
                </Link>

                <Link
                    href='#'
                    style={{ textDecoration: 'none', color: 'black' }}
                >
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <ManageAccounts />
                            </ListItemIcon>
                            <ListItemText
                                primary='Account Settings'
                                sx={{ display: { xs: 'none', sm: 'unset' }}}
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
            <DashboardSidebarUser />
        </div>
    )
})