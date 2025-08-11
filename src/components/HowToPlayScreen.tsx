import React from "react";

type HowToPlayScreenProps = {
  onOK: () => void;
  onBack: () => void;
}

const HowToPlayScreen: React.FC<HowToPlayScreenProps> = ({ onOK, onBack }) => {
  return (
    <div className="how-to-play-screen">
      <h1>あそびかた</h1>
      <ol>
        <li>数式の□に入る数字を答えてね</li>
        <li>答えは整数の範囲だよ</li>
        <li>全7問あるよ</li>
        <li>Sランク目指してがんばってね</li>
        <li>負数は「-」先に押してね</li>
      </ol>
      <button onClick={onOK}>OK</button>
      <button onClick={onBack}>もどる</button>
    </div>
  );
}

export default HowToPlayScreen;
