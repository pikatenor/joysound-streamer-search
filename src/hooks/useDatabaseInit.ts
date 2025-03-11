import { useState, useEffect } from "react";
import { initDatabase } from "../utils/database";
import { handleDatabaseInitError } from "../utils/errorHandling";

/**
 * データベースの初期化を管理するカスタムフック
 * @returns 初期化状態とエラー情報
 */
export function useDatabaseInit() {
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        await initDatabase();
        setInitialized(true);
      } catch (err) {
        const errorMessage = handleDatabaseInitError(err);
        setError(errorMessage);
      }
    };

    init();
  }, []);

  return { initialized, error };
}
