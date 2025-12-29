import { Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function ScrollToTop() {
  return (
    <Fab
      size="small"
      color="primary"
      sx={{ position: "fixed", bottom: 80, right: 24 }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <KeyboardArrowUpIcon />
    </Fab>
  );
}
