import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  IconButton,
} from "@mui/material"
import Link from "next/link"
import {FavoriteOutlined} from "@mui/icons-material"
import React, {useMemo, useState} from "react"
import {Snackbar} from "@mui/material"
import {Close} from "@mui/icons-material"
import {SnackbarContent} from "@mui/material"
import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {
  addWishlist,
  deleteWishlist,
  fetchWishlistData,
} from "../../redux/slices/wishlistSlice"
import {useRouter} from "next/router"
export default function Show({data, wishlist}) {
  console.log(wishlist)
  const router = useRouter()
  const [isWishlist, setIsWishlist] = useState(false)
  const [message, setMessage] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const handleClose = () => setIsOpen(false)

  useEffect(() => {
    if (wishlist.find((datum) => datum.id === data.id)) {
      setIsWishlist(true)
    }
  }, [wishlist])

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

  const handleWishlist = async () => {
    const message = await dispatch(addWishlist(data.id))
    switch (message.payload) {
      case "product has been added":
        await dispatch(deleteWishlist(data.id))
        setIsWishlist((prev) => !prev)
        setMessage("success delete from wishlist")
        setIsOpen(true)
        break

      default:
        setIsWishlist((prev) => !prev)
        setMessage("success add to wishlist")
        setIsOpen(true)
        break
    }
  }

  return (
    <>
      <Card
        sx={{
          borderRadius: 2,
          boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
          "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
          },
        }}
      >
        <CardMedia
          component={"img"}
          image={data?.photoProducts[0]}
          alt={data?.title}
          sx={{
            width: "90%",
            height: "250px",
            mx: "auto",
            mt: "10px",
            borderRadius: 2,
          }}
        />
        <CardContent>
          <Grid gridTemplateRows={"repeat(3,1fr)"}>
            <Grid
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography marginLeft={2} fontWeight="bold" fontSize={"1.5em"}>
                {data?.title}
              </Typography>
              <IconButton onClick={handleWishlist}>
                {isWishlist ? (
                  <FavoriteOutlined sx={{color: "red", transition: ".5s"}} />
                ) : (
                  <FavoriteOutlined />
                )}
              </IconButton>
            </Grid>

            <Grid
              display={"flex"}
              alignItems={"center"}
              marginTop={3}
              justifyContent="space-between"
            >
              <div className="model">
                <Typography marginLeft={2} fontWeight="bold">
                  Model Year
                </Typography>
                <Typography marginLeft={2}>{data?.year}</Typography>
              </div>
              <div className="odometer">
                <Typography marginRight={5} fontWeight="bold">
                  Odometer
                </Typography>
                <Typography marginRight={5}>{data?.kiloMeter} km</Typography>
              </div>
            </Grid>
            <Grid display={"flex"} justifyContent={"center"} marginTop={5}>
              <Link href={`/collection/${data.id}`}>
                <Button
                  sx={{
                    borderRadius: 30,
                    border: 2,
                    borderColor: "#2871CC",
                    "&:hover": {
                      transition: ".5s",
                      bgcolor: "#2871CC",
                      color: "white",
                    },
                  }}
                >
                  <Typography textTransform={"capitalize"} px={2}>
                    view detail
                  </Typography>
                </Button>
              </Link>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Snackbar
        open={isOpen}
        message={message}
        onClose={handleClose}
        autoHideDuration={3000}
        action={action}
        anchorOrigin={{vertical: "top", horizontal: "right"}}
      >
        <SnackbarContent
          sx={{backgroundColor: "#4E9A51"}}
          message={message}
          action={action}
        />
      </Snackbar>
    </>
  )
}
