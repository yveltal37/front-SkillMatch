import { useState, useEffect } from "react";
import { getUserChallenges } from "../../api/challenge-api";
import type { ChallengeDto } from "../../api/challenge-api";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import "./challengePge.css";
import ExpirationTimer from "../../components/expirationTimer/ExpirationTimer";

function ChallengePage() {
  const [challenges, setChallenges] = useState<ChallengeDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true);
        const response = await getUserChallenges();
        console.log(response.data);

        setChallenges(response.data as ChallengeDto[]);
      } catch (err: any) {
        const message =
          err?.response?.data?.message || "An unknown error occurred.";

        console.error(err);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (challenges.length === 0) {
    return <h1>right now you have no challenges</h1>;
  }

  return (
    <div>
      <h1>Challenges list</h1>
      <List className="lol">
        {challenges.map((challenge) => (
          <ListItem
            key={challenge.id}
            sx={{
              bgcolor: "#333333",
              borderRadius: "8px",
              boxShadow: 3,
              borderLeft: "5px solid #00c853",
            }}
          >
            <p>{challenge.name}</p>
            <ExpirationTimer expirationDate={challenge.expirationDate}/>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default ChallengePage;
