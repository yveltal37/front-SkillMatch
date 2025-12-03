import { useState, useEffect } from "react";
import type { FC } from "react";

interface ExpirationTimerProps {
  expirationDate: string;
}

const ExpirationTimer: FC<ExpirationTimerProps> = ({ expirationDate }) => {
  const calculateTimeLeft = () => {
    const diff = new Date(expirationDate).getTime() - new Date().getTime();

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [expirationDate]);

  return (
    <div style={{ fontWeight: "bold", direction: "rtl" }}>
      {timeLeft.days} : {timeLeft.hours} : {timeLeft.minutes} :{" "}
      {timeLeft.seconds} 
    </div>
  );
};

export default ExpirationTimer;
