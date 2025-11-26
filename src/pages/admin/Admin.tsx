import { useState } from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { createCategoty } from "../../api/category-api";


function Admin() {
  const [isOpen, setIsOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const handleisOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setCategoryName("");
  };

  const handleCreate = async () => {
    if (!categoryName.trim()) return alert("Category name cannot be empty");

    try {
      await createCategoty(categoryName);
      alert(`Category "${categoryName}" created!`);
      handleClose();
    } catch (err) {
      console.error(err);
      alert("Failed to create category");
    }
  };

  return (
    <>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Admin Dashboard
      </Typography>

      <Button variant="contained" onClick={handleisOpen}>
        Create Category
      </Button>

      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Create New Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            fullWidth
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Admin;
