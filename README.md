# 理系ムジークイ (Rikei Musikui)

数学問題を解くゲームアプリです。

## 機能

- 数学問題のクイズゲーム
- タイマー機能
- スコア・ランクシステム
- バグレポート機能（ReSend API使用）

## バグレポート機能の設定

このアプリはReSend APIを使用してバグレポートをメール送信します。

### 1. ReSend APIキーの取得

1. [ReSend](https://resend.com/)でアカウントを作成
2. APIキーを生成
3. 送信元ドメインを設定・認証

### 2. 環境変数の設定

`.env.example`をコピーして`.env`ファイルを作成し、以下の値を設定してください：

```env
REACT_APP_RESEND_API_KEY=your_resend_api_key_here
REACT_APP_BUG_REPORT_EMAIL=support@yourdomain.com
REACT_APP_FROM_EMAIL=rikei-musikui@yourdomain.com
```

**重要**: `.env`ファイルはGitで管理されません。本番環境では適切な方法で環境変数を設定してください。

### 3. セキュリティ注意事項

- **本番環境では**、APIキーを適切にセキュアに管理してください
- フロントエンドアプリでのAPIキー使用は開発・テスト目的のみ推奨
- 本格運用では、バックエンドAPIを経由してメール送信を行うことを推奨

## 開発用スクリプト

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
