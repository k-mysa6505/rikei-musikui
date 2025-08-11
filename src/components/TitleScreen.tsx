import React from "react";

type TitleScreenProps = {
  onStart: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const TitleScreen: React.FC<TitleScreenProps> = ({ onStart }) => {
  return (
    <div className="title-screen">
      <h1>Welcome to Rikei Musikui</h1>
      <p>Click the button below to start the game!</p>
      <button onClick={onStart}>Start Game</button>
    </div>
  );
};

export default TitleScreen;
