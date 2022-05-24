import {
    Input,
    Button,
    Card,
    CardContent,
    Box,
    Grid,
    TextField,
    Typography,
    Avatar,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import UserNavbar from '../../../../component/Dashboard/UserNavbar';
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { storage } from "../../../../config/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function Profile() {
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
      handleUpload();
    };
  
    const [profile, setProfile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [url, setUrl] = useState(null);
  
    useEffect(() => {
      if (!profile) {
        setPreview(
          // 'https://cdn.discordapp.com/attachments/960564590574456852/965225077069193326/jhondoe.jpg'
          ""
        );
        return;
      }
      const objUrl = URL.createObjectURL(profile);
      setPreview(objUrl);
      return () => URL.revokeObjectURL(objUrl);
    }, [profile]);
  
    const handleChange = (e) => {
      if (!e.target.files) {
        setProfile(undefined);
      }
      setProfile(e.target.files[0]);
      //handleUpload();
    };
  
    const handleUpload = () => {
      const storageRef = ref(storage, `profileImages/${profile.name}`);
  
      const uploadTask = uploadBytesResumable(storageRef, profile);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`file upload is ` + progress + ` % done`);
          switch (snapshot.state) {
            case "paused":
              console.log("upload is paused");
              break;
            case "running":
              console.log("upload is running");
              break;
            case "error":
              console.log("error happened");
              break;
            case "canceled":
              console.log("upload is cancelled");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            console.log("file available at", downloadUrl);
            setUrl(downloadUrl);
            console.log("ini url", downloadUrl);
            formik.setFieldValue("profilePicture", downloadUrl);
          });
        }
      );
    };
  
    const router = useRouter()
  
    const [profileData, setprofileData] = useState({
      fullName: "",
      mobilePhone: "",
      birthDate: "",
      country: "",
      city: "",
      profilePicture: "",
    });
  
    useEffect(() => {
      fetch("http://localhost:4000/v1/user/profile/", {
        credentials: "include",
      })
        .then((data) => data.json())
        .then((data) => setprofileData(data))
        .catch((err) => console.log(err));
    }, []);
  
    const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
        fullName: profileData?.fullName,
        mobilePhone: profileData?.mobilePhone,
        birthDate: profileData?.birthDate,
        country: profileData?.country,
        city: profileData?.city,
        profilePicture: profileData?.profilePicture,
      },
      onSubmit: (values) => {
        //console.log(values, 'UserUpdated')
        fetch("http://localhost:4000/v1/user/profile", {
          method: "PUT",
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
              router.push("/user/edit/profile");
              window.location.reload();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
    });
  
    let previewPhoto = preview;
    if (!previewPhoto) {
      previewPhoto = formik.values.profilePicture;
    } else {
      previewPhoto = preview;
    }
  
    return (
      <Grid container>
        <UserNavbar />
        <Grid item xs>
          <Grid container spacing={2}>
            <Grid item sm={1} lg={2} />
            <Grid item xs={12} sm={10} lg={8}>
              <Box sx={{ minHeight: "calc(100vh - 64px)" }}>
                <Grid
                  container
                  columns={{ xs: 6, md: 12 }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <Grid item xs={6} md={12}>
                    <Typography variant={"h4"} textAlign="center" mt={2.5}>
                      Profile
                    </Typography>
                  </Grid>
  
                  <Grid item xs={1} md={4} />
  
                  <Grid item xs={4} md={4}>
                    <Grid
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      gap={"30px"}
                    >
                      <Avatar
                        src={formik.values.profilePicture}
                        sx={{ width: 100, height: 100 }}
                      />
                      <Grid>
                        <TextField
                          id="fullName"
                          name="fulName"
                          value={formik.values.fullName}
                          variant="standard"
                          sx={{
                            width: 175,
                          }}
                        />
                        <br></br>
                        <br></br>
                        <Button
                          variant="contained"
                          onClick={handleClickOpen}
                          startIcon={<PhotoCameraIcon />}
                        >
                          Change Photo
                        </Button>
                        <BootstrapDialog
                          onClose={handleClose}
                          aria-labelledby="customized-dialog-title"
                          open={open}
                        >
                          <BootstrapDialogTitle
                            width="250px"
                            id="customized-dialog-title"
                            onClose={handleClose}
                          >
                            Change Photo Profile
                          </BootstrapDialogTitle>
  
                          <DialogContent dividers>
                            {/* <input type='file' onChange={handleChange} /> */}
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                {/* <Item> */}
                                <Avatar
                                  src={previewPhoto}
                                  sx={{ width: 100, height: 100 }}
                                />
                                {/* </Item> */}
                              </Grid>
                              <Grid marginTop={4} item xs={4}>
                                {/* <Item> */}
                                <label htmlFor="contained-button-file">
                                  <Input
                                    style={{ display: "none" }}
                                    accept="image/*"
                                    id="contained-button-file"
                                    type="file"
                                    onChange={handleChange}
                                  />
                                  <Button variant="contained" component="span">
                                    Upload
                                  </Button>
                                </label>
                                {/* </Item> */}
                              </Grid>
                            </Grid>
                          </DialogContent>
                          <DialogActions>
                            <Button autoFocus onClick={handleClose}>
                              Save change
                            </Button>
                          </DialogActions>
                        </BootstrapDialog>
                      </Grid>
                    </Grid>
                  </Grid>
  
                  <Grid item xs={1} md={4} />
                  <Grid item xs={1} md={4} />
  
                  <form onSubmit={formik.handleSubmit}>
                    <Grid marginTop={"40px"} item xs={4} md={4}>
                      <TextField
                        id="fullName"
                        name="fullName"
                        label="Full Name"
                        sx={{ width: "300px" }}
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.fullName &&
                          Boolean(formik.errors.fullName)
                        }
                        helperText={
                          formik.touched.fullName && formik.errors.fullName
                        }
                      />
                    </Grid>
  
                    <Grid item xs={1} md={4} />
                    <Grid item xs={1} md={4} />
  
                    <Grid marginTop={"20px"} item xs={4} md={4}>
                      <TextField
                        id="mobilePhone"
                        name="mobilePhone"
                        label="Mobile Phone"
                        type="tel"
                        sx={{ width: "300px" }}
                        value={formik.values.mobilePhone}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.mobilePhone &&
                          Boolean(formik.errors.mobilePhone)
                        }
                        helperText={
                          formik.touched.mobilePhone && formik.errors.mobilePhone
                        }
                      />
                    </Grid>
  
                    <Grid item xs={1} md={4} />
                    <Grid item xs={1} md={4} />
  
                    <Grid marginTop={"20px"} item xs={4} md={4}>
                      <TextField
                        id="birthDate"
                        name="birthDate"
                        label="Birth Date"
                        type="date"
                        sx={{ width: "300px" }}
                        value={formik.values.birthDate}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.birthDate &&
                          Boolean(formik.errors.birthDate)
                        }
                        helperText={
                          formik.touched.birthDate && formik.errors.birthDate
                        }
                      />
                    </Grid>
  
                    <Grid item xs={1} md={4} />
                    <Grid item xs={1} md={4} />
  
                    <Grid marginTop={"20px"} item xs={4} md={4}>
                      <TextField
                        id="country"
                        name="country"
                        label="Country"
                        sx={{ width: "300px" }}
                        value={formik.values.country}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.country && Boolean(formik.errors.country)
                        }
                        helperText={
                          formik.touched.country && formik.errors.country
                        }
                      />
                    </Grid>
  
                    <Grid item xs={1} md={4} />
                    <Grid item xs={1} md={4} />
  
                    <Grid marginTop={"20px"} item xs={4} md={4}></Grid>
                    <TextField
                      id="city"
                      name="city"
                      label="City"
                      sx={{ width: "300px" }}
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      error={formik.touched.city && Boolean(formik.errors.city)}
                      helperText={formik.touched.city && formik.errors.city}
                    />
                    <Grid item xs={1} md={4} />
                    <Grid item xs={1} md={4} />
  
                    <Grid marginTop={"20px"} item xs={4} md={4}>
                      <Button
                        type={"submit"}
                        sx={{
                          backgroundColor: "orange",
                          color: "white",
  
                          width: 300,
                          height: 40,
  
                          borderRadius: 20,
                        }}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </form>
  
                  <Grid item xs={1} md={4} />
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }