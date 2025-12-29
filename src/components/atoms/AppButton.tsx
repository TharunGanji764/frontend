import { Button, ButtonProps } from "@mui/material";

interface AppButtonProps extends ButtonProps {
  variantType?: "primary" | "secondary" | "outline";
}

export default function AppButton({
  variantType = "primary",
  ...props
}: AppButtonProps) {
  const variantMap = {
    primary: "contained",
    secondary: "contained",
    outline: "outlined",
  } as const;

  return (
    <Button
      variant={variantMap[variantType]}
      color={variantType === "secondary" ? "secondary" : "primary"}
      {...props}
    />
  );
}
