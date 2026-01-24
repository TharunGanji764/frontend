import { Components } from "@mui/material/styles";

export const components: Components = {
  MuiButton: {
    defaultProps: {
      disableRipple: true,
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        borderRadius: "2.604vw",
        textTransform: "none",
        fontWeight: 600,
        padding: "0.417vw 1.042vw",
      },
    },
  },

  MuiGrid: {
    styleOverrides: {
      root: {
        columnGap: "18px",
        rowGap: "18px",
      },
    },
  },

  MuiSelect: {
    defaultProps: {
      MenuProps: {
        disableScrollLock: true,
      },
    },
    styleOverrides: {
      root: {
        border: "none",
        ":hover": {
          border: "none",
          outline: "none",
        },
        "& fieldset": {
          border: "none",
        },
      },
    },
  },

  MuiIconButton: {
    defaultProps: {
      disableRipple: true,
    },
    styleOverrides: {
      root: {
        ":hover": {
          backgroundColor: "#6B728020",
        },
      },
    },
  },

  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 14,
        boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
      },
    },
  },

  MuiTextField: {
    defaultProps: {
      size: "small",
    },
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        textTransform: "none",
      },
    },
  },
};
