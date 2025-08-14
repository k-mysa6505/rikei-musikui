import React from "react";

type TitleScreenProps = {
  onPlay: () => void;
}

const TitleScreen: React.FC<TitleScreenProps> = React.memo(({ onPlay }) => {
  // ボタンクリック時の視覚的フィードバック
  const handleButtonClick = (callback: () => void) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      // DOM要素への参照を保存
      const button = e.currentTarget;

      // ボタンプレス効果を追加
      button.style.transform = 'translateY(-1px) scale(0.98)';
      button.style.transition = 'all 0.1s ease';

      setTimeout(() => {
        button.style.transform = '';
        button.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      }, 100);

      // 少し遅延してからコールバック実行
      setTimeout(callback, 150);
    };
  };

  return (
    <div className="title-screen-container">
      <div className="title-screen">
        <h1>
          <ruby>理<rt>り</rt></ruby>
          <ruby>系<rt>けい</rt></ruby>
          <ruby>虫<rt>むし</rt></ruby>
          <ruby>食<rt>く</rt></ruby>
          い
          <ruby>算<rt>ざん</rt></ruby>
        </h1>
        <img src="./images/musi.png" alt="musi-san" />
        <button
          className="play-button"
          onClick={handleButtonClick(onPlay)}
        >
          あそぶ
        </button>
      </div>
    </div>
  );
});

export default TitleScreen;
