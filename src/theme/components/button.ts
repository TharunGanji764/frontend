import { SHOPHUB_BUTTON_VARIANTS } from "./theme-constants";

const { PRIMARY, SECONDARY, PRIMARY_SMALL, SECONDARY_SMALL, LINK, TEXT } =
  SHOPHUB_BUTTON_VARIANTS;

export const SHOPHUB_BUTTON_ROOT: any = {
  ".MuiTouchRipple-root": {
    display: "none",
  },
  "& a": { color: "inherit", textDecoration: "none", fontSize: "inherit" },
  fontWeight: 700,
  boxShadow: "unset",
  maxHeight: "2.604vw",
  fontSize: "0.833vw",
  letterSpacing: "0.5px",
  whiteSpace: "nowrap",
  textTransform: "none",
  borderRadius: "1.4792vw",
  padding: "0.885vw 1.302vw",
  "@media (max-width: 640px)": {
    maxHeight: "13.333vw",
    lineHeight: "140%",
    fontSize: "4.267vw",
    borderRadius: "21.333vw",
    padding: "4.267vw 6.4vw",
  },
};

export const SHOPHUB_DEFAULT_BUTTONS = [
  {
    props: { variant: PRIMARY },
    style: {
      color: "#ffffff",
      background: "#111827",
      borderRadius: "1.458vw",
      "&:hover": {
        background: "#111827",
      },
      "&:focus": {
        outline: "2px solid #111827",
        outlineOffset: "2px",
        background: "#111827",
      },
      "&.Mui-disabled": {
        "&:hover": {
          background: "#111827",
        },
        "&:focus": {
          outline: "unset",
          outlineOffset: "0pc",
          background: "#111827",
        },
        color: "#ffffff70",
        background: "#111827",
      },
    },
  },
  {
    props: { variant: SECONDARY },
    style: {
      color: "#111827",
      border: "2px solid #111827",
      background: "#FFFFFF",
      borderRadius: "1.458vw",
      "&:hover": {
        background: "#FFFFFF",
      },
      "&:focus": {
        outline: "2px solid #111827",
      },
      "&.Mui-disabled": {
        "&:hover": {
          background: "#6B7280",
        },
        "&:focus": {
          outline: "unset",
        },
        color: "#6B7280",
        border: "2px solid #6B7280",
        opacity: "0.6",
      },
    },
  },
];

export const SHOPHUB_EXTENDED_BUTTONS = [
  {
    props: { variant: LINK },
    style: {
      color: "#111827",
      fontWeight: 700,
      textDecoration: "underline",
      background: "transparent",
      borderRadius: "1.458vw",
      textUnderlineOffset: "0.313vw",
      textDecorationThickness: `0.104vw !important`,
      "&:hover": {
        opacity: 1,
        background: "transparent",
        textDecoration: "underline",
        textDecorationThickness: `0.104vw !important`,
      },
      "&.Mui-disabled": {
        "&:hover": {
          background: "transparent",
          textDecoration: "underline",
          textDecorationThickness: `0.104vw !important`,
        },
        color: "#6B7280",
      },
      "@media(max-width:640px)": {
        textUnderlineOffset: "1.067vw",
        textDecorationThickness: `0.533vw !important`,
        "&:hover": {
          textDecorationThickness: `0.533vw !important`,
        },
        "&.Mui-disabled": {
          "&:hover": {
            textDecorationThickness: `0.533vw !important`,
          },
        },
      },
    },
  },
  {
    props: { variant: TEXT },
    style: {
      color: "#111827",
      fontWeight: 700,
      background: "transparent",
      borderRadius: "1.458vw",
      "&:hover": {
        background: "transparent",
      },
      "&.Mui-disabled": {
        color: "#6B7280",
      },
    },
  },
  // {
  //   props: { variant: PRIMARY_SMALL },
  //   style: {
  //     color: "#ffffff",
  //     fontWeight: 900,
  //     lineHeight: "140%",
  //     fontSize: "0.729vw",
  //     maxHeight: "2.083vw",
  //     borderRadius: "4.167vw",
  //     background: "#502C8E",
  //     padding: "0.677vw 1.042vw",
  //     "&:hover": {
  //       background: "#2F1164",
  //     },
  //     "&:focus": {
  //       outline: "2px solid #502C8E",
  //       outlineOffset: "2px",
  //       background: "#502C8E",
  //     },
  //     "&.Mui-disabled": {
  //       "&:hover": {
  //         background: "#502C8E",
  //       },
  //       "&:focus": {
  //         outline: "unset",
  //         outlineOffset: "0pc",
  //         background: "#502C8E",
  //       },
  //       color: "#ffffff70",
  //       background: "#502C8E",
  //     },
  //     "@media (max-width: 640px)": {
  //       maxHeight: "10.667vw",
  //       lineHeight: "140%",
  //       fontSize: "3.733vw",
  //       borderRadius: "21.333vw",
  //       padding: "3.467vw 5.333vw",
  //     },
  //   },
  // },
  // {
  //   props: { variant: SECONDARY_SMALL },
  //   style: {
  //     color: "#502C8E",
  //     background: "#FFFFFF",
  //     fontWeight: 900,
  //     lineHeight: "140%",
  //     fontSize: "0.729vw",
  //     maxHeight: "2.083vw",
  //     borderRadius: "4.167vw",
  //     border: "2px solid #502C8E",
  //     padding: "0.677vw 1.042vw",
  //     "&:hover": {
  //       background: "#FFFFFF",
  //     },
  //     "&:focus": {
  //       outline: "2px solid #502C8E",
  //     },
  //     "&.Mui-disabled": {
  //       "&:hover": {
  //         background: "#B9ABD2",
  //       },
  //       "&:focus": {
  //         outline: "unset",
  //       },
  //       color: "#B9ABD2",
  //       border: "2px solid #B9ABD2",
  //     },
  //     "@media (max-width: 640px)": {
  //       maxHeight: "10.667vw",
  //       fontSize: "3.733vw",
  //       borderRadius: "21.333vw",
  //       padding: "3.467vw 5.333vw",
  //     },
  //   },
  // },
];

const SHOPHUB_BUTTON_THEME = {
  root: SHOPHUB_BUTTON_ROOT,
  variants: [...SHOPHUB_DEFAULT_BUTTONS, ...SHOPHUB_EXTENDED_BUTTONS],
};

export default SHOPHUB_BUTTON_THEME;
