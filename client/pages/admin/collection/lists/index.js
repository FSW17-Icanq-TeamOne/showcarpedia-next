import { Grid, Box } from "@mui/material";
import DashboardAdmin from "../../../../component/Dashboard/DashboardAdmin";
import ProductTable from "../../../../component/CollectionManager/ProductTable";

export default function CollectionManagerLists() {
  return (
    <Grid container>
      <DashboardAdmin />
      <Grid item xs>
        <Box sx={{ minHeight: "calc(100vh - 64px)", m: 2 }}>
          <Grid
            container
            display={"flex"}
            justifyContent={"center"}
            marginTop={"40px"}
          >
            <ProductTable />
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
