import { Grid, Box} from "@mui/material";
import AdminManagerTable from '../../../component/AdminManager/AdminManagerTable';
import AdminNavbar from '../../../component/Dashboard/AdminNavbar';

export default function AdminList () {
    return (
        <Grid container>
            <AdminNavbar />
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