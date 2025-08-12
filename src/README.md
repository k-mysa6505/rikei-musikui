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
│  ├─ images/                   // 画像ファイル
│  ├─ sounds/                   // 音声ファイル
│  └─ styles/                   // CSSファイル（モジュール構造）
│     ├─ index.css              // メインスタイルシート（全モジュールをインポート）
│     ├─ base/                  // 基盤スタイル
│     │  ├─ variables.css       // CSS変数（色、スペーシング、フォントなど）
│     │  ├─ destyle.css         // ブラウザデフォルトスタイルのリセット
│     │  └─ typography.css      // フォントとテキストスタイル
│     ├─ components/            // コンポーネント別スタイル
│     │  ├─ buttons.css         // ボタンスタイル
│     │  ├─ modals.css          // モーダルダイアログスタイル
│     │  ├─ forms.css           // フォーム・キーパッドスタイル
│     │  └─ math.css            // 数式表示・MathJax関連スタイル
│     ├─ pages/                 // ページ別スタイル
│     │  ├─ title-screen.css    // タイトル画面スタイル
│     │  ├─ game-screen.css     // ゲーム画面スタイル
│     │  ├─ result-screen.css   // 結果画面スタイル
│     │  ├─ howto-screen.css    // 遊び方画面スタイル
│     │  └─ countdown-screen.css// カウントダウン画面スタイル
│     └─ utils/                 // ユーティリティスタイル
│        ├─ animations.css      // アニメーション効果
│        ├─ responsive.css      // レスポンシブデザイン
│        └─ mixins.css          // 再利用可能なCSSクラス
├─ components/
│  ├─ AnswerForm.tsx            // 回答フォーム
│  ├─ AnswerResultScreen.tsx    // 正解/不正解表示画面
│  ├─ Countdown.tsx             // カウントダウン用コンポーネント
│  ├─ CountdownScreen.tsx       // カウントダウン画面
│  ├─ GameScreen.tsx            // プレイ画面
│  ├─ HowToPlayScreen.tsx       // あそびかた説明画面
│  ├─ ResultScreen.tsx          // 結果画面
│  └─ TitleScreen.tsx           // タイトル画面
├─ hooks/
│  └─ useGameLogic.ts           // ゲーム進行・状態管理
├─ types/
│  └─ index.ts                  // 型定義ファイル
└─ utils/
   ├─ helpers.ts                // 汎用関数
   └─ questions/                // 問題データ・生成ロジック
      ├─ generateQuestion.ts    // 問題生成メイン関数
      ├─ determinantQuestion.ts // 行列式問題
      ├─ differentialEquationQuestion.ts // 微分方程式問題
      ├─ differentialQuestion.ts// 微分問題
      ├─ eigenvalueQuestion.ts  // 固有値問題
      ├─ integralQuestion.ts    // 積分問題
      ├─ limitQuestion.ts       // 極限問題
      └─ multipleIntegralQuestion.ts // 重積分問題
```

## CSSアーキテクチャの特徴

### 📁 **Base (基盤)**
- **variables.css**: CSS変数システムでテーマ管理・デザイントークン
- **destyle.css**: ブラウザ間の差異を統一
- **typography.css**: フォント・テキストの基本設定

### 📁 **Components (コンポーネント)**
- **buttons.css**: ボタンの各種バリエーション（プライマリ・セカンダリ・サイズ等）
- **modals.css**: モーダルダイアログとオーバーレイ
- **forms.css**: 入力フォーム・キーパッド・バリデーション
- **math.css**: MathJax・数式表示・問題レイアウト

### 📁 **Pages (ページ)**
- 各画面専用のスタイル（タイトル・ゲーム・結果・説明・カウントダウン）
- レスポンシブ対応・アニメーション効果付き

### 📁 **Utils (ユーティリティ)**
- **animations.css**: フェード・スケール・バウンス・スピン等のアニメーション
- **responsive.css**: ブレイクポイント・モバイルファースト設計
- **mixins.css**: Flexbox・Grid・ポジショニング等の再利用クラス

## 設計原則
✅ **モジュラー設計** - 機能別ファイル分割で保守性向上  
✅ **CSS変数活用** - テーマ・デザイントークンの一元管理  
✅ **モバイルファースト** - レスポンシブ対応  
✅ **アクセシビリティ** - 高コントラスト・モーション軽減対応  
✅ **BEM記法** - 命名規則の統一
```
