import { createContext, useContext, useState, ReactNode } from "react";
import { useDatabaseInit } from "../hooks/useDatabaseInit";
import { useSongSearch } from "../hooks/useSongSearch";
import { AppState } from "../types";
import { DEFAULT_LIMIT } from "../constants";

// コンテキストの型定義
interface AppContextType extends AppState {
  setTitleQuery: (query: string) => void;
  setArtistQuery: (query: string) => void;
  setLimit: (limit: number) => void;
}

// デフォルト値
const defaultContext: AppContextType = {
  titleQuery: "",
  artistQuery: "",
  songs: [],
  totalCount: 0,
  limit: DEFAULT_LIMIT,
  loading: false,
  empty: true,
  error: null,
  initialized: false,
  setTitleQuery: () => { },
  setArtistQuery: () => { },
  setLimit: () => { },
};

// コンテキストの作成
const AppContext = createContext<AppContextType>(defaultContext);

// コンテキストを使用するためのカスタムフック
export const useAppContext = () => useContext(AppContext);

// プロバイダーコンポーネント
export const AppProvider = ({ children }: { children: ReactNode }) => {
  // 検索クエリの状態
  const [titleQuery, setTitleQuery] = useState("");
  const [artistQuery, setArtistQuery] = useState("");
  const [limit, setLimit] = useState(DEFAULT_LIMIT);

  // データベース初期化
  const { initialized, error: initError } = useDatabaseInit();

  // 検索機能
  const {
    songs,
    totalCount,
    loading,
    empty,
    error: searchError,
  } = useSongSearch({
    titleQuery,
    artistQuery,
    limit,
    initialized,
  });

  // エラー状態の統合
  const error = initError || searchError;

  // コンテキスト値
  const value: AppContextType = {
    titleQuery,
    artistQuery,
    songs,
    totalCount,
    limit,
    loading,
    empty,
    error,
    initialized,
    setTitleQuery,
    setArtistQuery,
    setLimit,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
