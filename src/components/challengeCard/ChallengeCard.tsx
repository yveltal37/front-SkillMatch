import { useEffect } from "react";
import type { ChallengeDto } from "../../api/challenge-api";
import { deleteChallenge } from "../../api/challenge-api";
import ExpirationTimer from "../expirationTimer/ExpirationTimer";
import "./challengeCard.css";

function ChallengeCard({
  challenge,
  onExpired,
  onClick,
}: {
  challenge: ChallengeDto;
  onExpired: (id: number) => void;
  onClick: (id: number) => void;
}) {
  const handleExpire = async () => {
    try {
      await deleteChallenge(challenge.id);
      onExpired(challenge.id);
    } catch (err) {
      console.error("Failed to delete expired challenge:", err);
    }
  };

  useEffect(() => {
    const now = new Date();
    const exp = new Date(challenge.expirationDate);
    const msLeft = exp.getTime() - now.getTime();

    if (msLeft <= 0) {
      handleExpire();
      return;
    }

    const timer = setTimeout(() => {
      handleExpire();
    }, msLeft);

    return () => clearTimeout(timer);
  }, [challenge.expirationDate]);

  return (
    <div
      className={
        challenge.isComplete ? "challenge-card complete" : "challenge-card"
      }
      onClick={() => onClick(challenge.id)}
    >
      <div className={challenge.isComplete ?"challenge-categories complete-categories":"challenge-categories"}>
        {challenge.categories.map((category, key) => (
          <span
            key={key}
            className={
              challenge.isComplete
                ? "category-tag complete-tag"
                : "category-tag "
            }
          >
            {category}
          </span>
        ))}
      </div>

      <h3 className="challenge-name">{challenge.name}</h3>

      <div className="challenge-description">{challenge.description}</div>

      <div className="challenge-timer">
        <ExpirationTimer expirationDate={challenge.expirationDate} />
      </div>
    </div>
  );
}

export default ChallengeCard;
