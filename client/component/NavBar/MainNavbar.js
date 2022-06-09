import { Fade, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import { useEffect, useState, useContext } from 'react'
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import {MainContext} from '../../context/mainContext'
import {SocketContext} from '../../context/socketContext'


import styles from '../../styles/HomePage.module.css';
import { useRouter } from 'next/router';
import { DirectionsCar, Favorite, Home, Logout, Person, Settings } from '@mui/icons-material';

export default function MainNavbar () {
    const [cookie, setCookie, removeCookie] = useCookies(['access_token']);
    const [role, setRole] = useState(null);
    const [isToggle, setIsToggle] = useState(false);
    const {room, setRoom} = useContext(MainContext)
    const socket = useContext(SocketContext)
    const router = useRouter()
    const removeAccessToken = () => {
        window.localStorage.clear();
        removeCookie('access_token');
        router.push("/login")
    };
    const handleToggle = () => setIsToggle((prev) => !prev);

    useEffect(() => {
        isToggle?document.body.style.overflow="hidden":document.body.style.overflow="unset"
      }, [isToggle]);


    useEffect(() => {
        const getRole = localStorage.getItem('role');
        setRole(getRole)
    }, [])

    const [webData, setwebData] = useState({
        title: "",
        content: "",
      });
    
      useEffect(() => {
        fetch(`http://localhost:3001/v1/about`, {
          credentials: "include",
        })
          .then((data) => data.json())
          .then((data) => setwebData(data))
          .catch((err) => console.log(err));
      },[])

    useEffect(() => {
        fetch('http://localhost:3001/v1/chat/room/', {
            credentials: "include",
        })
      .then((data) => data.json())
      .then((data) => setRoom(data.Room))
      .catch((err) => console.log(err));
    }, [])

    const handleClick = () => {
        socket.emit('login', {room}, error => {
            if (error) {
                console.log(error)
            }
        })
   }

    return (
        <>
        <Grid
            container
            columns={{ xs: 2, sm: 8, md: 12}}
            alignItems={'center'}
            height={'10vh'}
            maxHeight={'64px'}
            justifyContent={{ xs: 'space-between'}}
        >
            {/* Start Bar */}
            <Grid item sm ml={2}>
                <Link href='/'>
                <Typography variant={'h5'} className={styles.Link}>{webData?.title}</Typography>
                </Link>
            </Grid>

            {/* Mid Bar */}
            <Grid item md={5} sm={2}>
                <Grid
                    container
                    justifyContent={'center'}
                    spacing={{ md: 2, sm: 2 }}
                    sx={{ display: { xs: 'none', sm: 'flex' } }}
                    >
                    <Grid item>
                        <Link href={'/'}>
                            <Typography className={styles.Link} 
                                sx={{
                                    fontSize: '18px'
                                }}
                            >
                                Home
                            </Typography>
                        </Link>
                    </Grid>

                    <Grid item>
                        <Link href={'/collection'} passHref>
                            <Typography className={styles.Link} 
                                sx={{
                                    fontSize: '18px'
                                }}
                            >
                                Collection
                            </Typography>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>

            {/* End Bar */}
            <Grid item md={4} sm={3}>
                <Grid
                    container
                    justifyContent={'flex-end'}
                    sx={{ display: { xs:'none', sm: 'flex' } }}
                    spacing={{ md: 2 }}
                    mr={3}
                >

                    {/* Settings */}
                    <Grid item>
                        {role === 'superAdmin' && (
                            <IconButton
                                aria-label='Account'
                                onClick={() => window.location.assign('/admin/manager/lists')}
                            >
                                <SettingsIcon />
                            </IconButton>
                        )}
                        {role === 'admin' && (
                            <IconButton
                                aria-label='Account'
                                onClick={() => window.location.assign('/admin/collection/lists')}
                            >
                                <SettingsIcon />
                            </IconButton>
                        )}
                    </Grid>
                    
                    {/* Log In */}
                    <Grid item>
                        {role === null && (
                            <Link href={'/login'}>
                                <Typography className={styles.Link}
                                    sx={{
                                        fontSize: '18px'
                                    }}
                                >Log In</Typography>
                            </Link>
                        )}

                    {(role === 'user' || role === 'admin' || role === 'superAdmin') && (
                        <IconButton
                            aria-label='Account'
                            onClick={() => window.location.assign('/user/profile/edit')}
                        >
                            <PersonIcon />
                        </IconButton>
                    )}
                    </Grid>

                    {/* Wishlist */}
                    <Grid item>
                        {(role === 'user' || role === 'admin' || role === 'superAdmin') && (
                            <IconButton
                                aria-label='Account'
                                onClick={() => router.push("/wishlist")}
                            >
                                <FavoriteIcon />
                            </IconButton>
                        )}
                    </Grid>

                    <Grid item>
                        {(role === 'user') && (
                            <Link href={"/user/chat"} passHref>
                            <IconButton
                                aria-label='Chat'
                                onClick={handleClick}
                            >
                                <ChatIcon />
                            </IconButton>
                            </Link>
                        )}
                    </Grid>

                    {/* Log Out */}
                    <Grid item>
                        {(role === 'user' || role === 'admin' || role === 'superAdmin') && (
                            <IconButton
                                aria-label='Account'
                                onClick={() => {
                                    removeAccessToken();
                                    window.location.assign('/login');
                                }}
                            >
                                <LogoutIcon />
                            </IconButton>
                        )}
                    </Grid>
                </Grid>
            </Grid>

            <Grid 
                item
                sx={{ display: { xs: 'flex', sm: 'none' } }}
                mr={3}
                justifyContent={'flex-end'}
            >
                <>
                    <input 
                        className={styles.hamburgerButton}
                        type='checkbox'
                        onClick={handleToggle}
                        id={styles.navMenu}
                    />
                    <label htmlFor={styles.navMenu} id={styles.navIcon}>
                        <span />
                        <span />
                        <span />
                    </label>
                </>
            </Grid>
        </Grid>
        <Fade in={isToggle}>
        <Paper
          elevation={2}
          sx={{
            zIndex: 2,
            position:"absolute",
            top:"64px",
            width: "100%",
            height:"100vh"
          }}
        >
          <List>
            <ListItem>
            <Link href="/" passHref>
              <ListItemButton>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="home" />
              </ListItemButton>
            </Link>
            </ListItem>

            <ListItem>
            <Link href="/collection" passHref>
              <ListItemButton >
                <ListItemIcon>
                  <DirectionsCar />
                </ListItemIcon>
                <ListItemText primary="collection" />
              </ListItemButton>
            </Link>
            </ListItem>

            <ListItem>
            <Link href="/wishlist" passHref>
              <ListItemButton  >
                <ListItemIcon>
                  <Favorite />
                </ListItemIcon>
                <ListItemText primary="wishlist" />
              </ListItemButton>
            
            </Link>
            </ListItem>

            <ListItem>
            <Link href="/admin/manager/lists" passHref>
              <ListItemButton  >
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText primary="setting" />
              </ListItemButton>
              </Link>
            </ListItem>

            <ListItem>
            <Link href="user/profile/edit" passHref>
              <ListItemButton  >
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="profile" />
              </ListItemButton>
              </Link>
            </ListItem>

            <ListItem>
              <ListItemButton onClick={removeAccessToken}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary="Log out" />
              </ListItemButton>
            </ListItem>
          </List>
        </Paper>
      </Fade>
      </>
    );
};