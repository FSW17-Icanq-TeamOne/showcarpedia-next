import { Select } from "@mui/material";
import { InputLabel } from "@mui/material";
import { FormControl } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Grid, Typography, Container, Button } from "@mui/material";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Filter() {
  const [brands, setBrands] = useState([]);
  const [category, setCategory] = useState([]);
  const [year, setYear] = useState([]);
  const mileages = ["1000", "5000", "10000", "20000", "50000"];
  const grades = ["1", "2", "3", "4", "5"];

  const fetchData = async () => {
    const response = await fetch("http://localhost:4000/v1/cars/make/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    setYear(data.year.map((e) => e.year));
    setBrands(data.brand.sort());
    setCategory(data.category.sort());
  };

  useEffect(() => {
    fetchData();
  }, []);



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
                {brands.map((e, i) => (
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
                {category.map((e, i) => (
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
                {year.map((e, i) => (
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
                {mileages.map((e, i) => (
                  <MenuItem value={e} key={i}>
                    {e}
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
                {grades.map((e, i) => (
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
            onClick={() => navigate("/collection")}
              sx={{
                borderRadius: 30,
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
                borderRadius: 30,
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