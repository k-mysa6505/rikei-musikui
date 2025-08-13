import React from "react";

type TitleScreenProps = {
  onPlay: () => void;
}

const TitleScreen: React.FC<TitleScreenProps> = React.memo(({ onPlay }) => {
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
        <button className="play-button" onClick={onPlay}>あそぶ</button>
      </div>
    </div>
  );
});

export default TitleScreen;
