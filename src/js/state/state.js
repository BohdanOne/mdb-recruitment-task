import Store from './Store';

const state = {
  Categories: new Store('categories'),
  Products: new Store('products'),
};

export default state;
