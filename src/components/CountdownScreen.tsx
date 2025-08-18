import React, { useEffect, useState } from "react";
import "../assets/styles/countdown.css";

type CountdownScreenProps = {
  onCountdownEnd: () => void;
}

const CountdownScreen: React.FC<CountdownScreenProps> = ({ onCountdownEnd }) => {
  const [currentCount, setCurrentCount] = useState<string>("3");
  const [key, setKey] = useState<number>(0);

  useEffect(() => {
    const countSequence = ["3", "2", "1", "スタート！"];
    let currentIndex = 0;

    const timer = setInterval(() => {
      currentIndex++;
      if (currentIndex < countSequence.length) {
        setCurrentCount(countSequence[currentIndex]);
        setKey(prev => prev + 1);
      } else {
        clearInterval(timer);
        setTimeout(() => {
          onCountdownEnd();
        }, 500);
      }
    }, 750);

    return () => clearInterval(timer);
  }, [onCountdownEnd]);

  const getTextClass = () => {
    if (currentCount === "スタート！") {
      return "countdown-text start-text";
    }
    return "countdown-text";
  };

  return (
    <div className="countdown-container">
      <div className="countdown-screen">
        <div className="countdown-display">
          <span key={key} className={getTextClass()}>
            {currentCount}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CountdownScreen;
