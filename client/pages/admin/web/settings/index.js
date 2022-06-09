import { Button, Grid, TextField, Typography, Box } from "@mui/material";
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import DashboardAdmin from "../../../../component/Dashboard/DashboardAdmin";
import Router from "next/router"

export default function AdminManagerEdit() {
  const [webData, setwebData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    fetch(`http://localhost:3001/v1/about`, {
      credentials: "include",
    })
      .then((data) => data.json())
      .then((data) => setwebData(data))
      .catch((err) => console.log(err));
  },[])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: webData?.title,
      content: webData?.content,
    },
    onSubmit: (values) => {
      fetch(`http://localhost:3001/v1/about`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data, "This is the Data");
          if (data.message === "Success") {
            Router.push("/admin/web/settings");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  return (
    <Grid container>
      <DashboardAdmin />
      <Grid item xs>
        <Grid container spacing={2}>
          <Grid item sm={1} lg={2} />
          <Grid item xs={12} sm={10} lg={8}>
            <Box sx={{ minHeight: "calc(100vh - 64px)" }}>
              <form onSubmit={formik.handleSubmit}>
                <Grid
                  container
                  columns={{ xs: 6, md: 12 }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <Grid item xs={6} md={12}>
                    <Typography variant={"h4"} textAlign="center" mt={10}>
                      Web Settings
                    </Typography>
                  </Grid>

                  <Grid item xs={1} md={4} />

                  <Grid item xs={4} md={4}>
                    <TextField
                      id="title"
                      name="title"
                      label="Title"
                      fullWidth
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.title &&
                        Boolean(formik.errors.title)
                      }
                      helperText={
                        formik.touched.title && formik.errors.title
                      }
                    />
                  </Grid>

                  <Grid item xs={1} md={4} />
                  <Grid item xs={1} md={4} />

                  <Grid item xs={4} md={4}>
                    <TextField
                      id="content"
                      name="content"
                      label="Content"
                      multiline
                      rows={4}
                      fullWidth
                      value={formik.values.content}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.content && Boolean(formik.errors.content)
                      }
                      helperText={formik.touched.content && formik.errors.content}
                    />
                  </Grid>

                  <Grid item xs={1} md={4} />
                  <Grid item xs={1} md={4} />

                  <Grid item xs={4} md={4}>
                    <Button
                      fullWidth
                      type={"submit"}
                      sx={{
                        backgroundColor: "orange",
                        color: "white",
                        borderRadius: 20,
                      }}
                    >
                      Submit
                    </Button>
                  </Grid>

                  <Grid item xs={1} md={4} />
                </Grid>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
