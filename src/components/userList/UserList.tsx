import { useEffect, useState } from "react";
import { getUserStatistics, getAllUsers } from "../../api/user-api";
import type { UserDto, UserStatisticsDto } from "../../api/user-api";
import UserItem from "../userItem/UserItem";
import { toast } from "react-toastify";
import "./userList.css"

function UserList({
  setSelectedUser,
}: {
  setSelectedUser: (user: UserStatisticsDto[] | null) => void;
}) {
  const [users, setUsers] = useState<UserDto[]>([]);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();      
      setUsers(res || []);
    } catch (error:any) {
      const message =
        error?.response?.data?.message || "An unknown error occurred.";

      console.error(error);
      toast.error(message);
    }
  };

  useEffect(() => {
      fetchUsers();
  }, []);

  const fetchStatistic = async (username: string) => {
    try {
      return await getUserStatistics(username);
    } catch (error:any) {
      const message =
        error?.response?.data?.message || "An unknown error occurred.";

      console.error(error);
      toast.error(message);    }
  };

  const handleUserClick = async (userselect: UserDto) => {
    const stats = await fetchStatistic(userselect.username);
    setSelectedUser(stats || null);
  };


  return (
    <div className="user-list">
      <div className="user-list-items">
        {users.length > 0 ? (
          users.map((user) => (
            <UserItem key={user.id} user={user} onClick={handleUserClick} />
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
}

export default UserList;
