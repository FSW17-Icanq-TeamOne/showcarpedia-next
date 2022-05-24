import { Select } from "@mui/material";
import { InputLabel } from "@mui/material";
import { FormControl } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Grid, Typography, Container, Button } from "@mui/material";
import { useFormik } from "formik";
import {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarMakeData } from "../../redux/slices/carMakeSlice";
import {useRouter} from "next/router"

export default function Filter() {
 const data = useSelector(state => state.carMake)
const dispatch = useDispatch()
const router = useRouter()

  const fetchData = async () => {
     await dispatch(fetchCarMakeData())
  };

  useEffect(() => {
    if(!router.isReady) return
    fetchData();
  }, [router.isReady]);



  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      brand: "",
      category: "",
      minYear: "",
      maxMileages: "",
      grades: "",
    },
    onSubmit: async (values) => {
      const year = Number(values.minYear);
      const grade = Number(values.grades);
      const mileages = Number(values.maxMileages);
      router.push({
        pathname:"search",
        query:{
          mileages:mileages,
          minYear:year,
          grade:grade,
          brand:values.brand,
          category:values.category
        }
      },)
     
    },
  });
  return (
    <Container>
      <Typography variant={"h4"} color="gray" fontWeight="500" textAlign="center" marginBottom={3} marginTop={2}>
        Filter
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={4} sm={4} md={4}>
            <FormControl fullWidth>
              <InputLabel id="brand">brand</InputLabel>
              <Select
                label="brand"
                name="brand"
                value={formik.values.brand}
                onBlur={formik.handleBlur}
                onChange={(e) => formik.setFieldValue("brand", e.target.value)}
              >
                <MenuItem value="">Brand</MenuItem>
                {data.brands?.map((e, i) => (
                  <MenuItem value={e} key={i}>
                    {e}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4} sm={4} md={4}>
            <FormControl fullWidth>
              <InputLabel id="category">category</InputLabel>
              <Select
                label="category"
                name="category"
                value={formik.values.category}
                onBlur={formik.handleBlur}
                onChange={(e) =>
                  formik.setFieldValue("category", e.target.value)
                }
              >
                <MenuItem value="">Category</MenuItem>
                {data?.categories.map((e, i) => (
                  <MenuItem value={e} key={i}>
                    {e}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4} sm={4} md={4}>
            <FormControl fullWidth>
              <InputLabel id="minYear">minYear</InputLabel>
              <Select
                label="minYear"
                name="minYear"
                value={formik.values.minYear}
                onBlur={formik.handleBlur}
                onChange={(e) =>
                  formik.setFieldValue("minYear", e.target.value)
                }
              >
                <MenuItem value="">Year</MenuItem>
                {data?.year.map((e, i) => (
                  <MenuItem value={e} key={i}>
                    {e}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4} sm={4} md={4}>
            <FormControl fullWidth>
              <InputLabel id="maxMileages">maxMileages</InputLabel>
              <Select
                label="maxMileages"
                name="maxMileages"
                value={formik.values.maxMileages}
                onBlur={formik.handleBlur}
                onChange={(e) =>
                  formik.setFieldValue("maxMileages", e.target.value)
                }
              >
                <MenuItem value="">MaxMileages</MenuItem>
                {data?.mileages.map((e, i) => (
                  <MenuItem value={e} key={i}>
                   <span>&#62; </span> {e}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4} sm={4} md={4}>
            <FormControl fullWidth>
              <InputLabel id="grades">grades</InputLabel>
              <Select
                label="grades"
                name="grades"
                value={formik.values.grades}
                onBlur={formik.handleBlur}
                onChange={(e) => formik.setFieldValue("grades", e.target.value)}
              >
                <MenuItem value="">Grades</MenuItem>
                {data?.grades.map((e, i) => (
                  <MenuItem value={e} key={i}>
                    {e}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid display={"flex"} marginTop={"15px"} justifyContent="center">
          <Grid>
            <Button
            onClick={() => router.push("/collection")}
              sx={{
                borderRadius: 15,
                borderColor: "#2871CC",
                "&:hover": {
                  transition: ".5s",
                  bgcolor: "#FF0000",
                  color: "white",
                },
              }}
            >
              Reset
            </Button>
          </Grid>

          <Grid>
            <Button
              type="submit"
              sx={{
                borderRadius: 15,
                borderColor: "#2871CC",
                "&:hover": {
                  transition: ".5s",
                  bgcolor: "#2871CC",
                  color: "white",
                },
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}