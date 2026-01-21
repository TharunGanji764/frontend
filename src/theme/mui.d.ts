import "@mui/material/styles";
import "@mui/material/Switch";
import "@mui/material/Checkbox";
import "@mui/material/Typography";
import { SxProps, Theme } from "@mui/material/styles";

declare module "@mui/material/Checkbox" {
  interface CheckboxProps {
    variant?: "gradient";
  }
}
declare module "@mui/material/Switch" {
  interface SwitchProps {
    variant?: "blaze-g";
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    h1: true;
    h2: true;
    h3: true;
    h4: true;
    h5: true;
    h6: true;
    body1: true;
    body2: true;
    button: true;
    link: true;
    caption: false;
    inherit: true;
    overline: false;
    subtitle1: false;
    subtitle2: false;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    //TODO: Need to remove from the type declarations

    //* Default variants
    text: true;
    outlined: true;
    contained: true;

    //* New Variants
    primary: true;
    secondary: true;
    link: true;
  }
}

declare module "@mui/material/styles" {
  interface TypographyVariantsOptions {
    fontFamily: string;

    link: SxProps<Theme>;
    button: SxProps<Theme>;
  }
  interface Palette {
    primary: {
      main: string;
    };
    secondary: {
      main: string;
    };
    background: {
      default: string;
      paper: string;
    };
    text: {
      primary: string;
      secondary: string;
    };
    success: {
      main: string;
    };
    error: {
      main: string;
    };
    warning: {
      main: string;
    };
  }
  interface PaletteOptions {
    primary: {
      main: string;
    };
    secondary: {
      main: string;
    };
    background: {
      default: string;
      paper: string;
    };
    text: {
      primary: string;
      secondary: string;
    };
    success: {
      main: string;
    };
    error: {
      main: string;
    };
    warning: {
      main: string;
    };
  }
  interface ButtonVariants {
    //*Default
    text: false;
    outlined: false;
    contained: false;

    //* New variants
    primary?: SxProps<Theme>;
    secondary?: SxProps<Theme>;
    link?: SxProps<Theme>;

    gradient?: SxProps<Theme>;
  }

  interface TypographyVariants {
    //*body
    "b-10": React.CSSProperties;

    //* headings
    "h-24": React.CSSProperties;

    //*default configurations
    h1: React.CSSProperties;
    h2: React.CSSProperties;
    h3: React.CSSProperties;
    h4: React.CSSProperties;
    h5: React.CSSProperties;
    h6: React.CSSProperties;
    body1: React.CSSProperties;
    body2: React.CSSProperties;
    button: React.CSSProperties;
    caption: React.CSSProperties;
    inherit: React.CSSProperties;
    overline: React.CSSProperties;
    subtitle1: React.CSSProperties;
    subtitle2: React.CSSProperties;

    //!Deprecated: |LEGACY FONTS|
    //* headings
    "heading-xl": React.CSSProperties;

    //*body
    "body-xxl": React.CSSProperties;
    "body-xsl": React.CSSProperties;

    //* headings for mobile
    "m-heading-l": React.CSSProperties;

    //*body for mobile
    "m-body-xsl": React.CSSProperties;
    "m-body-xxl": React.CSSProperties;

    button: React.CSSProperties;
    link: React.CSSProperties;
  }
}
