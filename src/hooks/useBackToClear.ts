import { useEffect, useRef, useCallback } from "react";

interface UseBackToClearOptions {
  titleQuery: string;
  artistQuery: string;
  onClear: () => void;
}

/**
 * Hook to handle mobile back button behavior.
 * When queries are non-empty and user presses back, clears the queries instead of navigating.
 * When queries are already empty, allows normal back navigation.
 */
export const useBackToClear = ({
  titleQuery,
  artistQuery,
  onClear,
}: UseBackToClearOptions) => {
  const hasQuery = titleQuery !== "" || artistQuery !== "";
  const historyPushedRef = useRef(false);

  // Push history state when queries become non-empty
  useEffect(() => {
    if (hasQuery && !historyPushedRef.current) {
      // Push a new history entry so back button can be intercepted
      window.history.pushState({ searchActive: true }, "");
      historyPushedRef.current = true;
    } else if (!hasQuery && historyPushedRef.current) {
      // Queries were cleared programmatically, reset the flag
      historyPushedRef.current = false;
    }
  }, [hasQuery]);

  // Handle popstate (back button)
  const handlePopState = useCallback(
    (event: PopStateEvent) => {
      if (hasQuery) {
        // Prevent default navigation and clear queries instead
        event.preventDefault();
        onClear();
        historyPushedRef.current = false;
      }
      // If no query, let the browser handle normal navigation
    },
    [hasQuery, onClear]
  );

  useEffect(() => {
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [handlePopState]);
};
