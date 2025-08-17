# Firebase Realtime Database セットアップ手順

## 1. Firebase プロジェクト作成

1. [Firebase Console](https://console.firebase.google.com/) にアクセス
2. 「プロジェクトを作成」をクリック
3. プロジェクト名: `rikei-musikui`
4. Google Analytics は任意で設定

## 2. Realtime Database の作成

1. 左メニューから「Realtime Database」を選択
2. 「データベースを作成」をクリック
3. **重要**: 「テストモードで開始」を選択
4. ロケーション: `us-central1` (デフォルト)

## 3. セキュリティルールの設定

Firebase Console の「Realtime Database」→「ルール」で以下を設定：

```json
{
  "rules": {
    "rankings": {
      ".read": true,
      ".write": true,
      "$rankingId": {
        ".validate": "newData.hasChildren(['username', 'rank', 'time', 'score', 'timestamp']) && newData.child('username').isString() && newData.child('rank').isString() && newData.child('time').isNumber() && newData.child('score').isNumber() && newData.child('timestamp').isNumber()"
      }
    }
  }
}
```

## 4. 設定情報の取得

1. プロジェクト設定（歯車アイコン）→「プロジェクトの設定」
2. 「マイアプリ」セクションで「ウェブアプリを追加」
3. アプリ名を入力（例: rikei-musikui-web）
4. 設定情報をコピー

## 5. 環境変数の設定

`src/config/firebase.ts` で以下の値を実際の値に置き換えてください：

```typescript
const firebaseConfig = {
  apiKey: "AIza...", // 実際の値
  authDomain: "rikei-musikui.firebaseapp.com", // 実際の値
  databaseURL: "https://rikei-musikui-default-rtdb.firebaseio.com/", // 重要: Realtime Database URL
  projectId: "rikei-musikui", // 実際の値
  storageBucket: "rikei-musikui.appspot.com", // 実際の値
  messagingSenderId: "123456789", // 実際の値
  appId: "1:123456789:web:abc123" // 実際の値
};
```

## 6. 使用方法

### ランキング保存
```typescript
import { handleGameComplete } from '../utils/rankingUtils';

const success = await handleGameComplete('プレイヤー名', 'A', 45.67, 850);
```

### ランキング表示
```typescript
import RankingModal from '../components/RankingModal';

<RankingModal 
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  newEntry={lastGameResult}
/>
```

## 7. データ構造

Realtime Database に保存されるデータ構造：

```
rankings/
  ├── -randomKey1/
  │   ├── username: "太郎"
  │   ├── rank: "A"
  │   ├── time: 45.67
  │   ├── score: 850
  │   └── timestamp: 1642789200000
  ├── -randomKey2/
  │   ├── username: "花子"
  │   ├── rank: "S"
  │   ├── time: 38.24
  │   ├── score: 950
  │   └── timestamp: 1642789300000
  └── ...
```

## 8. トラブルシューティング

### よくある問題
- **「Permission denied」エラー**: セキュリティルールを確認
- **「Database URL not specified」**: databaseURL を設定に追加
- **接続できない**: Firebase プロジェクト ID とアプリ設定を確認

### デバッグ方法
1. ブラウザの開発者ツールでコンソールを確認
2. Firebase Console でリアルタイムにデータを確認
3. ネットワークタブで API 呼び出しを確認
