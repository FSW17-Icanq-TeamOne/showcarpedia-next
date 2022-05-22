import { Grid, Typography } from "@mui/material";
import Link from 'next/link';

export default function SecondNavbar () {
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
                    Showcarpedia
                </Typography>

                <Grid
                    display={'flex'}
                    gap={'40px'}
                    marginRight={'165px'}
                >
                    <Link href={'/'}>
                        <Typography>Home</Typography>
                    </Link>

                    <Link href={'/collection'}>
                        <Typography>Collection</Typography>
                    </Link>
                </Grid>
            </Grid>
        </nav>
    )
}