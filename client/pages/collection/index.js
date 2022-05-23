import {
  Container,
  Grid,
  Divider
} from "@mui/material";
import { useSelector } from "react-redux";
import Show from "../../component/CollectionPage/Show";
import Filter from "../../component/CollectionPage/Filter";
import MainNavbar from "../../component/NavBar/MainNavbar";
import {useDispatch} from "react-redux"
import { fetchCollectionData } from "../../redux/slices/collectionsSlice";
import { useEffect } from "react";

export default function Collection() {
 const data = useSelector(state => state.collections)
const dispatch = useDispatch()
//  const fetchWishlistData = async () => {
//   const response = await fetch("http://localhost:4000/v1/wishlist", {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     credentials: "include",
    
//   });
//   const data = await response.json();
//   if(Array.isArray(data)){
//     setWishlistData(data?.map(datum => datum.Product))
//   } 
// };
const loadData = async () => {
  await dispatch(fetchCollectionData())
}
useEffect(()=>{
  loadData()
},[])

// useEffect(()=>{
//   fetchWishlistData()
// },[])

  return (
    <>
      <MainNavbar />

      {/* Filter */}
      <Filter />

     {/* divider  */}

     <Divider variant="middle"/>

      {/* Collection List */}
      <Container>
      <Grid
      paddingTop={5}
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {data.data?.map((datum, idx) => (
           <Grid item xs={4} sm={4} md={4} key={idx}>
           <Show data={datum}  />
         </Grid>
        ))}


      </Grid>
      </Container>
      
    </>
  );
}

