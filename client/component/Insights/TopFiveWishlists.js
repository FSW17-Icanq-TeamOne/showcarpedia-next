import { DataGrid } from '@mui/x-data-grid';
import { Grid, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

const columns = [
    { field: 'Product.brand', headerName: 'Brand', flex: 1 },
    { field: 'total', headerName: 'Total', flex: 1 },
];

const TopFiveWishlitsTable = () => {
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3001/v1/insights/topWishlists', {
            credentials: 'include'
        })
            .then(data => data.json())
            .then(data => {
                let temp = data.topWishlists
                let datanya = [];
                for(let i=0; i < temp.length; i++){
                    Object.assign(temp[i], {id:i})
                    datanya.push(temp[i])
                }
                setTableData(datanya)
            })
            .catch(err => console.log(err))
    }, [])


    return (
        <Grid container>
            <Grid item sm={1} lg={2} />

            <Grid item xs={12} lg={8}>
                <Grid container spacing={2}>
                    <Grid item xs>
                        <Typography variant={'h4'} textAlign='center'>
                            Top Five Wishlists
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <div style={{ display: 'flex', height: '100%' }}>
                            <div style={{ flexGrow: 1 }}>
                                <DataGrid
                                    initialState={{
                                        sorting: {
                                        sortModel: [{ field: 'total', sort: 'desc' }],
                                        },
                                    }}
                                    autoHeight
                                    rows={tableData}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                />
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item sm={1} lg={2}></Grid>

        </Grid>
    )
};

export default TopFiveWishlitsTable;