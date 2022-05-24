import {
  AppBar,
  Container,
  IconButton,
  Box,
  Tooltip,
  Avatar,
  Grid,
  Toolbar,
  Grow,
  Typography,
  MenuItem,
  Menu,
  Link,
} from "@mui/material";
import { Menu as MenuIcon, DirectionsCar } from "@mui/icons-material";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { UserSidebar } from "./DashboardSidebarUser";

export default function Dashboard() {
  const [cookie, setCookie, removeCookie] = useCookies("access_token");
  const [istoggle, setIsToggle] = useState(true);
  const handleToggle = () => {
    setIsToggle((prev) => !prev);
  };

  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = ["Profile", "Account", "Dashboard", "Logout"];
  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "orange" }} elevation={0}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              onClick={() => handleToggle()}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            
            {/* Desktop Mode */}
            <DirectionsCar
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography
                sx={{
                  flexGrow: 1,
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontStyle: "normal",
                  fontWeight: "bold",
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                SHOWCARPEDIA
              </Typography>
            </Link>

            {/* Mobile Mode */}
            <DirectionsCar
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
            <Link
              href="/"
              style={{ textDecoration: "none", color: "inherit" }}
              sx={{ flexGrow: 1 }}
            >
              <Typography
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  fontStyle: "normal",
                  fontWeight: "bold",
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                SHOWCARPEDIA
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Sign Out</Typography>
                  </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Grid item xs={2} sx={{ display: istoggle ? "unset" : "none" }}>
        <Grow in={istoggle}>
          <UserSidebar />
        </Grow>
      </Grid>
    </>
  );
}
