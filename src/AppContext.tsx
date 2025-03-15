import { createContext, useContext, useState, ReactNode } from "react";
import { AppState } from "./types/app";
import { useDatabaseInit } from "./hooks/useDatabaseInit";
import { useSongSearch } from "./hooks/useSongSearch";

const DEFAULT_LIMIT = 50;

interface AppContextType extends AppState {
  setTitleQuery: (query: string) => void;
  setArtistQuery: (query: string) => void;
  setLimit: (limit: number) => void;
}

const defaultContext: AppContextType = {
  titleQuery: "",
  artistQuery: "",
  songs: [],
  totalCount: 0,
  limit: DEFAULT_LIMIT,
  loading: false,
  error: null,
  initialized: false,
  setTitleQuery: () => { },
  setArtistQuery: () => { },
  setLimit: () => { },
};

const AppContext = createContext<AppContextType>(defaultContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [titleQuery, setTitleQuery] = useState("");
  const [artistQuery, setArtistQuery] = useState("");
  const [limit, setLimit] = useState(DEFAULT_LIMIT);

  const { initialized, error: initError } = useDatabaseInit();

  const {
    results: songs,
    total: totalCount,
    loading,
    error: searchError,
  } = useSongSearch({
    titleQuery,
    artistQuery,
    limit,
    initialized,
  });

  // エラー状態の統合
  const error = initError || searchError;

  const value: AppContextType = {
    titleQuery,
    artistQuery,
    songs,
    totalCount,
    limit,
    loading,
    error,
    initialized,
    setTitleQuery,
    setArtistQuery,
    setLimit,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
