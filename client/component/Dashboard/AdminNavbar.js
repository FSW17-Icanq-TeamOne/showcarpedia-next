import {
    AppBar,
    Container,
    IconButton,
    Box,
    Tooltip,
    Avatar,
    Grid,
    Toolbar,
    Grow,
    Typography,
    MenuItem,
    Menu,
    Link,
} from "@mui/material";
import { Menu as MenuIcon, DirectionsCar } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import {AdminSidebar} from './DashboardSidebarAdmin';

export default function AdminNavbar () {
    const [cookie, setCookie, removeCookie] = useCookies('access_token');
    const [isToggle, setIsToggle] = useState(true);
    const [avatar, setAvatar] = useState("https://media.discordapp.net/attachments/960564590574456852/965225077069193326/jhondoe.jpg?width=559&height=559")
    
    const removeAccessToken = () => {
        window.localStorage.clear();
        removeCookie('access_token');
    };

    useEffect(() => {
        fetch("http://localhost:3001/v1/user/profile/", {
            credentials: "include",
        })
            .then((data) => data.json())
            .then((data) => {
                if(data.profilePicture !== null){
                    setAvatar(data.profilePicture)
                }
                })
            .catch((err) => console.log(err));
        }, []);

    useEffect(() => {
        fetch("http://localhost:3001/v1/user/account/", {
            credentials: "include",
        })
            .then((data) => data.json())
            .then((data) => setaccountData(data))
            .catch((err) => console.log(err));
        }, []);

    const handleToggle = () => {
        setIsToggle((prev) => !prev);
    }

    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (e) => {
        setAnchorElUser(e.currentTarget);
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    }

    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

    return (
        <>
            <AppBar position='static' sx={{ bgcolor: 'orange' }} elevation={0}>
                <Container maxWidth='x1'>
                    <Toolbar disableGutters>
                        <IconButton
                            onClick={() => handleToggle()}
                            size='large'
                            edge='start'
                            color='inherit'
                            aria-label='menu'
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>

                        <DirectionsCar
                            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
                        />
                        <Link href='/' style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Typography
                                sx={{
                                    flexGrow: 1,
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontStyle: 'normal',
                                    fontWeight: 'bold',
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none'
                                }}
                            >
                                SHOWCARPEDIA
                            </Typography>
                        </Link>
                        <DirectionsCar 
                            sx={{ display: {xs: 'flex', md: 'none'}, mr: 1 }}
                        />
                        <Link
                            href='/'
                            style={{ textDecoration: 'none', color: 'inherit' }}
                            sx={{ flexGrow: 1 }}
                        >
                            <Typography 
                                sx={{
                                    mr: 2,
                                    display: { xs: 'flex', md: 'none' },
                                    fontStyle: 'normal',
                                    fontWeight: 'bold',
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none'
                                }}
                            >
                                SHOWCARPEDIA
                            </Typography>
                        </Link>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title='Open Settings'>
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt='UserAvatar' src={avatar} />
                                </IconButton>
                            </Tooltip>

                            <Menu
                                sx={{ mt: '45px' }}
                                id='menu-appbar'
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                                keepMounter
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={ () => {
                                    window.location.assign('/user/profile/edit');
                                    handleCloseUserMenu;  
                                    } }>
                                    <Typography textAlign='center'>Profile</Typography>
                                </MenuItem>
                                <MenuItem onClick={ () => {
                                    removeAccessToken();
                                    window.location.assign('/login');
                                    handleCloseUserMenu;  
                                    } }>
                                    <Typography textAlign='center'>Sign Out</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            
            <Grid item xs={2} sx={{ display: isToggle? 'unset' : 'none' }}>
                <Grow in={isToggle}>
                    <AdminSidebar />
                </Grow>
            </Grid>
        </>
    )
}