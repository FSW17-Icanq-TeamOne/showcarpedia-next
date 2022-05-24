import { Button, Grid } from "@mui/material";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from '../../config/firebase'

export default function MultipleImageUploader() {
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [urls, setUrls] = useState([]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!images) {
            setPreviews([
                'https://via.placeholder.com/600x400/f28329/ffffff?text=Upload+Image',
                'https://via.placeholder.com/600x400/f28329/ffffff?text=Upload+Image',
                'https://via.placeholder.com/600x400/f28329/ffffff?text=Upload+Image',
                'https://via.placeholder.com/600x400/f28329/ffffff?text=Upload+Image'
            ]);
            return;
        }
        images.map(image => {
            const objURL = URL.createObjectURL(image);
            setPreviews(prev => [...prev, objURL]);
            
            return () => URL.revokeObjectURL(objURL);
        });
    }, [images]);

    const handleChange = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];

            newImage.id = Math.random();

            setImages(prevState => [...prevState, newImage]);
        }
    };

    const handleUpload = () => {
        const promises = [];

        images.map(image => {
            image.nameFile = new Date() + image.name;
            const storageRef = ref(storage, `multipleImages/${image.nameFile}`);

            const uploadTask = uploadBytesResumable(storageRef, image);
            promises.push(uploadTask);
            
            uploadTask.on(
                `state_changed`,
                snapshot => {
                    const prog = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(prog)
                },
                error => {
                    console.log(error)
                },
                async () => {
                    await getDownloadURL(uploadTask.snapshot.ref)
                        .then(downloadURL => {
                            setUrls(prev => [...prev, downloadURL]);
                            console.log(`file available at `, downloadURL);
                        })
                        .catch(error => console.log(error));
                }
            );
        });
        Promise.all(promises)
            .then(() => alert('File is successfully uploaded'))
            .catch(error => console.log(error))
    }

    return (
        <>
        {/* Picture */}
        <Grid container display={'flex'} justifyContent={'center'} alignContent={'center'} 
            sx={{
                width: 500,
                height: 500,

                border: 1
            }}
        >
            {/* Image Viewer */}
            <Grid display={'flex'} justifyContent={'center'} alignItems={''}
                sx={{
                    width: 400,
                    height: 400
                }}
            >
                {urls.map((url, idx) => (
                    <img key={idx} style={{maxHeight: 100, maxWidth: 100}} src={url} lat={url} />
                ))}
            </Grid>

            <Grid display={'flex'} justifyContent={'center'} alignItems={'baseline'}>
                <progress 
                    value={progress} 
                    max='100%' 
                    style={{
                        width: 400
                    }}
                />

                {
                    previews.map((image, idx) => {
                        <img 
                            src={image}
                            key={idx}
                            style={{}}
                            alt={image.nameFile}
                        />
                    })
                }
            </Grid>

            <Grid display={'flex'} alignItems={'center'} justifyContent={'center'}>
                <input type={'file'} multiple onChange={handleChange} />
                <Button sx={{
                    width: 150,
                    
                    borderRadius: 20,

                    backgroundColor: 'orange',
                    color: 'white'
                }} onClick={handleUpload}>Upload</Button>
            </Grid>
        </Grid>
        </>
    )
}