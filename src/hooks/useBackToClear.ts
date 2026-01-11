import { useEffect, useRef } from "react";

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
  const hasQueryRef = useRef(hasQuery);
  const onClearRef = useRef(onClear);

  // Keep refs in sync with latest values
  hasQueryRef.current = hasQuery;
  onClearRef.current = onClear;

  // Push history state when queries become non-empty
  // Pop history state when queries are cleared programmatically
  useEffect(() => {
    if (hasQuery && !historyPushedRef.current) {
      // Push a new history entry so back button can be intercepted
      window.history.pushState({ searchActive: true }, "");
      historyPushedRef.current = true;
    } else if (!hasQuery && historyPushedRef.current) {
      // Queries were cleared programmatically, go back to remove the history entry
      historyPushedRef.current = false;
      window.history.back();
    }
  }, [hasQuery]);

  // Handle popstate (back button) - registered once on mount
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (hasQueryRef.current) {
        // Prevent default navigation and clear queries instead
        event.preventDefault();
        onClearRef.current();
        historyPushedRef.current = false;
      }
      // If no query, let the browser handle normal navigation
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
};
