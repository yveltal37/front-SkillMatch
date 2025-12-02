import { useState, useEffect } from "react";
/*import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";*/
import { createCategoty } from "../../api/category-api";
import type { UserStatisticsDto } from "../../api/user-api";
import UserList from "../../components/userList/UserList";
import UserStats from "../../components/userStats/UserStats";
import "./admin.css";
function Admin() {
  const [selectedUser, setSelectedUser] = useState<UserStatisticsDto[] | null>(
    null
  );

  useEffect(() => {
    console.log(selectedUser);
  }, [selectedUser]);

  /*const [isOpen, setIsOpen] = useState(false);
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
  };*/

  return (
    <div className="admin-wrapper">
      <div className="users-panel">
        <UserList setSelectedUser={setSelectedUser} />
      </div>

      <div className="stats-panel">
        {selectedUser ? <UserStats selectedUser={selectedUser} /> : null}
      </div>
    </div>
  );
}

export default Admin;
