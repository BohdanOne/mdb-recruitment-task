import BaseComponent from './BaseComponent';
import state from '../state/state';

export default class CategoryForm extends BaseComponent {
  constructor(templateId, parentId, newElementId) {
    super(templateId, parentId, newElementId);
    this.form = this.element.querySelector('form');
    this.addCategory = this.addCategory.bind(this);
    this.element.addEventListener('submit', this.addCategory);
  }

  addCategory(event) {
    event.preventDefault();
    if (this.form.categoryName.value.length === 0) return;
    const newCategory = {
      id: state.Categories.readStore().length + 1,
      name: this.form.categoryName.value,
    };
    state.Categories.writeToStore(newCategory);
    this.form.reset();
  }
}
