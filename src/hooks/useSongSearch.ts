import { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";
import { Song } from "../types/entity";
import { SearchResult } from "../types/app";
import { searchSongs } from "../utils/database";
import { handleSearchError } from "../utils/errorHandling";

interface UseSongSearchProps {
  titleQuery: string;
  artistQuery: string;
  limit: number;
  initialized: boolean;
}

interface UseSongSearchResult extends SearchResult {
  loading: boolean;
  empty: boolean;
  error: string | null;
}

export function useSongSearch({
  titleQuery,
  artistQuery,
  limit,
  initialized,
}: UseSongSearchProps): UseSongSearchResult {
  const [results, setResults] = useState<Song[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const SEARCH_DEBOUNCE_MS = 20;
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
        setResults(results);
        setTotal(total);
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
    results,
    total,
    loading,
    empty,
    error,
  };
}
