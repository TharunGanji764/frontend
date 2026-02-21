import Loader from "@/components/atoms/Loader";
import { SearchInputBox } from "@/components/organisms/Header/HeaderStyles";
import { Autocomplete, Box, TextField } from "@mui/material";
import Link from "next/link";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = (props: any) => {
  const { searchResults, isLoading, query, setQuery, router } = props;
  return (
    <SearchInputBox>
      <Autocomplete
        options={searchResults}
        loading={isLoading}
        filterOptions={(x) => x}
        autoHighlight
        getOptionLabel={(option: any) =>
          typeof option === "string" ? option : option?.product_name
        }
        inputValue={query}
        onInputChange={(_, newValue) => {
          setQuery(newValue);
        }}
        onChange={(_) => {
          setQuery("");
        }}
        noOptionsText={"No results found"}
        loadingText={
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Loader isComponentLevel />
          </Box>
        }
        sx={{ flex: 1 }}
        slotProps={{
          paper: {
            sx: {
              height: 320,
              borderRadius: "18px",
              overflow: "hidden",
              "& .MuiAutocomplete-noOptions": {
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
                color: "text.secondary",
              },
              "& .MuiAutocomplete-listbox": {
                height: "100%",
                overflowY: "auto",
              },
            },
          },
        }}
        renderOption={(props, option: any) => (
          <Box
            component="li"
            {...props}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start !important",
              justifyContent: "flex-start !important",
              width: "100%",
              px: 2,
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#f7f7f7",
              },
              border: "1px solid red",
            }}
          >
            <Link
              style={{ textDecoration: "none", color: "black", width: "100%" }}
              href={`/product/${option?.product_id}`}
            >
              {option?.product_name}
            </Link>
          </Box>
        )}
        renderInput={(params: any) => (
          <TextField
            {...params}
            placeholder="Search products"
            sx={{
              "& fieldset": { border: "none" },
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: undefined,
              startAdornment: <SearchIcon sx={{ mr: 1 }} />,
            }}
          />
        )}
      />
    </SearchInputBox>
  );
};

export default SearchBar;
