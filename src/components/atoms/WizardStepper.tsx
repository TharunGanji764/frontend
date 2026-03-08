import {
  Stepper,
  Step,
  StepLabel,
  stepConnectorClasses,
  Box,
  StepIconProps,
  alpha,
} from "@mui/material";
import {
  InfoOutlined as InfoIcon,
  LayersOutlined as VariantsIcon,
  LocalOfferOutlined as PricingIcon,
  CollectionsOutlined as MediaIcon,
  RateReviewOutlined as ReviewIcon,
  Check,
} from "@mui/icons-material";
import { WIZARD_STEPS } from "@/constants/seller.constants";
import { ColorlibConnector, StepIconRoot, StepperLabel } from "./Styles";

function CustomStepIcon(props: StepIconProps) {
  const { active, completed, icon } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <InfoIcon fontSize="small" />,
    2: <VariantsIcon fontSize="small" />,
    3: <PricingIcon fontSize="small" />,
    4: <MediaIcon fontSize="small" />,
    5: <ReviewIcon fontSize="small" />,
  };

  return (
    <StepIconRoot $active={active} $completed={completed} $alpha={alpha}>
      {completed ? (
        <Check sx={{ fontSize: 22, fontWeight: 800 }} />
      ) : (
        icons[String(icon)]
      )}
    </StepIconRoot>
  );
}

interface Props {
  currentStep: number;
  completedSteps: number[];
}

export const WizardStepper = ({ currentStep, completedSteps }: Props) => {
  return (
    <Box sx={{ width: "100%", py: 1 }}>
      <Stepper
        alternativeLabel
        activeStep={currentStep}
        connector={
          <ColorlibConnector $stepConnectorClasses={stepConnectorClasses} />
        }
      >
        {WIZARD_STEPS.map((label, index) => (
          <Step key={label} completed={completedSteps.includes(index)}>
            <StepperLabel
              StepIconComponent={CustomStepIcon}
              $currentStep={currentStep}
              $index={index}
            >
              {label}
            </StepperLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};
