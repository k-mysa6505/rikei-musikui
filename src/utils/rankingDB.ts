import { ref, push, onValue, off, serverTimestamp, update } from 'firebase/database';
import { db } from '../config/firebase';

export interface RankingEntry {
  id?: string;
  username: string;
  rank: string;
  time: number;
  timestamp: number;
}

export async function saveRankingEntry(username: string, rank: string, time: number) {
  try {
    const result = await push(ref(db, 'rankings'), {
      username,
      rank,
      time: Number(time.toFixed(2)),
      // timestamp: Date.now()
      timestamp: serverTimestamp() // Firebaseサーバーのタイムスタンプを使用
    });
    return result.key;
  } catch (error) {
    console.error('ランキング保存エラー:', error);
    return null;
  }
}

export async function updateRankingEntryName(entryId: string, newName: string) {
  try {
    const entryRef = ref(db, `rankings/${entryId}`);
    await update(entryRef, {
      username: newName
    });
    return true;
  } catch (error) {
    console.error('ランキング名前更新エラー:', error);
    return false;
  }
}

export function subscribeToRankings(callback: (rankings: RankingEntry[]) => void) {
  const rankingsRef = ref(db, 'rankings');

  onValue(rankingsRef, (snapshot) => {
    const rankings: RankingEntry[] = [];

    if (snapshot.exists()) {
      snapshot.forEach((child) => {
        const data = child.val();
        rankings.push({
          id: child.key || undefined,
          ...data
        });
      });

      // ランク優先度を定義（数値が小さいほど上位）
      const getRankPriority = (rank: string): number => {
        const rankOrder: { [key: string]: number } = {
          'SS': 1,
          'S': 2,
          'A': 3,
          'B': 4,
          'C': 5,
          'D': 6
        };
        return rankOrder[rank] || 999;
      };

      // 第1にランク、同じランクでは時間が早い順でソート
      rankings.sort((a, b) => {
        const rankDiff = getRankPriority(a.rank) - getRankPriority(b.rank);
        if (rankDiff !== 0) {
          return rankDiff; // ランクが異なる場合はランク優先
        }
        return a.time - b.time; // 同じランクの場合は時間が早い順
      });
    }

    callback(rankings);
  });

  return () => off(rankingsRef);
}

// プレイヤー名のバリデーション関数
export function validatePlayerName(name: string): { valid: boolean; error?: string } {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: 'プレイヤー名を入力してください' };
  }
  
  if (name.trim().length > 20) {
    return { valid: false, error: 'プレイヤー名は20文字以内で入力してください' };
  }
  
  return { valid: true };
}
