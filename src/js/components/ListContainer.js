import BaseComponent from './BaseComponent';
import CategoryTable from './CategoryTable';
import Button from './Button';
import state from '../state/state';
import generatePdf from '../utils/generatePdf';

export default class ListContainer extends BaseComponent {
  constructor(templateId, parentId, newElementId) {
    super(templateId, parentId, newElementId);
    this.newElementId = newElementId;
    this.heading = this.element.querySelector('h2');
    this.renderLists = this.renderLists.bind(this);
    this.renderLists();
  }

  renderLists() {
    this.element.innerHTML = '';
    this.element.appendChild(this.heading);
    const categories = state.Categories.items();
    categories.forEach((category) => {
      return new CategoryTable(
        'categoryTable',
        this.element.id,
        `categoryTable--${category.id}`,
        category
      );
    });
    this.insertExportBtn();
  }

  insertExportBtn() {
    return new Button(
      'button',
      this.newElementId,
      'exportToPdfBtn',
      'export list to pdf',
      generatePdf,
      false
    );
  }
}
