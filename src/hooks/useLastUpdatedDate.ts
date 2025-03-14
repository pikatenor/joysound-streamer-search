import { useState, useEffect } from "react";
import { getLastUpdatedDate } from "../utils/database";

/**
 * データベースの最終更新日を取得するカスタムフック
 * @param initialized データベースが初期化されているかどうか
 * @returns 最終更新日
 */
export function useLastUpdatedDate(initialized: boolean) {
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    if (!initialized) return;

    const fetchLastUpdated = async () => {
      try {
        const date = await getLastUpdatedDate();
        setLastUpdated(date);
      } catch (error) {
        console.error("Failed to fetch last updated date:", error);
      }
    };

    fetchLastUpdated();
  }, [initialized]);

  return { lastUpdated };
}
