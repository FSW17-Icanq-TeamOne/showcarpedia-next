import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import Show from "../../component/CollectionPage/Show";
import MainNavbar from "../../component/NavBar/MainNavbar";
import { useDispatch, useSelector } from "react-redux"
import { fetchWishlistData } from "../../redux/slices/wishlistSlice";
import {useRouter} from "next/router"

export default function Wishlist() {
const data = useSelector(state => state.wishlist)
const dispatch = useDispatch()
const router = useRouter()

const fetchData = async () => {
    await dispatch(fetchWishlistData())
}
  useEffect(() => {
    if(!router.isReady) return
    fetchData();
  }, [router.isReady]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <MainNavbar />
      </Grid>
      <Grid item xs={12}>
        <Container>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={12}> 
          <Typography variant="h4">Wishlist</Typography>
          <Typography>{data.data.length} item</Typography>
          </Grid>
          {data.data.length?(
            data.data.map((datum, idx) => (
              <Grid item xs={4} sm={4} md={4} key={idx}>
                <Show data={datum} wishlist={datum}  />
              </Grid>
            ))
          ):(
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="center" flexDirection="column" gap={2}>
            <Typography variant="h4">you dont have any wishlist :(</Typography>
            <Button href='/collection' variant="contained">find product</Button>
              </Grid>
            </Grid>
          )}
          
        </Grid>
      </Container>
      </Grid>
    </Grid>
  );
}
