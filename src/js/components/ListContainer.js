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
    this.insertExportBtn = this.insertExportBtn.bind(this);
    this.renderLists();
    this.insertExportBtn();
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

  insertExportBtn() {
    return new Button('button', this.newElementId, 'exportToPdfBtn', 'export to pdf', generatePdf);
  }
}
