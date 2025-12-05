import { useEffect, useState } from "react";
import { socket } from "../socket";
import type { ChallengeDto } from "../api/challenge-api";

export function useRealtimeChallenges() {
  const [realtimeChallenges, setrealtimeChallenges] = useState<ChallengeDto[]>([]);

  useEffect(() => {
    socket.on("newChallenge", (data) => {
      console.log("New challenge received:", data);
      setrealtimeChallenges((prev) => [...prev, data]);
    });

    return () => {
      socket.off("newChallenge");
    };
  }, []);

  

  return { realtimeChallenges, setrealtimeChallenges };
}
