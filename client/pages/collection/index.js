import {Container, Grid, Divider, Typography} from "@mui/material"
import {useSelector} from "react-redux"
import Show from "../../component/CollectionPage/Show"
import Filter from "../../component/CollectionPage/Filter"
import MainNavbar from "../../component/NavBar/MainNavbar"
import {useDispatch} from "react-redux"
import {fetchCollectionData} from "../../redux/slices/collectionsSlice"
import {useEffect} from "react"
import {useRouter} from "next/router"
import {fetchWishlistData} from "../../redux/slices/wishlistSlice"

export default function Collection() {
  const router = useRouter()
  const data = useSelector((state) => state.collections)
  const wishlistData = useSelector((state) => state.wishlist)
  const dispatch = useDispatch()

  const loadData = async () => {
    await dispatch(fetchCollectionData())
    await dispatch(fetchWishlistData())
  }

  useEffect(() => {
    if (!router.isReady) return
    loadData()
  }, [router.isReady])

  return (
    <>
      <MainNavbar />

      {/* Filter */}
      <Filter />

      {/* divider  */}

      <Divider variant="middle" sx={{mt: 2}} />

      {/* Collection List */}
      <Container>
        <Grid
          paddingTop={5}
          container
          spacing={{xs: 2, md: 3}}
          columns={{xs: 4, sm: 8, md: 12}}
        >
          {data.data?.map((datum, idx) => (
            <Grid item xs={4} sm={4} md={4} key={idx}>
              <Show data={datum} wishlist={wishlistData?.data} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}
