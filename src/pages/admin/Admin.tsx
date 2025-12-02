import { useState } from "react";
import type { UserStatisticsDto } from "../../api/user-api";
import UserList from "../../components/userList/UserList";
import UserStats from "../../components/userStats/UserStats";
import "./admin.css";
import AdminButtons from "../../components/adminButtons/AdminButtons";

function Admin() {
  const [selectedUser, setSelectedUser] = useState<UserStatisticsDto[] | null>(
    null
  );

  return (
    <div className="admin-wrapper">
      <div className="users-panel">
        <AdminButtons />
        <UserList setSelectedUser={setSelectedUser} />
      </div>

      <div className="stats-panel">
        {selectedUser ? <UserStats selectedUser={selectedUser} /> : null}
      </div>
    </div>
  );
}

export default Admin;
