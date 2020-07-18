import BaseComponent from './BaseComponent';
import state from '../state/state';

export default class CategoryForm extends BaseComponent {
  constructor(templateId, parentId) {
    super(templateId, parentId);
    this.form = this.element.querySelector('form');
    this.addCategory = this.addCategory.bind(this);
    this.element.addEventListener('submit', this.addCategory);
  }

  addCategory(event) {
    event.preventDefault();
    const newCategory = this.form.categoryName.value;
    if (newCategory.length > 0) state.Categories.writeToStore(newCategory);
    this.form.reset();
  }
}
