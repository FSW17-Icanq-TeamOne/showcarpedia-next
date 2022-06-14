import MainNavbar from "../../component/NavBar/MainNavbar"
import {Grid} from "@mui/material"
import Details from "../../component/CollectionPage/CardDetail"
import {useRouter} from "next/router"
import {useDispatch, useSelector} from "react-redux"
import {useEffect} from "react"
import {fetchCollectionDataById} from "../../redux/slices/collectionsSlice"

export default function DetailProduct(context) {
  const {id} = context.params
  const data = useSelector((state) => state.collections)

  const loadData = async () => {
    await dispatch(fetchCollectionDataById(id))
  }

  useEffect(() => {
    if (!router.isReady) return
    loadData()
  }, [router.isReady])

  return (
    <>
      <Grid>
        <MainNavbar />
      </Grid>
      <Grid>
        <Details data={data.data} />
      </Grid>
    </>
  )
}
