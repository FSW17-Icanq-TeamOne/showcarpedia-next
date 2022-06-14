import {Box, Grid, Typography} from "@mui/material"
import DashboardAdmin from "../../../../component/Dashboard/DashboardAdmin"
import ProductUpdateForm from "../../../../component/CollectionManager/ProductUpdateForm"

export default function CollectionManagerEdit() {
  return (
    <Grid container>
      <DashboardAdmin />
      <Grid item xs>
        <Box sx={{minHeight: "calc(100vh - 64px)", m: 2}}>
          <Grid
            container
            display={"flex"}
            justifyContent={"center"}
            marginTop={"40px"}
          >
            <Typography variant="h4" mb={2} textAlign="center">
              Edit Product
            </Typography>
            <ProductUpdateForm />
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}
