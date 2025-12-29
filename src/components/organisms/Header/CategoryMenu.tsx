import { Menu, MenuItem, Button } from "@mui/material";
import { useState } from "react";

export default function CategoryMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <>
      <Button onClick={(e) => setAnchorEl(e.currentTarget)}>Categories</Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem>Electronics</MenuItem>
        <MenuItem>Fashion</MenuItem>
        <MenuItem>Home</MenuItem>
        <MenuItem>Beauty</MenuItem>
      </Menu>
    </>
  );
}
