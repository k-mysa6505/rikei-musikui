import React from "react";

type TitleScreenProps = {
  onPlay: () => void;
}

const TitleScreen: React.FC<TitleScreenProps> = ({ onPlay }) => {
  return (
    <div className="title-screen">
      <h1>理系虫食い算</h1>
      <button onClick={onPlay}>あそぶ</button>
    </div>
  );
};

export default TitleScreen;
