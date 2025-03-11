import { Song } from "./utils/database";

// アプリケーションの状態を表す型
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

// 検索結果の型
export interface SearchResult {
  results: Song[];
  total: number;
}

// エラーハンドリングの型
export interface ErrorInfo {
  title: string;
  description: string;
}
