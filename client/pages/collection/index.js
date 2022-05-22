import { Grid, Typography } from "@mui/material";
import MainNavbar from "../../component/MainNavbar";

export default function Collection() {
  return (
    <Grid 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >
      <MainNavbar />
      <Typography>This is Products</Typography>
    </Grid>
  )
}
