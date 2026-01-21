import { CreateStyled } from "@emotion/styled";

const transientProps: Parameters<CreateStyled>[1] = {
  shouldForwardProp: (propName: string) => !propName.startsWith("$"),
};

export default transientProps;
