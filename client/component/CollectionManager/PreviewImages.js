import {
  Box,
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
  IconButton,
} from "@mui/material";
import { Clear } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../config/firebase";
import { LoadingButton } from "@mui/lab";
import { Card, CardActionArea } from "@mui/material";
import { useRef } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { CardActions } from "@mui/material";
import { Send } from "@mui/icons-material";
import { LinearProgress } from "@mui/material";
import { CardContent } from "@mui/material";
import { Grid } from "@mui/material";

export default function PreviewImages(props) {
  const {data,images} = props
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const handleInput = () => {
    inputRef.current.click();
  };

  useEffect(() => {
    if (images) {
      setFiles([...images]);
    }
  }, [images]);

  useEffect(() => {
    files.map((file) => {
      return () => URL.revokeObjectURL(file);
    });
  }, [files]);

  const handleChange = (e) => {
    const files = Array.from(e.target.files)
    files.forEach((file) => {
      file.preview = URL.createObjectURL(file);
      setFiles((prev) => [...prev, file]);
    });
    e.target.value= ""
  };

  const handleDelete = (index) => {
    setFiles((files) => files.filter((_, idx) => idx !== index));
  };

  const handleUpload = async () => {
    
    const promises= files.map(async (file) => {
     const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef,file)
      console.log(uploadTask)
      uploadTask.on(
       `state_changed`,
       snapshot => {
           const prog = 
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
           
           console.log(prog)
           setProgress(prog)
           setLoading(true)
       },
       error => {
           console.log(error)
       }
      )
     return uploadTask.then(snapshot => getDownloadURL(snapshot.ref)) 
   });
   
   try {
     const urls = await Promise.all(promises)
     setLoading(false)
     data(urls);
   } catch (error) {
     console.log(error);
   }
 };
 console.log(files)
  return (
    <>
      <Card
        sx={{
          border: "2px dashed black",
          height: "100%",
          maxWidth: "540px",
          minHeight: "396px",
          padding: 1,
        }}
      >
        {!files?.length ? (
          <CardActionArea onClick={handleInput} sx={{ height: "100%" }}>
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <AddPhotoAlternateIcon fontSize="large" />
              <Typography
                variant="h3"
                style={{ fontSize: "calc(1rem + .5vw)" }}
              >
                click here to add images
              </Typography>
            </CardContent>
          </CardActionArea>
        ) : (
          <>
            <Grid container>
              <Grid item xs={12} height="90%">
                <CardActionArea onClick={handleInput} sx={{ height: "100%" }}>
                  <ImageList sx={{ height:480,paddingBottom:3}} rowHeight={180} cols={3}>
                    {files?.map((file, idx) => (
                      <ImageListItem key={idx}>
                        <img src={file.preview??file} alt={file} loading="lazy" height={"100%"} />
                        <ImageListItemBar
                          sx={{
                            background:
                              "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                              "rgba(0,0,0,0.3) 30%, rgba(0,0,0,0) 100%)",
                          }}
                          position="top"
                          actionIcon={
                            <IconButton
                              sx={{ color: "white" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(idx);
                              }}
                            >
                              <Clear />
                            </IconButton>
                          }
                          actionPosition="right"
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </CardActionArea>
              </Grid>
              <Grid item xs={12}>
              <LinearProgress variant="determinate" value={progress} />
                <CardActions onClick={handleUpload}>
                  <LoadingButton
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<Send />}
                    color="primary"
                    disabled={progress === 100}
                  >
                    <Typography>
                      {progress === 100 ? "uploaded" : "upload"}
                    </Typography>
                  </LoadingButton>
                </CardActions>
              </Grid>
            </Grid>
          </>
        )}
      </Card>
      <input
        type="file"
        multiple
        style={{ display: "none" }}
        ref={inputRef}
        onChange={handleChange}
      />
    </>
  );
}
