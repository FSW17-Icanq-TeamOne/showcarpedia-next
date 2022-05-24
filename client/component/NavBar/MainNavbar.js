import { Grid, IconButton, Typography } from '@mui/material';
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

export default function MainNavbar () {
    const [cookie, setCookie, removeCookie] = useCookies(['access_token']);
    const [role, setRole] = useState(null);
    const {room, setRoom} = useContext(MainContext)
    const socket = useContext(SocketContext)
    const router = useRouter()
    const removeAccessToken = () => {
        window.localStorage.clear();
        removeCookie('access_token');
    };

    // const getRoleFromLocalStorage = () => {
    //     const 
    // }

    useEffect(() => {
        const getRole = localStorage.getItem('role');
        setRole(getRole)
    }, [])

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
            console.log("Connect to:", room)
        })
   }

    return (
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
                <Typography variant={'h5'} className={styles.Link}>Showcarpedia</Typography>
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
                        <Link href={'/collection'}>
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
                                onClick={() => window.location.assign('/admin-list')}
                            >
                                <SettingsIcon />
                            </IconButton>
                        )}
                        {role === 'admin' && (
                            <IconButton
                                aria-label='Account'
                                onClick={() => window.location.assign('/product-list')}
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
                            onClick={() => window.location.assign('edit/profile')}
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
                            <Link href={"/chat"} passHref>
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
                        onClick={() => console.log(1)}
                        id='nav-menu'
                    />
                    <label htmlFor='nav-menu' id='nav-icon'>
                        <span />
                        <span />
                        <span />
                    </label>
                </>
            </Grid>
        </Grid>
    );
};