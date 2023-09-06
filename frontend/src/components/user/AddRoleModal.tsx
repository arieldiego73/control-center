import React from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import RoleTable from "../role/RoleTable";

interface AddRoleModalProps {
  onClose: () => void; // Define the type of onClose prop
}

function AddRoleModal({ onClose }: AddRoleModalProps) {
  return (
    <Dialog open={true} onClose={onClose}>
      <div>
        <RoleTable />
        <Button
          variant="contained"
          color="primary"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </Dialog>
  );
}

export default AddRoleModal;
