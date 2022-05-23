import { Divider, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useState, useEffect } from "react";
import Filter from "../../component/CollectionPage/Filter";
import MainNavbar from "../../component/NavBar/MainNavbar";

export default function Collection() {
  const [data, setData] = useState([]);

  // const fetchData = async () => {
  //   const response = await fetch('http://localhost:4000/v1/cars', {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     credentials: 'included'
  //   });

  //   const data = await response.json();
  //   setData(data)
  // }

  useEffect(() => {
    // fetchData();
  }, [])
  
  return (
    <>
      <MainNavbar />

      <Filter />

      <Divider variant={'middle'} />

      {/* Collection List */}
      <Container>
        <Grid 
          paddingTop={5}
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {data.map((e, idx) => (
            <Grid key={idx}>
              {/* <Show data={e} /> */}
            </Grid>
          ))}
        </Grid>
      </Container>

    </>
  )
}
