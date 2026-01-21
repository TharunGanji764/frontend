import { FormControl, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function CategoriesDropdown() {
  const [category, setCategory] = useState("");

  return (
    <FormControl size="small">
      <Select
        value={category}
        displayEmpty
        onChange={(e) => setCategory(e.target.value)}
        renderValue={(selected) => (selected ? selected : "Categories")}
        sx={{ minWidth: "140px" }}
        IconComponent={KeyboardArrowDownIcon}
      >
        <MenuItem value="electronics">Electronics</MenuItem>
        <MenuItem value="fashion">Fashion</MenuItem>
        <MenuItem value="home">Home</MenuItem>
        <MenuItem value="beauty">Beauty</MenuItem>
      </Select>
    </FormControl>
  );
}
