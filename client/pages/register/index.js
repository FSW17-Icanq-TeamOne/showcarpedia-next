import { Button, Grid, Typography, TextField } from "@mui/material";
import { useFormik } from "formik";
import  Router  from "next/router";
import { useDispatch } from "react-redux";
import SecondNavbar from "../../component/NavBar/SecondNavbar";
import { registerAccount } from "../../redux/slices/accountSlice";

import styles from '../../styles/Login+Register.module.css';

export default function Register () {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: ''
        },
        onSubmit: async values => {
           const register = await dispatch(registerAccount(values))
           if(register.error) {
            console.log(register.payload?.message)
           } else{
            Router.push("/login")
           }
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
                    <Typography variant={'h4'}>Create Account</Typography>
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
                                helperText={formik.touched.username && formik.errors.username}
                            />
                        </Grid>

                        <Grid marginTop={'30px'}>
                            <TextField 
                                id='email'
                                name='email'
                                label='Email'
                                type='email'
                                required
                                focused

                                sx={{
                                    width: 345
                                }}

                                // Value Handle
                                value={formik.values.email}
                                onChange={formik.handleChange}

                                // Throw Error
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </Grid>

                        <Grid marginTop={'30px'}>
                            <TextField 
                                id='password'
                                name='password'
                                label='password'
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
                                helperText={formik.touched.password && formik.errors.password}
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
                                Create Account
                            </Button>
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
                                Sign In
                            </Button>
                        </Grid>

                    </form>
                </Grid>
            </Grid>
        </>
    )
}