import BaseComponent from './BaseComponent';
import state from '../state/state';
import TableRow from './TableRow';

export default class CategoryTable extends BaseComponent {
  constructor(templateId, parentId, newElementId, category) {
    super(templateId, parentId, newElementId);
    this.category = category;
    this.element.querySelector('h3').innerText = this.category.name;
    this.body = this.element.querySelector('tbody');
    this.body.id = `${category.name}Products`;
    this.total = this.element.querySelector('.totalInCategory');
    this.removeBtn = this.element.querySelector('button');
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.removeCategory = this.removeCategory.bind(this);
    this.renderTotals();
    this.renderRows();
    this.activateListeners();
  }

  renderTotals() {
    const { totalPcs, totalKgs } = state.calculateTotalInCategory(this.category);
    this.total.innerText = `${totalPcs}pc${totalPcs !== 1 ? 's' : ''} and ${totalKgs.toFixed(1)}kg${
      totalKgs !== 1 ? 's' : ''
    }`;
  }

  renderRows() {
    this.body.innerHTML = '';
    const products = state.productsInCategory(this.category);
    products.forEach((product) => {
      return new TableRow('productRow', this.body.id, `productRow--${product.name}`, product);
    });
  }

  handleDragOver(event) {
    if (event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault();
    }
    this.element.classList.add('dropzone');
  }

  handleDragLeave() {
    this.element.classList.remove('dropzone');
  }

  handleDrop(event) {
    const productId = event.dataTransfer.getData('text/plain');
    state.Products.updateItem({ id: productId }, 'category', this.category.name);
  }

  removeCategory() {
    state.Categories.removeItem(this.category);
  }

  activateListeners() {
    this.element.addEventListener('dragover', this.handleDragOver);
    this.element.addEventListener('dragleave', this.handleDragLeave);
    this.element.addEventListener('drop', this.handleDrop);
    this.removeBtn.addEventListener('click', this.removeCategory);
  }
}
