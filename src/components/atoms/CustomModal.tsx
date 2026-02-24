import {
  Modal,
  Typography,
  Box,
  IconButton,
  Stack,
  TextField,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type CustomModalProps = {
  open: boolean;
  onClose: () => void;
  headingTitle?: string;
  width?: number | string;
  isFormModal?: boolean;
  formFields?: any;
  setFormData?: React.Dispatch<React.SetStateAction<any>>;
  formData?: any;
  onSave?: () => void;
  errors?: any;
  setErrors?: React.Dispatch<React.SetStateAction<any>>;
  isDeleteModal?: boolean;
  description?: string;
  onDelete?: () => void;
};

const CustomModal = ({
  open,
  onClose,
  headingTitle,
  width = 500,
  isFormModal = false,
  formFields = [],
  setFormData,
  formData,
  onSave,
  errors,
  setErrors,
  description,
  isDeleteModal = false,
  onDelete,
}: CustomModalProps) => {
  return (
    <Modal
      open={open}
      onClose={(event: any, reason: string) => {
        if (reason === "backdropClick" || reason === "escapeKeyDown") {
          setErrors && setErrors({});
        }
        onClose();
      }}
      closeAfterTransition
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          position: "relative",
          width: width,
          bgcolor: "background.paper",
          borderRadius: "20px",
          boxShadow: "0 24px 48px rgba(0,0,0,0.1)",
          p: 4,
          outline: "none",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 3 }}
        >
          {headingTitle && (
            <Typography
              sx={{
                fontSize: "1.25rem",
                fontWeight: 800,
                letterSpacing: "-0.02em",
              }}
            >
              {headingTitle}
            </Typography>
          )}

          <IconButton onClick={onClose} size="small" sx={{ color: "grey.400" }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Stack>

        {isFormModal && (
          <Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 4,
                mt: 2,
              }}
            >
              {formFields?.map((field: any) =>
                field?.name !== "is_default" ? (
                  <TextField
                    id={field?.name}
                    label={field?.label}
                    placeholder={field?.placeholder}
                    variant="standard"
                    InputLabelProps={{
                      shrink: true,
                      sx: {
                        fontWeight: 500,
                        color: !!errors[field?.name]
                          ? "error.main"
                          : "text.primary",
                        fontSize: "16px",
                      },
                    }}
                    sx={{
                      ".MuiInputBase-input": {
                        "&::placeholder": {
                          color: "#6B7280",
                        },
                        "&, &::placeholder": {
                          fontWeight: 500,
                          fontSize: "14px",
                        },
                      },
                      "& .MuiFormHelperText-root": {
                        fontSize: "10px",
                        fontWeight: 600,
                        marginTop: "4px",
                      },
                    }}
                    onChange={(e: any) => {
                      if (setFormData) {
                        setFormData((prev: any) => ({
                          ...prev,
                          [field?.name]: e?.target?.value,
                        }));
                      }
                      if (errors[field?.name]) {
                        setErrors &&
                          setErrors((prev: any) => {
                            const newErrors = { ...prev };
                            delete newErrors[field?.name];
                            return newErrors;
                          });
                      }
                    }}
                    value={
                      formData && formData[field?.name]
                        ? formData[field?.name]
                        : ""
                    }
                    required={field?.required}
                    helperText={errors[field?.name] || ""}
                    error={!!errors[field?.name]}
                  />
                ) : (
                  <>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            variant="gradient"
                            checked={Boolean(formData[field?.name])}
                          />
                        }
                        label={field?.label}
                        onChange={(e: any) => {
                          if (setFormData) {
                            setFormData((prev: any) => ({
                              ...prev,
                              [field?.name]: e?.target?.checked,
                            }));
                          }
                          if (errors[field?.name]) {
                            setErrors &&
                              setErrors((prev: any) => {
                                const newErrors = { ...prev };
                                delete newErrors[field?.name];
                                return newErrors;
                              });
                          }
                        }}
                      />
                    </FormGroup>
                  </>
                ),
              )}
            </Box>
            <Button
              variant="contained"
              sx={{ float: "right" }}
              onClick={() => {
                if (onSave) onSave();
              }}
            >
              Save
            </Button>
          </Box>
        )}
        {isDeleteModal && (
          <Stack>
            <Typography variant="body1">{description}</Typography>
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: "12px",
                alignSelf: "flex-end",
                marginTop: "12px",
              }}
            >
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="primary-d" onClick={onDelete}>
                Delete
              </Button>
            </Stack>
          </Stack>
        )}
      </Box>
    </Modal>
  );
};

export default CustomModal;
