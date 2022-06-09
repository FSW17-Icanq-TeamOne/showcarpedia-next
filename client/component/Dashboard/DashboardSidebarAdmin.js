import {
  SupervisorAccount,
  Inventory,
  SettingsApplications,
  Forum,
  Insights,
  Home,
} from "@mui/icons-material";
import {
  Box,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  List,
  Link,
} from "@mui/material";
import React, { useState, useEffect } from "react";

function DashboardSidebarAdmin() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const getRole = localStorage.getItem("role");
    setRole(getRole);
  }, []);

  return (
    <Box style={{ height: "calc(100vh-64px)" }}>
      <List>
        <Link href="/" style={{ textDecoration: "none", color: "black" }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText
                primary="Home Page"
                sx={{ display: { xs: "none", sm: "unset" } }}
              />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link href="/admin/insights" style={{ textDecoration: "none", color: "black" }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Insights />
              </ListItemIcon>
              <ListItemText
                primary="Insights"
                sx={{ display: { xs: "none", sm: "unset" } }}
              />
            </ListItemButton>
          </ListItem>
        </Link>

        {role === "superAdmin" && (
          <Link
            href="/admin/manager/lists"
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SupervisorAccount />
                </ListItemIcon>
                <ListItemText
                  primary="Admin Manager"
                  sx={{ display: { xs: "none", sm: "unset" } }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        )}

        <Link
          href="/admin/collection/lists"
          style={{ textDecoration: "none", color: "black" }}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Inventory />
              </ListItemIcon>
              <ListItemText
                primary="Collection Manager"
                sx={{ display: { xs: "none", sm: "unset" } }}
              />
            </ListItemButton>
          </ListItem>
        </Link>

        {role === "superAdmin" && (
          <Link href="/admin/chat" style={{ textDecoration: "none", color: "black" }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Forum />
                </ListItemIcon>
                <ListItemText
                  primary="Chat Room"
                  sx={{ display: { xs: "none", sm: "unset" } }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        )}

        <Link href="/admin/web/settings" style={{ textDecoration: "none", color: "black" }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsApplications />
              </ListItemIcon>
              <ListItemText
                primary="Web Settings"
                sx={{ display: { xs: "none", sm: "unset" } }}
              />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Box>
  );
}

export const AdminSidebar = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} {...props}>
      <DashboardSidebarAdmin />
    </div>
  );
});
