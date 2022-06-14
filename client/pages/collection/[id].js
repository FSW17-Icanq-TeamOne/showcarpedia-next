import MainNavbar from "../../component/NavBar/MainNavbar"
import {Grid} from "@mui/material"
import Details from "../../component/CollectionPage/CardDetail"
import {useRouter} from "next/router"
import {useSelector} from "react-redux"
import {useEffect} from "react"

export default function DetailProduct() {
  const data = useSelector((state) => state.collections)
  const router = useRouter()
  const {id} = router.query
  const dispatch = useDispatch()

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
