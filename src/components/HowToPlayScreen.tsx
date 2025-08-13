import React from "react";

type HowToPlayScreenProps = {
  onOK: () => void;
  onBack: () => void;
}

const HowToPlayScreen: React.FC<HowToPlayScreenProps> = ({ onOK, onBack }) => {
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
        <button className="btn ok-button" onClick={onOK}>OK</button>
        <button className="btn back-button" onClick={onBack}>もどる</button>
      </div>
    </div>
  );
}

export default HowToPlayScreen;
