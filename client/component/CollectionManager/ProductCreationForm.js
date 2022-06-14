import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
  Grid,
  TextField,
  TextareaAutosize,
  Snackbar,
  IconButton,
  SnackbarContent,
  FormLabel,
  Box,
  Typography,
  Avatar,
  Card,
  CardActionArea,
} from "@mui/material"
import {FastField, FieldArray, FormikProvider, useFormik} from "formik"
import React, {useEffect, useRef, useState} from "react"
import {fetchCarMakeData} from "../../redux/slices/carMakeSlice"
import PreviewImages from "./PreviewImages"
import {useRouter} from "next/router"
import {useDispatch, useSelector} from "react-redux"
import {Close, Delete, Send} from "@mui/icons-material"

export default function ProductCreationForm() {
  const data = useSelector((state) => state.carMake)
  const [videoData, setVideoData] = useState([])
  const dispatch = useDispatch()
  const getUrls = (url) => formik.setFieldValue("photoProducts", url)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const handleClose = () => setIsOpen(false)
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
  )

  const fetchData = async () => {
    await dispatch(fetchCarMakeData())
  }

  useEffect(() => {
    if (!router.isReady) return
    fetchData()
  }, [router.isReady])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      brand: "",
      grade: "",
      category: "",
      year: "",
      kiloMeter: "",
      description: "",
      photoProducts: "",
      videos: [],
    },
    onSubmit: async (value) => {
      try {
        const response = await fetch("http://localhost:3001/v1/cars", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(value),
        })
        console.log(await response.json())
        if (response.ok) {
          setIsOpen(true)
          router.push("/admin/collection/lists")
        } else {
          console.log("tidak ok")
        }
      } catch (error) {
        console.error(error)
      }
    },
  })

  const addField = async (values, arrayHelpers, index) => {
    console.log(arrayHelpers)
    const response = await fetch(
      `http://youtube.com/oembed?url=${values}&format=json`
    )
    if (!response.ok) {
      formik.setFieldError(`videos[${index}]`, "wrong url")
    } else {
      const data = await response.json()
      arrayHelpers.push("")
      setVideoData((prev) => [...prev, data])
      if (formik.values.videos.length === 3) {
        arrayHelpers.pop()
      }
    }
  }

  const deleteField = (arrayHelpers, idx) => {
    setVideoData((videos) => videos.filter((_, index) => index !== idx))
    arrayHelpers.remove(idx)
  }
  return (
    <>
      <Grid container spacing={2}>
        {/* Picture */}
        <Grid item sm={1} lg={2}></Grid>
        <Grid item xs={12} sm={5} lg={4}>
          {/* Image Viewer */}
          <PreviewImages data={getUrls} />
        </Grid>
        <Grid item xs={12} sm={5} lg={4}>
          <FormikProvider value={formik}>
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
                      <MenuItem value="">Brand</MenuItem>
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
                      <MenuItem value="">Grades</MenuItem>
                      {data?.grades.map((e, i) => (
                        <MenuItem value={e} key={i}>
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
                      <MenuItem value="">Category</MenuItem>
                      {data?.categories.map((e, i) => (
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
                  <FormControl fullWidth>
                    <FormLabel name="videos">Videos (optional max 3)</FormLabel>
                    <Box
                      border="2px solid #D3D3D3"
                      borderRadius="8px"
                      padding={1}
                    >
                      <FieldArray
                        name="videos"
                        render={(arrayHelpers) => (
                          <Grid container spacing={2}>
                            {formik.values.videos.map((values, index) => (
                              <>
                                {videoData[index] ? (
                                  <Grid item key={index} xs={12}>
                                    <Card width="100%" padding={1}>
                                      <CardActionArea
                                        href={values}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <Box
                                          width="100%"
                                          margin="0"
                                          display="flex"
                                          alignItems="center"
                                          padding={2}
                                        >
                                          <Avatar variant="rounded">
                                            <img
                                              src={
                                                videoData[index].thumbnail_url
                                              }
                                              alt={videoData[index].title}
                                              width="50px"
                                              height="50px"
                                              loading="lazy"
                                            />
                                          </Avatar>
                                          <Box
                                            sx={{
                                              overflow: "hidden",
                                              padding: "5px",
                                              minWidth: 0,
                                              textOverflow: "ellipsis",
                                              whiteSpace: "nowrap",
                                            }}
                                          >
                                            <Typography
                                              noWrap
                                              variant="body1"
                                              fontWeight="bold"
                                            >
                                              {videoData[index].title}
                                            </Typography>
                                            <Typography
                                              variant="body2"
                                              color={"#606060"}
                                            >
                                              {videoData[index].author_name}
                                            </Typography>
                                          </Box>
                                          <IconButton
                                            sx={{marginLeft: "auto"}}
                                            aria-label="delete"
                                            onClick={(e) => {
                                              e.stopPropagation()
                                              e.preventDefault()
                                              deleteField(arrayHelpers, index)
                                            }}
                                          >
                                            <Delete />
                                          </IconButton>
                                        </Box>
                                      </CardActionArea>
                                    </Card>
                                  </Grid>
                                ) : (
                                  <FastField
                                    name={`videos.${index}`}
                                    key={index}
                                  >
                                    {({field, form, meta}) => (
                                      <Grid item key={index}>
                                        <Box
                                          display={"flex"}
                                          key={index}
                                          gap={1}
                                        >
                                          <TextField
                                            name={field.name}
                                            type="Text"
                                            label="input youtube url"
                                            error={
                                              meta.touched &&
                                              Boolean(meta.error)
                                            }
                                            helperText={meta.error}
                                            value={field.value}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                          />
                                          <Button
                                            variant="outlined"
                                            onClick={() =>
                                              addField(
                                                values,
                                                arrayHelpers,
                                                index
                                              )
                                            }
                                          >
                                            send
                                          </Button>
                                        </Box>
                                      </Grid>
                                    )}
                                  </FastField>
                                )}
                              </>
                            ))}
                            <Grid item xs={12}>
                              <Button
                                disabled={
                                  formik.values.videos.length > 2 ? true : false
                                }
                                variant="outlined"
                                onClick={() => arrayHelpers.push("")}
                              >
                                +
                              </Button>
                            </Grid>
                          </Grid>
                        )}
                      />
                    </Box>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextareaAutosize
                    minRows={4}
                    maxRows={4}
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    placeholder="input your product's description"
                    style={{width: "100%"}}
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
          </FormikProvider>
        </Grid>
        <Grid item sm={1} lg={2}></Grid>
      </Grid>
      <Snackbar
        open={isOpen}
        onClose={handleClose}
        autoHideDuration={3000}
        action={action}
        anchorOrigin={{vertical: "top", horizontal: "right"}}
      >
        <SnackbarContent
          sx={{backgroundColor: "#4E9A51"}}
          message="success add productt"
          action={action}
        />
      </Snackbar>
    </>
  )
}
