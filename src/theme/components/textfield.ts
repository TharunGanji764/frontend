const SHOPHUB_TEXTFIELD_ROOT = {
  "& .MuiOutlinedInput-notchedOutline": {
    borderStyle: "solid !important",
    borderWidth: "1px !important",
    top: "-6px",
  },
  ".MuiInputBase-root": {
    borderRadius: "0px !important",
    "&:has(.MuiSvgIcon-root)": {
      paddingRight: "0.809vw",
      "@media( max-width: 640px )": {
        paddingRight: "2.427vw",
      },
    },
    "& .MuiSvgIcon-root": {
      fontSize: "1.042vw",
      "@media(max-width: 640px )": {
        fontSize: "3.125vw",
      },
    },
  },
  ".MuiInputBase-input": {
    color: "#493D5A",
    position: "relative",
    padding: "0.833vw 1.25vw",
    "@media( max-width: 640px )": {
      padding: "4.267vw",
    },
    "&::placeholder": {
      color: "#8D8698",
    },
    "&, &::placeholder": {
      fontWeight: 500,
      fontSize: "1.042vw",
      "@media( max-width: 640px )": {
        fontSize: "3.125vw",
      },
    },
  },
  "& .MuiFormHelperText-root": {
    fontWeight: 500,
    fontSize: "0.729vw",
    marginLeft: "unset",
    "@media(max-width:640px)": {
      fontSize: "3.733vw",
    },
  },
};
const SHOPHUB_TEXTFIELD_VARIANTS: any = [
  {
    props: {
      variant: "outlined",
    },
    style: ({ theme }: any) => ({
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "transparent",
      },
      "& .MuiOutlinedInput-root": {
        backgroundColor:"transparent",
      },
      "&:hover": {
        "& fieldset": {
          borderColor: `transparent !important`,
        },
      },
      "& .Mui-focused": {
        "& fieldset": {
          // border: `1px solid ${theme?.palette?.secondary?.main} !important`,
          "&:before": {
            content: '""',
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            height: "4px",
            backgroundColor: theme?.palette?.primary?.main,
          },
        },
      },
      "& .Mui-error": {
        "& fieldset": {
          "&:before": {
            backgroundColor: theme?.palette?.error?.dark,
          },
        },
      },
      "& .Mui-disabled": {
        "&:hover": {
          "& fieldset": {
            borderColor: `${theme?.palette?.secondary?.main} !important`,
          },
        },
      },
    }),
  },
];

const SHOPHUB_TEXTFIELD_THEME = {
  variants: SHOPHUB_TEXTFIELD_VARIANTS,
  root: SHOPHUB_TEXTFIELD_ROOT,
};

export default SHOPHUB_TEXTFIELD_THEME;
