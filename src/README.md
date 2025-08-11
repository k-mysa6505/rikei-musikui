# src ディレクトリ構造説明

このディレクトリは理系虫食い算ゲームのReactアプリのソースコードを管理しています。

## 主な構成
```
src/
├─ App.test.tsx
├─ App.tsx
├─ index.tsx
├─ README.md
├─ reportWebVitals.ts
├─ setupTests.ts
├─ assets/
│  ├─ images/
│  ├─ sounds/
│  └─ styles/
│     ├─ App.css                // アプリ全体のCSS
│     ├─ GameScreen.css         // ゲーム画面用CSS
│     ├─ index.css              // ルートCSS
│     ├─ logo.svg               // ロゴ画像
│     ├─ react-app-env.d.ts     // 型定義
│     └─ TitleScreen.css        // タイトル画面用CSS
├─ components/
│  ├─ AnswerForm.tsx            // 回答フォーム
│  ├─ AnswerResultScreen.tsx    // 正解/不正解表示画面
│  ├─ Countdown.tsx             // カウントダウン用コンポーネント
│  ├─ CountdownScreen.tsx       // カウントダウン画面
│  ├─ GameScreen.tsx            // プレイ画面
│  ├─ HowToPlayScreen.tsx       // あそびかた説明画面
│  ├─ Question.tsx              // 問題表示用コンポーネント
│  ├─ ResultScreen.tsx          // 結果画面
│  └─ TitleScreen.tsx           // タイトル画面
├─ hooks/
│  └─ useGameLogic.ts           // ゲーム進行・状態管理
├─ types/
│  └─ index.ts                  // 型定義ファイル
└─ utils/
   ├─ helpers.ts                // 汎用関数
   └─ questions.ts              // 問題データ・生成ロジック
```
