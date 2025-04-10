import sqlite3InitModule, {
  Database,
  Sqlite3Static,
} from "@sqlite.org/sqlite-wasm";
import { KANA_COMMON_CAHRS as KANA_COMMON_CHARS } from "jaco/const/KANA_COMMON_CAHRS";
import { HIRAGANA_CHARS } from "jaco/const/HIRAGANA_CHARS";
import { KATAKANA_CHARS } from "jaco/const/KATAKANA_CHARS";
import { isOnly, toKatakana } from "jaco";
import { LastUpdate, Song } from "../types/entity";
import { SearchResult } from "../types/app";
import dbSrc from "../assets/db.sqlite";

let sqlite3Instance: Sqlite3Static;
let dbInstance: Database;

export async function initDatabase() {
  try {
    sqlite3Instance = await sqlite3InitModule();

    // Fetch the database file
    const response = await fetch(dbSrc);
    const dbBuffer = await response.arrayBuffer();

    const db = new sqlite3Instance.oo1.DB({
      filename: ":memory:",
      flags: "t",
    });

    // Use lower-level API to load the database
    const p = sqlite3Instance.wasm.allocFromTypedArray(
      new Uint8Array(dbBuffer)
    );
    try {
      const rc = sqlite3Instance.capi.sqlite3_deserialize(
        db,
        "main",
        p,
        dbBuffer.byteLength,
        dbBuffer.byteLength,
        sqlite3Instance.capi.SQLITE_DESERIALIZE_READONLY
      );
      db.checkRc(rc);
    } catch (error) {
      throw new Error(`Database deserialization failed with ${error}`);
    } finally {
      db.onclose = {
        after() {
          sqlite3Instance.wasm.dealloc(p);
        },
      };
    }

    // Check if the database is loaded correctly
    db.exec("SELECT 1");

    console.log("Database initialized successfully");

    dbInstance = db;
    return db;
  } catch (error) {
    console.error("Failed to initialize database:", error);
    throw error;
  }
}

function sanitizeWildcard(query: string): string {
  // % => \%
  // _ => \_
  // \ => \\
  return query.replace(/[_%\\]/g, "\\$&");
}

export async function searchSongs(
  title: string = "",
  artist: string = "",
  limit: number = 100
): Promise<SearchResult> {
  const start = performance.now();
  try {
    if (!dbInstance) {
      throw new Error("Database not initialized");
    }

    if (title === "" && artist === "") {
      return { results: [], total: 0 };
    }

    let query = `SELECT
      id
      ,song_no
      ,group_id
      ,title
      ,artist_id
      ,artist
      ,info
    FROM songs`;
    const params: string[] = [];

    query += " WHERE 1=1";
    if (title) {
      query += " AND (title LIKE ? ESCAPE '\\'";
      params.push(`%${sanitizeWildcard(title)}%`);
      if (isOnly(title, HIRAGANA_CHARS + KATAKANA_CHARS + KANA_COMMON_CHARS)) {
        const kanaTitle = toKatakana(title);
        query += " OR title_ruby like ?";
        params.push(`${kanaTitle}%`);
      }
      query += ")";
    }
    if (artist) {
      query += " AND (artist LIKE ? ESCAPE '\\'";
      params.push(`%${sanitizeWildcard(artist)}%`);
      if (isOnly(artist, HIRAGANA_CHARS + KATAKANA_CHARS + KANA_COMMON_CHARS)) {
        const kanaArtist = toKatakana(artist);
        query += " OR artist_ruby like ?";
        params.push(`${kanaArtist}%`);
      }
      query += ")";
    }

    query += " ORDER BY";
    if (title) {
      query += " title = ? DESC, ";
      params.push(`${title}`);
      query += " title like ? DESC, ";
      params.push(`${title}%`);
    }
    if (artist) {
      query += " artist = ? DESC, ";
      params.push(`${artist}`);
      query += " artist like ? DESC, ";
      params.push(`${artist}%`);
    }
    query += " id";

    const results: Song[] = [];
    let count = 0;

    dbInstance.exec({
      sql: query,
      bind: params,
      rowMode: "stmt",
      callback: (row) => {
        if (results.length < limit) {
          results.push({
            id: row.getInt(0) || 0,
            song_no: row.getInt(1) || 0,
            group_id: row.getInt(2) || 0,
            title: row.getString(3) || "",
            artist_id: row.getInt(4) || 0,
            artist: row.getString(5) || "",
            aux_info: row.getString(6),
          });
        }
        count++;
      },
    });

    return { results: results, total: count };
  } catch (error) {
    throw error;
  } finally {
    console.log(`Search took ${performance.now() - start}ms`);
  }
}

export async function getLastUpdatedDate(): Promise<LastUpdate | null> {
  try {
    if (!dbInstance) {
      throw new Error("Database not initialized");
    }

    const rows = dbInstance.exec({
      sql: "SELECT updated_at FROM meta LIMIT 1",
      returnValue: "resultRows",
    });

    const result = rows[0][0]?.toString();
    if (!result) {
      throw new Error("No result");
    }

    return new Date(result);
  } catch (error) {
    console.error("Failed to get last updated date:", error);
    return null;
  }
}
