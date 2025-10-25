class LocalStorageAdapter {
  static getItem = (key) => {
    const item = localStorage.getItem(key);

    return item ? JSON.parse(item) : null;
  };

  static setItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  static removeItem = (key) => {
    localStorage.removeItem(key);
  };

  static clear = () => {
    localStorage.clear();
  };
}

export default LocalStorageAdapter;
