import { Button, Grid, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import SecondNavbar from '../../component/NavBar/SecondNavbar'

import styles from '../../styles/Login+Register.module.css';

export default function Login () {
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: values => {
            console.log(values, 'user is logged in')
        }
    })

    return (
        <>
            <SecondNavbar />

            <Grid
                container
                display={'flex'}
                flexDirection={'column'}
                sx={{
                    alignItems: 'center',
                    margin: 'auto',
                    maxWidth: 345
                }}
            >
                <Grid container justifyContent={'flex-start'}>
                    <Typography variant={'h4'}>Sign In</Typography>
                </Grid>

                <Grid container justifyContent={'center'} marginTop={'10px'}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid marginTop={'30px'}>
                            <TextField 
                                id='username'
                                name='username'
                                label='Username'
                                required
                                focused

                                sx={{
                                    width: 345
                                }}

                                // Value Handle
                                value={formik.values.username}
                                onChange={formik.handleChange}

                                // Throw Error
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username && Boolean(formik.touched.username && formik.errors.username)}
                            />
                        </Grid>

                        <Grid marginTop={'30px'}>
                            <TextField 
                                id='password'
                                name='password'
                                label='Password'
                                type='password'
                                required
                                focused

                                sx={{
                                    width: 345
                                }}

                                // Value Handle
                                value={formik.values.password}
                                onChange={formik.handleChange}

                                // Throw Error
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && Boolean(formik.touched.password && formik.errors.password)}
                            />
                        </Grid>

                        <Grid
                            container
                            justifyContent={'center'}
                            marginTop={'50px'}
                        >
                            <Button
                                sx={{
                                    width: 345,
                                    height: 50,
                                    backgroundColor: 'orange',
                                    color: 'white'
                                }}

                                type='submit'
                            >
                                Sign In
                            </Button>
                        </Grid>

                        <Grid
                            container
                            sx={{
                                display: 'flex',
                                direction: 'row',

                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: '20px'
                            }}
                        >
                            <Grid>
                                <Typography>Forgot Username?</Typography>
                            </Grid>
                            
                            <Grid marginRight={'20px'} marginLeft={'20px'}>
                                <Typography>|</Typography>
                            </Grid>

                            <Grid>
                                <Typography>Forgot Password?</Typography>
                            </Grid>
                        </Grid>

                            <Grid marginTop={'25px'}>
                                <Typography variant={'h6'} className={styles.h6}>OR</Typography>
                            </Grid>
                        
                        <Grid 
                            container
                            justifyContent={'center'}
                            marginTop={'25px'}
                        >
                            <Button
                                sx={{
                                    width: 345,
                                    height: 50,
                                    color: 'black',

                                    border: 1,
                                    borderColor: 'black'
                                }}

                                href={'/login'}
                            >
                                Create Account
                            </Button>
                        </Grid>

                    </form>
                </Grid>
            </Grid>
        </>
    )
}