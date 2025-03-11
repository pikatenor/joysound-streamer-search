import { Song } from "./entity";

export interface AppState {
  // 検索クエリ
  titleQuery: string;
  artistQuery: string;

  // 検索結果
  songs: Song[];
  totalCount: number;

  // 表示制御
  limit: number;

  // 状態フラグ
  loading: boolean;
  empty: boolean;
  error: string | null;
  initialized: boolean;
}

export interface SearchResult {
  results: Song[];
  total: number;
}

export interface ErrorInfo {
  title: string;
  description: string;
}
