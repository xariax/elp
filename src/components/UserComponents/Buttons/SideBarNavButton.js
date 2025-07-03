import React from "react";
import { Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export function SidebarNavButton({
  to,
  open,
  label,
  icon,
  sx = {},
  ...props
}) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Button
      component={Link}
      to={to}
      startIcon={React.cloneElement(icon, { sx: { color: "inherit" } })}
      sx={{
        display: "flex",
        alignItems: "center",
        marginLeft: open ? 0 : "10px",
        justifyContent: open ? "flex-start" : "center",
        width: '100%',
        minWidth: 0,
        mb: 1,
        bgcolor: isActive ? "#1565c0" : "#1976d2",
        color: "#fff",
        px: open ? 2 : 0,
        borderRadius: "8px",
        transition: "box-shadow 0.2s, background 0.2s",
        boxShadow: "none",
        "&:hover": open?  {
          // eslint-disable-next-line no-undef
          color:"#eae8e7",
          bgcolor: "#1565c0",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          transition: "color 0.3s",
          zIndex: 1,
        }: {},
      
        ...sx,
      }}
      {...props}
    >
      {open && label}
    </Button>
  );
}
