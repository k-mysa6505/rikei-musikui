import React from "react";

type HowToPlayScreenProps = {
  onOK: () => void;
  onBack: () => void;
}

const HowToPlayScreen: React.FC<HowToPlayScreenProps> = ({ onOK, onBack }) => {
  return (
    <div className="how-to-play-screen">
      <h1>あそびかた</h1>
      <button onClick={onOK}>OK</button>
      <button onClick={onBack}>もどる</button>
    </div>
  );
}

export default HowToPlayScreen;
