import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Grid } from "@mui/material";
import { Typography } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "title", headerName: "Title", flex: 1 },
  { field: "brand", headerName: "Brand", flex: 1 },
  { field: "year", headerName: "Year", flex: 1 },
  { field: "grade", headerName: "Grade", flex: 1 },
  { field: "kiloMeter", headerName: "Kilometer", flex: 1 },
  { field: "category", headerName: "Category", flex: 1 },
  {
    field: "#edit",
    headerName: "",
    renderCell: (cellValues) => {
      return (
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ textDecoration: "none", color: "white" }}
          href={`/admin/collection/edit/${cellValues.getValue(cellValues.id, "id")}`}
        >
          Edit
        </Button>
      );
    },
    flex: 1
  },
  {
    field: "#delete",
    headerName: "",
    renderCell: (cellValues) => {
      return (
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={function () {
            fetch(
              `http://localhost:3001/v1/cars/delete/${cellValues.getValue(
                cellValues.id,
                "id"
              )}`,
              {
                method: "DELETE",
                credentials: "include",
              }
            )
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                console.log(data, "This is the Data");
                if (data.message === "Success") {
                  window.location.reload();
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          Delete
        </Button>
      );
    },
    flex: 1
  },
];

const rows = [
  {
    id: 1,
    title: "718 Cayman GT4",
    brand: "Porsche",
    year: 2022,
    grade: 1,
    kiloMeter: 100,
    category: "Sport",
  },
  {
    id: 2,
    title: "Carrera 911",
    brand: "Porsche",
    year: 2019,
    grade: 2,
    kiloMeter: 200,
    category: "Sport",
  },
  {
    id: 3,
    title: "Ranger",
    brand: "Ford",
    year: 2018,
    grade: 3,
    kiloMeter: 1000,
    category: "Pickup",
  },
  {
    id: 4,
    title: "Explorer",
    brand: "Ford",
    year: 2019,
    grade: 3,
    kiloMeter: 500,
    category: "SUV",
  },
  {
    id: 5,
    title: "Tahoe",
    brand: "Chevrolet",
    year: 2020,
    grade: 2,
    kiloMeter: 400,
    category: "SUV",
  },
  {
    id: 6,
    title: "X5",
    brand: "BMW",
    year: 2020,
    grade: 1,
    kiloMeter: 400,
    category: "SUV",
  },
  {
    id: 7,
    title: "M8",
    brand: "BMW",
    year: 2021,
    grade: 1,
    kiloMeter: 1200,
    category: "Coupe",
  },
];

const ProductTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/v1/cars", {
      credentials: "include",
    })
      .then((data) => data.json())
      .then((data) => setTableData(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Grid container>
      <Grid item sm={1} lg={2} />
      <Grid item xs={12} lg={8}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant={"h4"} textAlign="center">
              Product List
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <DataGrid
              autoHeight
              rows={tableData}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              //checkboxSelection
            />
          </Grid>
          <Grid item xs={12}>
            <Button 
              variant="contained" 
              href={"/admin/collection/create"}
              style={{ textDecoration: "none", color: "white" }}
            >
              Create Product
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductTable;
