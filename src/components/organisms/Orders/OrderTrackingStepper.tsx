import { Stepper, Step, StepLabel } from "@mui/material";

const steps = ["Placed", "Shipped", "Out for Delivery", "Delivered"];

export default function OrderTrackingStepper({ status }: { status: string }) {
  const activeStep = steps.indexOf(status);

  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
