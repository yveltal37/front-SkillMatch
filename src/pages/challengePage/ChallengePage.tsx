import { useState, useEffect, useContext } from "react";
import {
  getUserChallenges,
  deleteChallenge,
  toggleChallenge,
} from "../../api/challenge-api";
import type { ChallengeDto } from "../../api/challenge-api";
import { CircularProgress, Grid } from "@mui/material";
import { toast } from "react-toastify";
import ChallengeCard from "../../components/challengeCard/ChallengeCard";
import { UserContext } from "../../context/UserContext";
import "./challengePage.css";

function ChallengePage() {
  const [challenges, setChallenges] = useState<ChallengeDto[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true);
        const response = await getUserChallenges();
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

  const removeChallengeFromUI = (id: number) => {
    setChallenges((prev) => prev.filter((ch) => ch.id !== id));
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (challenges.length === 0) {
    return (
      <h1 style={{ textAlign: "center", marginTop: "2rem" }}>
        Right now you have no challenges
      </h1>
    );
  }

  const handleAdminClick = async (id: number) => {
    if (!window.confirm(`Are you sure you want to delete this challenge?`)) return;
    try {
      await deleteChallenge(id);
      removeChallengeFromUI(id);
    } catch (err) {
      console.error("Failed to delete expired challenge:", err);
    }
  };

  const handleUserClick = async (id: number) => {
    setChallenges((prev) =>
      prev.map((ch) =>
        ch.id === id ? { ...ch, isComplete: !ch.isComplete } : ch
      )
    );

    try {
      console.log(id);
      await toggleChallenge(id);
      toast.info("status changed")
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "An unknown error occurred.";

      console.error(err);
      toast.error(message);
      setChallenges((prev) =>
        prev.map((ch) =>
          ch.id === id ? { ...ch, isComplete: !ch.isComplete } : ch
        )
      );
    }
  };

  return (
    <div className="challenge-page-wrapper">
      <h1 className="title">Challenge list</h1>

      <div className="challenge-scroll-area">
        <Grid container justifyContent="center" spacing={2}>
          {challenges.map((challenge) => (
            <Grid key={challenge.id}>
              <ChallengeCard
                challenge={challenge}
                onExpired={removeChallengeFromUI}
                onClick={user?.isAdmin ? handleAdminClick : handleUserClick}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default ChallengePage;
