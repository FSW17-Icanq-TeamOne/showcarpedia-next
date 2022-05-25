import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
  Grid,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { useFormik } from "formik";
import PreviewImages from "./PreviewImages";
import { useRouter } from "next/router";
import { fetchCarMakeData } from "../../redux/slices/carMakeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function ProductCreationForm() {
  const data = useSelector(state => state.carMake)
  const dispatch = useDispatch()
  const router = useRouter()
  const getUrls = (url) => formik.setFieldValue("photoProducts", url);

  const fetchData = async () => {
    await dispatch(fetchCarMakeData())
 };

 useEffect(() => {
   if(!router.isReady) return
   fetchData();
 }, [router.isReady]);


  const formik = useFormik({
    initialValues: {
      title: "",
      brand: "",
      grade: "",
      category: "",
      year: "",
      kiloMeter: "",
      description: "",
      photoProducts: "",
    },
    onSubmit: async (value) => {
      console.log(value);
      try {
        const response = await fetch("http://localhost:3001/v1/cars", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(value),
        });
        console.log(response)
        if (response.ok) {
          console.log("ok");
          router.push("/admin/collection/lists")
        } else {
          console.log("tidak ok");
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <>
      <Grid container  spacing={2}>
        {/* Picture */}
        <Grid item sm={1} lg={2}>
        </Grid>
        <Grid item xs={12} sm={5} lg={4}>
          {/* Image Viewer */}
          <PreviewImages data={getUrls} />
        </Grid>
        <Grid item xs={12} sm={5} lg={4}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="title"
                  name="title"
                  label="Add Product's Name"
                  value={formik.values.title}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  variant="standard"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="brand">Brand</InputLabel>
                  <Select
                    label="brand"
                    name="brand"
                    value={formik.values.brand}
                    onBlur={formik.handleBlur}
                    onChange={(e) =>
                      formik.setFieldValue("brand", e.target.value)
                    }
                  >
                    {data.brands?.map((e, i) => (
                      <MenuItem value={e} key={i}>
                        {e}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="grade">Grade</InputLabel>
                  <Select
                    value={formik.values.grade}
                    onBlur={formik.handleBlur}
                    name="grade"
                    label="grade"
                    onChange={(e) =>
                      formik.setFieldValue("grade", e.target.value)
                    }
                  >
                    {data.grades?.map((e, idx) => (
                      <MenuItem value={e} key={idx}>
                        {e}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="categories">Categories</InputLabel>
                  <Select
                    label="categories"
                    name="categories"
                    value={formik.values.category}
                    onBlur={formik.handleBlur}
                    onChange={(e) =>
                      formik.setFieldValue("category", e.target.value)
                    }
                  >
                    {data.categories?.map((e, i) => (
                      <MenuItem value={e} key={i}>
                        {e}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs>
                <Grid item xs>
                  <TextField
                    id="year"
                    name="year"
                    label="Add Product's year"
                    value={formik.values.year}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="kiloMeter"
                  name="kiloMeter"
                  label="Input Kilometer"
                  value={formik.values.kiloMeter}
                  onChange={formik.handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextareaAutosize
                  minRows={4}
                  maxRows={4}
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  placeholder="input your product's description"
                  style={{ width: "100%" }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  sx={{
                    width: "100%",
                    backgroundColor: "orange",
                    color: "white",
                  }}
                  type="submit"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item sm={1} lg={2}>
        </Grid>
      </Grid>
    </>
  );
}
