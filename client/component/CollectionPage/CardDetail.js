import {
  Container,
  Box,
  CardContent,
  Typography,
  Card,
  Grid,
  Divider,
} from "@mui/material"
import CarouselDetail from "./CarouselDetail"
import {Speed} from "@mui/icons-material"
import {Rating} from "@mui/material"
import {Stack} from "@mui/material"
export default function Details({data}) {
  return (
    <Container>
      <Grid container columns={{xs: 4, md: 12}} spacing={2}>
        <Grid item xs={4} md={12}>
          <CarouselDetail images={data?.photoProducts} videos={data?.videos} />
        </Grid>
        <Grid item xs={2} md={8}>
          <Card
            sx={{
              borderRadius: 2,
              boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
              height: "100%",
            }}
          >
            <CardContent>
              <Typography variant="h4" fontStyle="bold">
                {data?.title}
              </Typography>
              <Typography variant="h5" textTransform="capitalize">
                year:
                <Typography variant="span" color="red">
                  {" "}
                  {data?.year}
                </Typography>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2} md={4}>
          <Card
            sx={{
              borderRadius: 2,
              boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
            }}
          >
            <CardContent>
              <Grid container justifyContent="space-evenly">
                <Grid item>
                  <Speed fontSize="large" />
                  <Typography>{data?.kiloMeter} km</Typography>
                </Grid>

                <Grid item>
                  <Typography
                    variant="h5"
                    textAlign={"center"}
                    fontStyle="bold"
                  >
                    grade
                  </Typography>
                  <Rating value={Number(data?.grade)} readOnly />
                </Grid>
              </Grid>
              <Divider />
              <Stack mt={1}>
                <Typography variant="h5" textAlign={"center"}>
                  brand
                </Typography>
                <Typography textAlign={"center"}>{data?.brand}</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4} md={12}>
          <Card
            sx={{
              borderRadius: 2,
              boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
            }}
          >
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                sx={{
                  textDecoration: "underline",
                  textTransform: "capitalize",
                }}
              >
                about car
              </Typography>
              <Typography variant="body1">{data?.description}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}
