import BaseComponent from './BaseComponent';
import CategoryTable from './CategoryTable';
import state from '../state/state';

export default class ListContainer extends BaseComponent {
  constructor(templateId, parentId, newElementId) {
    super(templateId, parentId, newElementId);
    this.heading = this.element.querySelector('h2');
    this.renderLists = this.renderLists.bind(this);
  }

  renderLists() {
    this.element.innerHTML = '';
    this.element.appendChild(this.heading);
    const categories = state.Categories.readStore();
    categories.forEach((category) => {
      return new CategoryTable(
        'categoryTable',
        this.element.id,
        `categoryTable--${category}`,
        category
      );
    });
  }
}
