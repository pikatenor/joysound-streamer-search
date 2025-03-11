// 検索結果の表示件数オプション
export const LIMIT_OPTIONS = [
  { value: 10, label: "10(軽)" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
  { value: 500, label: "500(重)" },
  { value: 50000, label: "限界" },
];

// デフォルトの検索結果表示件数
export const DEFAULT_LIMIT = 50;

// 検索入力のデバウンス時間（ミリ秒）
export const SEARCH_DEBOUNCE_MS = 20;
