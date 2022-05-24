import { Grid, Box} from "@mui/material";
import AdminManagerTable from "../../../component/AdminManager/AdminManagerTable";
import DashboardAdmin from "../../../component/Dashboard/DashboardAdmin";

export default function AdminLists () {
    return (
        <Grid container>
            <DashboardAdmin />
            <Grid item xs>
            <Box sx={{ minHeight: "calc(100vh - 64px)", m: 2 }}>
              <Grid container display={'flex'} justifyContent={'center'} marginTop={'40px'}>
                <AdminManagerTable />
              </Grid>
            </Box>
          </Grid>
        </Grid>
      );
}