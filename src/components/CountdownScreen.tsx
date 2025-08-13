import React, { useEffect } from "react";

type CountdownScreenProps = {
  onCountdownEnd: () => void;
}

const CountdownScreen: React.FC<CountdownScreenProps> = ({ onCountdownEnd }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onCountdownEnd();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onCountdownEnd]);

  return (
    <div className="countdown-container">
      <div className="countdown-screen">
        <h1>3...2...1...スタート！</h1>
      </div>
    </div>
  );
}

export default CountdownScreen;
