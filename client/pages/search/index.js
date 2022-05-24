import { Typography } from "@mui/material";
import { Container, Grid, Divider,Button } from "@mui/material";
import Show from "../../component/CollectionPage/Show";
import Filter from "../../component/CollectionPage/Filter";
import MainNavbar from "../../component/NavBar/MainNavbar";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getFilterData } from "../../redux/slices/collectionsSlice";
import { useEffect } from "react";
import { fetchCarMakeData } from "../../redux/slices/carMakeSlice";

export default function CollectionFilter() {
const router = useRouter()
const query = router.query
const dispatch = useDispatch()
const data = useSelector(state => state.collections)

const fetchData = async ()=> {
  await dispatch(getFilterData(query))
}

const fetchCarMake = async () => {
  await dispatch(fetchCarMakeData())
}

useEffect(() => {
  fetchCarMake()
  fetchData()
},[query])
  return (
    <>
      <MainNavbar />

      {/* Filter */}
      <Filter />

      {/* divider  */}

      <Divider variant="middle" />

      {/* Collection List */}
      <Container>
        <Typography variant="subtitle1" color="#91959B" mt={3}>
          showing {data?.data.length} result
        </Typography>
        <Grid
          paddingTop={3}
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          justifyContent={!data.data.length?"center":"none"}
        >
        {!data.data.length ? (
       <Grid item>
         <Grid container justifyContent="center" flexDirection="column" alignItems="center">
       <Typography variant="h4" mb={2}>Oops, product not found </Typography>
       <Button variant="contained" href="/collection">find other product</Button>
         </Grid>
      </Grid>
        ) :(
          data?.data.map((datum, idx) => (
            <Grid item xs={4} sm={4} md={4} key={idx}>
              <Show data={datum} />
            </Grid>
          ))
        )}

        </Grid>
      </Container>
    </>
  );
}