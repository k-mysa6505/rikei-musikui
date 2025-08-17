// Firebase設定ファイル
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Firebase設定
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "rikei-musikui.firebaseapp.com",
  databaseURL: "https://rikei-musikui-default-rtdb.firebaseio.com",
  projectId: "rikei-musikui",
  storageBucket: "rikei-musikui.firebasestorage.app",
  messagingSenderId: "1080138865054",
  appId: "1:1080138865054:web:f7011351756c0c110d1e8f"
};

// Firebaseアプリを初期化
const app = initializeApp(firebaseConfig);

// Realtime Databaseのインスタンスを取得
export const db = getDatabase(app);

export default app;
