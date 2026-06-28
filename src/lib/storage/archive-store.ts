import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import type { ScreenshotRecord } from "@/lib/types";

const STORE_NAME = "records";
const DB_VERSION = 1;

type ArchiveDB = DBSchema & {
  records: {
    key: string;
    value: ScreenshotRecord;
    indexes: {
      "by-updated": string;
    };
  };
};

export class ArchiveStore {
  private dbPromise: Promise<IDBPDatabase<ArchiveDB>>;

  constructor(private readonly dbName = "screenshot-archaeologist") {
    this.dbPromise = openDB<ArchiveDB>(dbName, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
          store.createIndex("by-updated", "updatedAt");
        }
      },
    });
  }

  async save(record: ScreenshotRecord) {
    const db = await this.dbPromise;
    await db.put(STORE_NAME, record);
  }

  async list() {
    const db = await this.dbPromise;
    const records = await db.getAll(STORE_NAME);
    return records.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }

  async clear() {
    const db = await this.dbPromise;
    await db.clear(STORE_NAME);
  }
}
