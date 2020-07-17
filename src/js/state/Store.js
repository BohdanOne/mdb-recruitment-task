export default class Store {
  constructor(storeName) {
    this.storeName = storeName;
    this.items = [];
    this.listeners = [];
    this.readStore = this.readStore.bind(this);
    this.writeToStore = this.writeToStore.bind(this);
    this.addListener = this.addListener.bind(this);
    this.updateListeners = this.updateListeners.bind(this);
    this.initialize();
  }

  initialize() {
    const inStorage = this.readStore();
    if (inStorage) {
      this.items = [...inStorage];
    }
    localStorage.setItem(this.storeName, JSON.stringify(this.items));
  }

  addListener(listener) {
    this.listeners.push(listener);
  }

  updateListeners() {
    this.listeners.forEach((listener) => {
      listener([...this.items]);
    });
  }

  readStore() {
    return JSON.parse(localStorage.getItem(this.storeName));
  }

  writeToStore(item) {
    const items = this.readStore();
    items.push(item);
    localStorage.setItem(this.storeName, JSON.stringify(items));
    this.updateListeners();
  }
}