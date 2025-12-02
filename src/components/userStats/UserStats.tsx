import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { UserStatisticsDto } from "../../api/user-api";
import "./userStats.css";
function UserStats({
  selectedUser,
}: {
  selectedUser: UserStatisticsDto[] | null;
}) {
  if (!selectedUser) return null;
  const totalCompletedChallenges = selectedUser.reduce(
    (accumulator, currentStat) => {
      return accumulator + currentStat.completedChallenges;
    },
    0
  );
  return (
    <div className="user-stats">
      <h3>user completed {totalCompletedChallenges} challenges</h3>
      <ResponsiveContainer>
        <BarChart data={selectedUser}>
          <CartesianGrid strokeDasharray="3" />
          <XAxis dataKey="categoryName" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar
            dataKey="completedChallenges"
            fill="#8884d8"
            radius={[5, 5, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
export default UserStats;
