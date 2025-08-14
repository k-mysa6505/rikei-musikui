import React from "react";

type HowToPlayScreenProps = {
  onOK: () => void;
  onBack: () => void;
}

const HowToPlayScreen: React.FC<HowToPlayScreenProps> = ({ onOK, onBack }) => {
  const handleButtonClick = (callback: () => void) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      const button = e.currentTarget;

      button.style.transform = 'translateY(-1px) scale(0.98)';
      button.style.transition = 'all 0.1s ease';

      setTimeout(() => {
        button.style.transform = '';
        button.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      }, 100);

      setTimeout(callback, 150);
    };
  };

  return (
    <div className="how-to-play-container">
      <div className="how-to-play-screen">
        <h1>あそびかた</h1>
        <ol>
          <li>1．式の□に入る数字を答えてね</li>
          <li>2．答えは整数の範囲だよ</li>
          <li>3．全7問あるよ</li>
          <li>4．Sランク目指してがんばってね</li>
          <li>※負数は「-」先に押してね</li>
        </ol>
        <button
          className="btn ok-button"
          onClick={handleButtonClick(onOK)}
        >
          OK
        </button>
        <button
          className="btn back-button"
          onClick={handleButtonClick(onBack)}
        >
          もどる
        </button>
      </div>
    </div>
  );
}

export default HowToPlayScreen;
