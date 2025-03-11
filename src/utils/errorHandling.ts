import { ErrorInfo } from "../types/app";
import { toaster } from "../components/ui/toaster";

/**
 * エラーをコンソールに出力し、トースト通知を表示する
 * @param error エラーオブジェクト
 * @param errorInfo エラー情報
 * @returns エラーメッセージ
 */
export function handleError(error: unknown, errorInfo: ErrorInfo): string {
  console.error(errorInfo.title, error);

  // トースト通知を表示
  toaster.error({
    title: errorInfo.title,
    description: errorInfo.description,
  });

  return errorInfo.description;
}

/**
 * データベース初期化エラーを処理する
 * @param error エラーオブジェクト
 * @returns エラーメッセージ
 */
export function handleDatabaseInitError(error: unknown): string {
  return handleError(error, {
    title: "Failed to initialize database",
    description: "Please check the console for details.",
  });
}

/**
 * 検索エラーを処理する
 * @param error エラーオブジェクト
 * @returns エラーメッセージ
 */
export function handleSearchError(error: unknown): string {
  return handleError(error, {
    title: "An error occurred while searching",
    description: "Please try again.",
  });
}
