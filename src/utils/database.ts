import sqlite3InitModule, {
  Database,
  Sqlite3Static,
} from "@sqlite.org/sqlite-wasm";
import dbSrc from "../assets/db.sqlite";

export interface Song {
  id: number;
  song_no: number;
  title: string;
  artist: string;
}

let sqlite3Instance: Sqlite3Static;
let dbInstance: Database;

export async function initDatabase() {
  if (dbInstance) return dbInstance;

  try {
    // Initialize SQLite
    sqlite3Instance = await sqlite3InitModule();

    // Fetch the database file
    const response = await fetch(dbSrc);
    const dbBuffer = await response.arrayBuffer();

    // Create a new database
    dbInstance = new sqlite3Instance.oo1.DB({
      filename: ":memory:",
      flags: "t",
    });

    // Use lower-level API to load the database
    const p = sqlite3Instance.wasm.allocFromTypedArray(
      new Uint8Array(dbBuffer)
    );
    try {
      const rc = sqlite3Instance.capi.sqlite3_deserialize(
        dbInstance,
        "main",
        p,
        dbBuffer.byteLength,
        dbBuffer.byteLength,
        sqlite3Instance.capi.SQLITE_DESERIALIZE_READONLY
      );
      dbInstance.checkRc(rc);
    } catch (error) {
      throw new Error(`Database deserialization failed with ${error}`);
    } finally {
      dbInstance.onclose = {
        after() {
          sqlite3Instance.wasm.dealloc(p);
        },
      };
    }

    console.log("Database initialized successfully");
    return dbInstance;
  } catch (error) {
    console.error("Failed to initialize database:", error);
    throw error;
  }
}

export async function searchSongs(
  title: string = "",
  artist: string = ""
): Promise<Song[]> {
  try {
    if (!dbInstance) {
      await initDatabase();
    }

    if (!dbInstance) {
      throw new Error("Database not initialized");
    }

    let query = `SELECT
      id
      ,song_no
      ,title
      ,artist
    FROM songs WHERE 1=1`;
    const params: string[] = [];

    if (title) {
      query += " AND title LIKE ?";
      params.push(`%${title}%`);
    }

    if (artist) {
      query += " AND artist LIKE ?";
      params.push(`%${artist}%`);
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

    query += " LIMIT 100";

    const results: Song[] = [];

    // Use the exec method with row callback
    dbInstance.exec({
      sql: query,
      bind: params,
      rowMode: "array",
      callback: (row: any[]) => {
        if (row) {
          results.push({
            id: Number(row[0]),
            song_no: Number(row[1]),
            title: String(row[2] || ""),
            artist: String(row[3] || ""),
          });
        }
      },
    });

    return results;
  } catch (error) {
    throw error;
  }
}
