import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { useFormik } from "formik";
import { getFormControlUnstyledUtilityClasses } from '@mui/base';

export default function Filter () {
    const [brands, setBrands] = useState([]);
    const [category, setCategory] = useState([]);
    const [year, setYear] = useState([]);
    const mileages = ['1000', '5000', '10000', '20000', '50000'];
    const grades = ['1', '2', '3', '4', '5'];

    const router = useRouter()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            brand: '',
            category: '',
            minYear: '',
            maxMileages: '',
            grade: '',
        }, 
        onSubmit: async (values) => {
            const year = Number(values.minYear);
            const grade = Number(values.grades);
            const mileages = Number(values.maxMileages);

            router.push(`/search?milages=${mileages}&minYear=${year}&grade=${grade}&brand=${values.brand}&category=${values.category}`);
        }
    });

    return (
        <Container>
            <Typography 
                variant={'h4'}
                color='grey'
                fontWeight={'500'}
                textAlign={'center'}
                marginTop={2}
                marginBottom={3}
            >
                Filter
            </Typography>
            <form onSubmit={formik.onSubmit}>
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    <Grid item xs={4} sm={4} md={4}>
                        <FormControl fullwidth={true}>
                            <InputLabel id='brand'>Brand</InputLabel>
                            <Select
                                label='brand'
                                name='brand'
                                value={formik.values.brand}
                                onBlur={formik.handleBlur}
                                onChange={(e) => formik.setFieldValue('brand', e.target.value)}
                            >
                                {brands.map((e, idx) => (
                                    <MenuItem value={e} key={idx}>
                                        {e}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4} sm={4} md={4}>
                        <FormControl fullwidth={true}>
                            <InputLabel id='category'>Category</InputLabel>
                            <Select
                                label='category'
                                name='category'
                                value={formik.values.category}
                                onBlur={formik.handleBlur}
                                onChange={(e) => formik.setFieldValue('category', e.target.value)}
                            >
                                {category.map((e, idx) => (
                                    <MenuItem value={e} key={idx}>
                                        {e}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4} sm={4} md={4}>
                        <FormControl fullwidth={true}>
                            <InputLabel id='minYear'>Year</InputLabel>
                            <Select
                                label='minYear'
                                name='minYear'
                                value={formik.values.minYear}
                                onBlur={formik.handleBlur}
                                onChange={(e) => formik.setFieldValue('minYear', e.target.value)}
                            >
                                {year.map((e, idx) => (
                                    <MenuItem value={e} key={idx}>
                                        {e}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4} sm={4} md={4}>
                        <FormControl fullwidth={true}>
                            <InputLabel id='maxMileages'>Milages</InputLabel>
                            <Select
                                label='maxMileages'
                                name='maxMileages'
                                value={formik.values.maxMileages}
                                onBlur={formik.handleBlur}
                                onChange={(e) => formik.setFieldValue('maxMileages', e.target.value)}
                            >
                                {mileages.map((e, idx) => (
                                    <MenuItem value={e} key={idx}>
                                        {e}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4} sm={4} md={4}>
                        <FormControl fullwidth={true}>
                            <InputLabel id='grades'>Grades</InputLabel>
                            <Select
                                label='grades'
                                name='grades'
                                value={formik.values.grades}
                                onBlur={formik.handleBlur}
                                onChange={(e) => formik.setFieldValue('grades', e.target.value)}
                            >
                                {grades.map((e, idx) => (
                                    <MenuItem value={e} key={idx}>
                                        {e}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid display={'flex'} marginTop={'15px'} justifyContent={'center'}>
                    <Grid>
                        <Button 
                            onClick={() => router.push('/collection')}
                            sx={{
                                borderRadius: 30,
                                borderColor: '#2871CC',
                                '&:hover': {
                                    transition: '.5s',
                                    bgcolor: 'red',
                                    color: 'white'
                                }
                            }}
                        >
                            Reset
                        </Button>
                    </Grid>

                    <Grid>
                        <Button
                            type='submit'
                            sx={{
                                borderRadius: 30,
                                borderColor: '#2871CC',
                                '&:hover': {
                                    transition: '.5s',
                                    bgcolor: '#2871CC',
                                    color: 'white'
                                }
                            }}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>

            </form>
        </Container>
    )
}