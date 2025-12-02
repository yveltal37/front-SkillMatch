import React from "react";
import type { UserDto } from "../../api/user-api";
import "./userItem.css"
interface UserItemProps {
  user: UserDto;
  onClick?: (user: UserDto) => void;
}

const UserItem: React.FC<UserItemProps> = ({ user, onClick }) => {

  return (
    <div className="user-item" onClick={() => onClick?.(user)}>
      <h3 className="user-item-username">{user.username}</h3>
    </div>
  );
};

export default UserItem;
