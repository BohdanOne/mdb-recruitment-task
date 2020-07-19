export default class Store {
  constructor(storeName) {
    this.storeName = storeName;
    this.store = [];
    this.listeners = [];
    this.items = this.items.bind(this);
    this.addItem = this.addItem.bind(this);
    this.addListener = this.addListener.bind(this);
    this.updateListeners = this.updateListeners.bind(this);
    this.initialize();
  }

  initialize() {
    const inStorage = this.items();
    if (inStorage) {
      this.store = [...inStorage];
    }
    localStorage.setItem(this.storeName, JSON.stringify(this.store));
  }

  addListener(listener) {
    this.listeners.push(listener);
  }

  updateListeners() {
    this.listeners.forEach((listener) => {
      listener([...this.store]);
    });
  }

  items() {
    return JSON.parse(localStorage.getItem(this.storeName));
  }

  addItem(item) {
    const items = this.items();
    items.push(item);
    localStorage.setItem(this.storeName, JSON.stringify(items));
    this.updateListeners();
  }

  removeItem(item) {
    const items = this.items();
    const filteredItems = items.filter((itemInStore) => itemInStore.id !== item.id);
    localStorage.setItem(this.storeName, JSON.stringify(filteredItems));
    this.updateListeners();
  }

  updateItem(item, field, newValue) {
    const items = this.items();
    const itemIndex = items.findIndex((itemInStore) => itemInStore.id === item.id);
    items[itemIndex][field] = newValue;
    localStorage.setItem(this.storeName, JSON.stringify(items));
    this.updateListeners();
  }
}
