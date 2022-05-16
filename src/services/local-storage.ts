const PREFIX = "_elekid_";

class StorageService {
  async ready(): Promise<boolean> {
    return true;
  }

  getSync<T>(key: string): T | undefined {
    const item = localStorage.getItem(PREFIX + key);
    return item ? JSON.parse(item) : undefined;
  }

  async get<T>(key: string): Promise<T | undefined> {
    const item = await localStorage.getItem(PREFIX + key);
    return item ? JSON.parse(item) : undefined;
  }

  updateSync<T>(key: string, value: Partial<T>): T {
    const currentValue = this.getSync<T>(key);
    const newValue: T = { ...(currentValue || {}), ...value } as T;
    return this.setSync<T>(key, newValue);
  }

  async update<T>(key: string, value: Partial<T>): Promise<T> {
    const currentValue = await this.get<T>(key);
    const newValue: T = { ...(currentValue || {}), ...value } as T;
    return this.set<T>(key, newValue);
  }

  setSync<T>(key: string, value: T): T {
    if (value === undefined) {
      localStorage.removeItem(PREFIX + key);
    } else {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    }
    return value;
  }

  async set<T>(key: string, value: T): Promise<T> {
    if (value === undefined) {
      localStorage.removeItem(PREFIX + key);
    } else {
      await localStorage.setItem(PREFIX + key, JSON.stringify(value));
    }

    return value;
  }

  removeSync<T>(key: string): T | undefined {
    const value = this.getSync<T>(key);
    localStorage.removeItem(PREFIX + key);
    return value;
  }

  async remove<T>(key: string): Promise<T | undefined> {
    const value = this.get<T>(key);
    await localStorage.removeItem(PREFIX + key);
    return value;
  }

  async clear(
    prefixes: string[] = [],
    ignorePrefixes: string[] = []
  ): Promise<void> {
    const keys = (await this.keys()) || [];
    keys.forEach(async (key) => {
      const toDelete: boolean =
        prefixes.length === 0 ||
        prefixes.some((prefix) => key.startsWith(prefix));
      const toMaintain: boolean = ignorePrefixes.some((prefix) =>
        key.startsWith(prefix)
      );
      if (toDelete && !toMaintain) {
        await this.remove(key);
      }
    });
  }

  async length(): Promise<number> {
    return (await this.keys()).length;
  }

  async keys(): Promise<string[]> {
    const result = new Array(localStorage.length)
      .fill(null)
      .map((_, i) => localStorage.key(i) || "")
      .filter((key) => !!key);

    return result
      .filter((key: string) => key.startsWith(PREFIX))
      .map((key: string) => key.replace(PREFIX, ""));
  }
}
const LocalStorage = new StorageService();
export default LocalStorage;
