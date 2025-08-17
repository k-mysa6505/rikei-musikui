import { ref, push, query, orderByChild, limitToLast, onValue, off } from 'firebase/database';
import { db } from '../config/firebase';

// ランキングデータの型定義
export interface RankingEntry {
  id?: string;
  username: string;
  rank: string;
  time: number;
  timestamp: number;
}

/**
 * ランキングエントリをデータベースに保存
 */
export async function saveRankingEntry(
  username: string,
  rank: string,
  time: number
): Promise<boolean> {
  try {
    const rankingRef = ref(db, 'rankings');
    
    await push(rankingRef, {
      username: username.trim(),
      rank: rank,
      time: Number(time.toFixed(3)),
      timestamp: Date.now()
    });
    
    console.log("ランキングエントリが正常に保存されました！");
    return true;
  } catch (error: any) {
    console.error("ランキングの保存中にエラーが発生しました:", error);
    return false;
  }
}/**
 * ランキングデータをリアルタイムで取得し、コールバックに渡す
 */
export function subscribeToRankings(
  callback: (rankings: RankingEntry[]) => void,
  limit: number = 20
): () => void {
  // スコアが高い順で取得するため、limitToLastを使用して後でリバース
  const topRankingsRef = query(
    ref(db, 'rankings'),
    orderByChild('score'),
    limitToLast(limit)
  );

  onValue(topRankingsRef, (snapshot) => {
    const rankings: RankingEntry[] = [];

    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        rankings.push({
          id: childSnapshot.key || undefined,
          username: data.username,
          rank: data.rank,
          time: data.time,
          timestamp: data.timestamp
        });
      });

      // 時間昇順でソート（スコアは削除）
      rankings.sort((a, b) => {
        return a.time - b.time; // 時間昇順（速いほうが上位）
      });
    }

    callback(rankings);
  }, (error) => {
    console.error("ランキングデータの取得中にエラーが発生しました:", error);
    callback([]);
  });

  // アンサブスクライブ関数を返す
  return () => {
    off(topRankingsRef);
  };
}
