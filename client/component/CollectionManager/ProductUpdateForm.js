import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import PreviewImages from "./PreviewImages";
import { TextareaAutosize } from "@mui/material";
import { useRouter } from "next/router";
import { fetchCarMakeData } from "../../redux/slices/carMakeSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ProductUpdateForm() {
  const data = useSelector((state) => state.carMake);
  const dispatch = useDispatch();

  const router = useRouter();

  const getUrls = (url) => formik.setFieldValue("photoProducts", url);

  const fetchData = async () => {
    await dispatch(fetchCarMakeData());
  };

  useEffect(() => {
    if (!router.isReady) return;
    fetchData();
  }, [router.isReady]);

  const [productData, setproductData] = useState({
    title: "",
    brand: "",
    grade: "",
    category: "",
    year: "",
    kiloMeter: "",
    description: "",
    photoProducts: "",
  });

  const { id } = router.query;

  useEffect(() => {
    if (!router.isReady) return;
    fetch(`http://localhost:3001/v1/cars/details/${id}`, {
      credentials: "include",
    })
      .then((data) => data.json())
      .then((data) => setproductData(data))
      .catch((err) => console.log(err));
  }, [router.isReady]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: productData?.title,
      brand: productData?.brand,
      grade: productData?.grade,
      category: productData?.category,
      year: productData?.year,
      kiloMeter: productData?.kiloMeter,
      description: productData?.description,
      photoProducts: productData?.photoProducts,
    },
    onSubmit: (value) => {
      console.log(value, `Product is Created`);
      fetch(`http://localhost:3001/v1/cars/update/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(value),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data, "This is the Data");
          if (data.message === "Success") {
            router.push("/admin/collection/lists");
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <Grid container spacing={2}>
      {/* Picture */}
      <Grid item sm={1} lg={2}></Grid>
      <Grid item xs={12} sm={5} lg={4}>
        {/* Image Viewer */}
        <PreviewImages data={getUrls} images={productData?.photoProducts} />
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
      <Grid item sm={1} lg={2}></Grid>
    </Grid>
  );
}
