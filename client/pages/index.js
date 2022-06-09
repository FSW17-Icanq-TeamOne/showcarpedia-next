import { Avatar, Button, Grid, Typography } from "@mui/material";
import BrandList from "../component/HomePage/BrandList";
import CarouselContainer from "../component/HomePage/Carousel";
import Footer from "../component/HomePage/Footer";
import MainNavbar from "../component/NavBar/MainNavbar";
import React, { useState, useEffect } from "react";

import styles from '../styles/HomePage.module.css';


export default function Home() {

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

  return (
    <Grid className={styles.main}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >
      <MainNavbar />

      <CarouselContainer />

      {/* About Us */}
      <Grid
          container
          height="100%"
          minHeight={400}
          alignItems='center'
          spacing={3}
          justifyContent={'center'}
      >
          <Grid item>
              <Avatar 
              src='https://cdn.discordapp.com/attachments/960564590574456852/966305346257838130/103054527.jpeg'
              sx={{
                  width: 230,
                  height: 230
              }}
              />
          </Grid>

          <Grid item> 
              <Grid 
                  container 
                  alignItems={{ xs: 'center', sm: 'start' }} 
                  direction={'column'}
                  margin={2}
              >
                  <Typography variant={'h4'} mb={3}>
                      About Us
                  </Typography>
      
                  <Typography mb={3}>
                      {webData?.content}
                  </Typography>
      
                  <Button
                      sx={{
                          width: 140,
                          height: 50,
                          backgroundColor: 'black',
                          color: 'white'
                      }}
                  >
                      Contact Us
                  </Button>
              </Grid>
          </Grid>
      </Grid>

      <BrandList />

      <Footer />
    </Grid>
  )
}
