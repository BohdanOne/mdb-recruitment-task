import BaseComponent from './BaseComponent';
import state from '../state/state';

export default class CategoryInput extends BaseComponent {
  constructor() {
    super('categoryInput', 'categoryInput');
    this.categoryNameInputElement = this.element.querySelector('#categoryName');
    this.addCategory = this.addCategory.bind(this);
    this.element.addEventListener('submit', this.addCategory);
  }

  addCategory(event) {
    event.preventDefault();
    const newCategory = this.categoryNameInputElement.value;
    if (newCategory.length > 0) state.Categories.writeToStore(newCategory);
    this.categoryNameInputElement.value = '';
  }
}
