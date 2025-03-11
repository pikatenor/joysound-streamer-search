import { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";
import { searchSongs, Song } from "../utils/database";
import { handleSearchError } from "../utils/errorHandling";
import { SEARCH_DEBOUNCE_MS } from "../constants";

interface UseSongSearchProps {
  titleQuery: string;
  artistQuery: string;
  limit: number;
  initialized: boolean;
}

interface UseSongSearchResult {
  songs: Song[];
  totalCount: number;
  loading: boolean;
  empty: boolean;
  error: string | null;
}

/**
 * 曲検索機能を提供するカスタムフック
 */
export function useSongSearch({
  titleQuery,
  artistQuery,
  limit,
  initialized,
}: UseSongSearchProps): UseSongSearchResult {
  const [songs, setSongs] = useState<Song[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 検索入力をデバウンス
  const debouncedTitle = useDebounce(titleQuery, SEARCH_DEBOUNCE_MS);
  const debouncedArtist = useDebounce(artistQuery, SEARCH_DEBOUNCE_MS);

  useEffect(() => {
    if (!initialized) return;

    const search = async () => {
      setLoading(true);
      setError(null);

      try {
        const { results, total } = await searchSongs(
          debouncedTitle,
          debouncedArtist,
          limit
        );
        setSongs(results);
        setTotalCount(total);
        setEmpty(results.length === 0);
      } catch (err) {
        const errorMessage = handleSearchError(err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    search();
  }, [debouncedTitle, debouncedArtist, limit, initialized]);

  return {
    songs,
    totalCount,
    loading,
    empty,
    error,
  };
}
