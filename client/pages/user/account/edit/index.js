import { Button, Box, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import UserNavbar from '../../../../component/Dashboard/UserNavbar';
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';

export default function AccountSetting () {
    const router = useRouter();

    const [accountData, setaccountData] = useState({
        username: "",
        email: "",
        password: "",
      });
    
    useEffect(() => {
    fetch("http://localhost:3001/v1/user/account/", {
        credentials: "include",
    })
        .then((data) => data.json())
        .then((data) => setaccountData(data))
        .catch((err) => console.log(err));
    }, []);

    const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
        username: accountData?.username,
        email: accountData?.email,
        password: "",
    },
    onSubmit: (values) => {
        //console.log(values, 'AccountUpdated')
        fetch("http://localhost:3001/v1/user/account", {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data, "This is the Data");
            if (data.message === "Success") {
            router.push("/user/account/edit");
            }
        })
        .catch((err) => {
            console.log(err);
        });
    },
    });

    return (
    <Grid container>
        <UserNavbar />
        <Grid item xs>
        <Grid container spacing={2}>
            <Grid item sm={1} lg={2} />
            <Grid item xs={12} sm={10} lg={8}>
            <Box sx={{ minHeight: "calc(100vh - 64px)" }}>
                <form onSubmit={formik.handleSubmit}>
                <Grid
                    container
                    columns={{ xs: 6, md: 12 }}
                    spacing={{ xs: 3, sm: 2 }}
                >
                    <Grid item xs={6} md={12}>
                    <Typography variant={"h4"} textAlign="center" mt={10}>
                        Account Settings
                    </Typography>
                    </Grid>

                    <Grid item xs={1} md={4} />

                    <Grid item xs={4} md={4}>
                    <TextField
                        id="username"
                        name="username"
                        label="Username"
                        fullWidth
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={
                        formik.touched.username &&
                        Boolean(formik.errors.username)
                        }
                        helperText={
                        formik.touched.username && formik.errors.username
                        }
                    />
                    </Grid>

                    <Grid item xs={1} md={4} />
                    <Grid item xs={1} md={4} />
                
                    <Grid item xs={4} md={4}>
                    <TextField
                        id="email"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    </Grid>
                    
                    <Grid item xs={1} md={4} />
                    <Grid item xs={1} md={4} />

                    <Grid item xs={4} md={4}>
                    <TextField
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={
                        formik.touched.password && Boolean(formik.errors.password)
                        }
                        helperText={
                        formik.touched.password && formik.errors.password
                        }
                    />
                    </Grid>

                    <Grid item xs={1} md={4} />
                    <Grid item xs={1} md={4} />
                    
                    <Grid item xs={4} md={4}>
                    <Button
                        fullWidth
                        type={"submit"}
                        sx={{
                            backgroundColor: "orange",
                            color: "white",
                            borderRadius: 20,
                            }}
                    >
                        Submit
                    </Button>
                    </Grid>

                    <Grid item xs={1} md={4} />

                </Grid>
                </form>
            </Box>
            </Grid>
        </Grid>
        </Grid>
    </Grid>
    ); 
}