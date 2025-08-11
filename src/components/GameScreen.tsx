import React, { useEffect } from "react";

type GameScreenProps ={
  onComplete: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    //  仮
    const timer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="game-screen">
      <h1>プレイ中</h1>
    </div>
  );
};

export default GameScreen;
