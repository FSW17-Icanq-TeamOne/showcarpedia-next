import { Typography } from "@mui/material";
import { Box, Grid } from "@mui/material";
import React from "react";
import DashboardAdmin from "../../../../component/Dashboard/DashboardAdmin";
import ProductCreationForm from "../../../../component/CollectionManager/ProductCreationForm"


export default function CollectionManagerCreate() {
    return (
        <Grid container>
          <DashboardAdmin />
          <Grid item xs>
            <Box sx={{ minHeight: "calc(100vh - 64px)", m: 2 }}>
            <Grid container display={'flex'} justifyContent={'center'} marginTop={'40px'}>
                <Typography variant="h4" mb={2} textAlign="center">
                  Create New Product
                </Typography>
                <ProductCreationForm />
            </Grid>
            </Box>
          </Grid>
        </Grid>
      );
}