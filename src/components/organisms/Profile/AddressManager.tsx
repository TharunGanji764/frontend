import { Box, Typography, Button, Stack, Divider } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteAddress } from "@/store/slices/userSlice";

import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import VerifiedIcon from "@mui/icons-material/Verified";
import formFields from "../../mockData/AddressFormFields.json";
import {
  ProfileSectionCard,
  ProfileSectionHeader,
  AddressCard,
  AddressIconBox,
} from "./styles";
import CustomModal from "@/components/atoms/CustomModal";
import { useState } from "react";
import {
  useAddAddressMutation,
  useDeleteAddressMutation,
  useUpdateAddressMutation,
} from "@/store/api/apiSlice";

type AddressProps = {
  address: any[];
};

const AddressManager = ({ address }: AddressProps) => {
  const dispatch = useDispatch();
  const [openAddModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [formData, setFormData] = useState<{
    full_name: string;
    phone_number: string;
    address_line: string;
    landmark: string;
    city: string;
    state: string;
    pincode: string;
    tag: string;
    is_default: boolean;
  }>({
    full_name: "",
    phone_number: "",
    address_line: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    tag: "",
    is_default: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [addAddress] = useAddAddressMutation();
  const [deleteAddress] = useDeleteAddressMutation();
  const [updateAddress] = useUpdateAddressMutation();
  const [Item, setItem] = useState(null);

  const handlevalidation = () => {
    let tempErrors: Record<string, string> = {};

    formFields?.forEach((field: any) => {
      const name = field?.name as keyof typeof formData;
      if (field?.required && !formData[name]) {
        tempErrors[name as string] = `${field?.label} is required`;
      }
    });

    setErrors(tempErrors);
    return Object.keys(tempErrors)?.length === 0;
  };

  const handleSave = async () => {
    if (handlevalidation()) {
      await addAddress(formData);
      setFormData({
        full_name: "",
        phone_number: "",
        address_line: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
        tag: "",
        is_default: false,
      });
      setOpenModal(false);
    } else {
      console.log(formData);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAddress({ addressId: Item });
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    if (handlevalidation()) {
      await updateAddress({ ...formData, id: Item });
      setFormData({
        full_name: "",
        phone_number: "",
        address_line: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
        tag: "",
        is_default: false,
      });
      setOpenEditModal(false);
    } else {
      console.log(formData);
    }
  };

  return (
    <ProfileSectionCard
      elevation={0}
      sx={{ p: 0, borderRadius: "16px", overflow: "hidden" }}
    >
      <ProfileSectionHeader
        sx={{ borderBottom: "1px solid", borderColor: "grey.50", p: 3 }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "text.primary",
              letterSpacing: "-0.02em",
            }}
          >
            Shipping Addresses
          </Typography>
          <Typography color="text.secondary">
            Manage your delivery locations
          </Typography>
        </Box>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          disableElevation
          sx={{
            textTransform: "none",
            fontWeight: 700,
            px: 3,
            py: 1,
            bgcolor: "text.primary",
            borderRadius: "50px",
            fontSize: "0.85rem",
          }}
          onClick={() => setOpenModal(true)}
        >
          Add New
        </Button>
      </ProfileSectionHeader>

      {address?.length === 0 && (
        <Typography sx={{ textAlign: "center", fontSize: "18px" }}>
          No Addressess Available
        </Typography>
      )}

      <Box sx={{ p: 2 }}>
        <Stack spacing={2.5}>
          {address?.map((item) => (
            <AddressCard $isDefault={item?.is_default} key={item?.id}>
              {item?.is_default && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bgcolor: "text.primary",
                    color: "white",
                    px: 1.5,
                    py: 0.5,
                    borderBottomLeftRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    zIndex: 1,
                  }}
                >
                  <VerifiedIcon sx={{ fontSize: "0.85rem", color: "#fff" }} />
                  <Typography
                    sx={{
                      fontSize: "0.65rem",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Default
                  </Typography>
                </Box>
              )}

              <Box sx={{ p: 2.5 }}>
                <Stack direction="row" spacing={2}>
                  <AddressIconBox
                    sx={{
                      bgcolor: item?.is_default ? "text.primary" : "grey.50",
                      color: item?.is_default ? "#fff" : "text.primary",
                      borderRadius: "10px",
                      width: 44,
                      height: 44,
                    }}
                  >
                    {item?.tag === "Work" ? (
                      <WorkOutlineIcon />
                    ) : (
                      <HomeOutlinedIcon />
                    )}
                  </AddressIconBox>
                  <Box>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Typography sx={{ fontWeight: 700, fontSize: "1rem" }}>
                        {item?.fullName}
                      </Typography>
                    </Stack>
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 0.5,
                        color: "text.secondary",
                        lineHeight: 1.6,
                      }}
                    >
                      {item?.address_line},{item?.landmark}
                      <br />
                      {item?.city}, {item?.state}, {item?.pincode}
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              <Stack
                direction="row"
                justifyContent="flex-end"
                spacing={1}
                sx={{
                  px: 2,
                  py: 1.5,
                  bgcolor: "transparent",
                }}
              >
                <Button
                  size="small"
                  startIcon={<EditOutlinedIcon sx={{ fontSize: "1.1rem" }} />}
                  sx={{
                    color: "text.primary",
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: "0.8rem",
                  }}
                  onClick={() => {
                    const { id, ...data } = item;
                    setFormData(data);
                    setItem(item?.id);
                    setOpenEditModal(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  onClick={() => {
                    setItem(item?.id);
                    setOpenDeleteModal(true);
                  }}
                  startIcon={<DeleteOutlineIcon sx={{ fontSize: "1.1rem" }} />}
                  sx={{
                    color: "grey.400",
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: "0.8rem",
                    "&:hover": { color: "error.main" },
                  }}
                >
                  Remove
                </Button>
              </Stack>
            </AddressCard>
          ))}
        </Stack>
      </Box>

      <CustomModal
        open={openAddModal || openEditModal}
        onClose={() =>
          openAddModal ? setOpenModal(false) : setOpenEditModal(false)
        }
        headingTitle={openAddModal ? "Add New Address" : "Edit Address"}
        width={800}
        isFormModal={true}
        formFields={formFields}
        setFormData={setFormData}
        formData={formData}
        onSave={openAddModal ? handleSave : handleUpdate}
        errors={errors}
        setErrors={setErrors}
      />
      <CustomModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        headingTitle={"Delete Address"}
        width={500}
        onSave={handleSave}
        description="Are you sure to delete this address"
        isDeleteModal={true}
        onDelete={handleDelete}
      />
    </ProfileSectionCard>
  );
};

export default AddressManager;
