import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
  Grid,
  TextField,
  Card,
  CardActionArea,
  Avatar,
  Typography,
  IconButton,
  Box,
  FormLabel,
} from "@mui/material"
import {FastField, FieldArray, FormikProvider, useFormik} from "formik"
import {useEffect, useState} from "react"
import PreviewImages from "./PreviewImages"
import {TextareaAutosize} from "@mui/material"
import {useRouter} from "next/router"
import {fetchCarMakeData} from "../../redux/slices/carMakeSlice"
import {useDispatch, useSelector} from "react-redux"
import {Delete} from "@mui/icons-material"

export default function ProductUpdateForm() {
  const router = useRouter()
  const {id} = router.query
  const data = useSelector((state) => state.carMake)
  const dispatch = useDispatch()
  const [videoData, setVideoData] = useState([])
  const [productData, setproductData] = useState({
    title: "",
    brand: "",
    grade: "",
    category: "",
    year: "",
    kiloMeter: "",
    description: "",
    photoProducts: "",
    videos: [],
  })
  const getUrls = (url) => formik.setFieldValue("photoProducts", url)

  const fetchData = async () => {
    await dispatch(fetchCarMakeData())
  }

  async function convertUrl(url) {
    const response = await fetch(
      `http://youtube.com/oembed?url=${url}&format=json`
    )
    const data = await response.json()
    setVideoData((prev) => [...prev, data])
  }

  useEffect(() => {
    if (!router.isReady) return
    fetchData()
  }, [router.isReady])

  useEffect(() => {
    if (!router.isReady) return
    fetch(`http://localhost:3001/v1/cars/details/${id}`, {
      credentials: "include",
    })
      .then((data) => data.json())
      .then((data) => setproductData(data))
      .catch((err) => console.log(err))
  }, [router.isReady])

  useEffect(() => {
    productData.videos.forEach((video) => convertUrl(video))
  }, [productData.videos])

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
      videos: productData?.videos,
    },
    onSubmit: (value) => {
      console.log(value, `Product is Created`)
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
          return response.json()
        })
        .then((data) => {
          console.log(data, "This is the Data")
          if (data.message === "Success") {
            router.push("/admin/collection/lists")
            window.location.reload()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
  })

  const addField = async (values, arrayHelpers, index) => {
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
  console.log(videoData)
  return (
    <Grid container spacing={2}>
      {/* Picture */}
      <Grid item sm={1} lg={2}></Grid>
      <Grid item xs={12} sm={5} lg={4}>
        {/* Image Viewer */}
        <PreviewImages data={getUrls} images={productData?.photoProducts} />
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
                          {formik.values.videos?.map((values, index) => (
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
                                            src={videoData[index].thumbnail_url}
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
                                <FastField name={`videos.${index}`} key={index}>
                                  {({field, form, meta}) => (
                                    <Grid item key={index}>
                                      <Box display={"flex"} key={index} gap={1}>
                                        <TextField
                                          name={field.name}
                                          type="Text"
                                          label="input youtube url"
                                          error={
                                            meta.touched && Boolean(meta.error)
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
                                formik.values.videos?.length > 2 ? true : false
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
  )
}
