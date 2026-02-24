const SHOPHUB_CHECKBOX_VARIANTS: any = [
  {
    props: {
      variant: "gradient",
    },
    style: ({ theme }: any) => ({
      padding: "0px",
      overflow: "hidden",
      borderRadius: "100%",
      background: "#FFFFFF",
      border: "1px solid transparent",
      "&.Mui-checked": {
        color: theme?.palette?.primary?.main,
        border: "1px solid transparent",
        "& .outer-box": {
          overflow: "hidden",
          background: theme?.palette?.primary?.main,
        },
        "& .inner-box": {
          borderRadius: "100%",
          background: "#FFFFFF",
        },
      },
    }),
  },
];

const SHOPHUB_CHECKBOX_THEME = {
  variants: SHOPHUB_CHECKBOX_VARIANTS,
  root: {},
};

export default SHOPHUB_CHECKBOX_THEME;
