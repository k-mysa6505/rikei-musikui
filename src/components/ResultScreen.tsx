import React from "react";

type ResultScreenProps = {
  onReplay: () => void;
  onTitle: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ onReplay, onTitle }) => {
  return (
    <div className="result-screen">
      <h1>RESULTS</h1>
      <button onClick={onReplay}>もう一度</button>
      <button onClick={onTitle}>タイトルへ戻る</button>
    </div>
  );
};

export default ResultScreen;
