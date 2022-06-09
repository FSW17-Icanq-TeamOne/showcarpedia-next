import { Grid, Typography } from "@mui/material";
import Link from 'next/link';
import React, { useState, useEffect } from "react";
import styles from '../../styles/Login+Register.module.css';

export default function SecondNavbar () {
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
    return (
        <nav>
            <Grid
                display={'flex'}
                alignItems={'baseline'}
                marginBottom={'45px'}
                marginTop={'30px'}
            >
                <Typography
                    marginLeft={'200px'}
                    mr={'auto'}
                    variant={'h5'}
                >
                    {webData?.title}
                </Typography>

                <Grid
                    display={'flex'}
                    gap={'40px'}
                    marginRight={'165px'}
                >
                    <Link href={'/'}>
                        <Typography className={styles.Link}>Home</Typography>
                    </Link>

                    <Link href={'/collection'}>
                        <Typography className={styles.Link}>Collection</Typography>
                    </Link>
                </Grid>
            </Grid>
        </nav>
    )
}