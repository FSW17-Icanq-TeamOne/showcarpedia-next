import { Button, Grid, TextField, Typography, Paper, Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import React, { useState, useEffect } from "react";
import DashboardAdmin from "../../../component/Dashboard/DashboardAdmin";
import Router from "next/router"
import TopFiveWishlitsTable from '../../../component/Insights/TopFiveWishlists';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function AdminInsights() {
    const [totalUsers, setTotalUsers] = useState()
    const [totalAdmins, setTotalAdmins] = useState()
    const [totalCollections, setTotalCollections] = useState()

    useEffect(() => {
        fetch(`http://localhost:3001/v1/insights/usersTotal`, {
          credentials: "include",
        })
          .then((data) => data.json())
          .then((data) => setTotalUsers(data))
          .catch((err) => console.log(err));
      },[])

    useEffect(() => {
        fetch(`http://localhost:3001/v1/insights/adminsTotal`, {
          credentials: "include",
        })
          .then((data) => data.json())
          .then((data) => setTotalAdmins(data))
          .catch((err) => console.log(err));
      },[])

      useEffect(() => {
        fetch(`http://localhost:3001/v1/insights/collectionsTotal`, {
          credentials: "include",
        })
          .then((data) => data.json())
          .then((data) => setTotalCollections(data))
          .catch((err) => console.log(err));
      },[])

    return(
        <>
        <Grid container >
            <DashboardAdmin />
            <Grid item xs sx={{ml: 10, mr: 10, mt: 5}}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={2} sm={4} md={4} >
                <Item>Total Users: {totalUsers?.usersTotal}</Item>
            </Grid>
            <Grid item xs={2} sm={4} md={4} >
                <Item>Total Admin: {totalAdmins?.adminsTotal}</Item>
            </Grid>
            <Grid item xs={2} sm={4} md={4} >
                <Item>Total Collection: {totalCollections?.collectionsTotal}</Item>
            </Grid>
            <Grid item xs={2} sm={12} md={12} >
            <TopFiveWishlitsTable />
            </Grid>
            {/* {Array.from(Array(6)).map((_, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                <Item>xs=2</Item>
                </Grid>
            ))} */}
            </Grid>
            </Grid>
            {/* <Grid 
                item xs
                container
                direction="row"  
                justifyContent="center"
                backgroundColor="red"
            >
                <h1>Users</h1>
            </Grid>
            <Grid 
                item xs
                container
                direction="row"  
                justifyContent="center"
                backgroundColor="red"
            >
                <h1>Admins</h1>
            </Grid>
            <Grid 
                item xs
                container
                direction="row"  
                justifyContent="center"
                backgroundColor="red"
            >
                <h1>Collections</h1>
            </Grid>
            <Grid 
                item xs
                container
                direction="column"  
                justifyContent="center"
                backgroundColor="red"
            >
                <h1>Users</h1>
            </Grid> */}
            
        </Grid>
        </>
    )
}