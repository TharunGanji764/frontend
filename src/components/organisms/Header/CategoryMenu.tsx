import { FormControl, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import CapitalizeString from "@/utils/CapitalizeString";
import Link from "next/link";
import theme from "@/theme/theme";

export default function CategoriesDropdown() {
  const [category, setCategory] = useState("");
  const categories = useSelector(
    (state: RootState) => state.categories.categories,
  );

  return (
    <FormControl size="small">
      <Select
        value={CapitalizeString(category)}
        displayEmpty
        onChange={(e) => setCategory(e.target.value)}
        renderValue={(selected) => (selected ? selected : "Categories")}
        sx={{
          minWidth: "9.475vw",
        }}
        IconComponent={KeyboardArrowDownIcon}
      >
        {Array?.isArray(categories[0]) &&
          categories[0].map((category: any) => (
            <Link
              href={`/category/${category}`}
              key={category}
              style={{
                textDecoration: "none",
                color: theme?.palette?.primary?.main,
              }}
            >
              <MenuItem value={category}>{CapitalizeString(category)}</MenuItem>
            </Link>
          ))}
      </Select>
    </FormControl>
  );
}
