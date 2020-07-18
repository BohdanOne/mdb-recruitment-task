import BaseComponent from './BaseComponent';
import state from '../state/state';
import TableRow from './TableRow';

export default class CategoryTable extends BaseComponent {
  constructor(templateId, parentId, newElementId, category) {
    super(templateId, parentId, newElementId);
    this.category = category;
    this.element.querySelector('h3').innerText = this.category;
    this.body = this.element.querySelector('tbody');
    this.body.id = `${category}Products`;
    this.total = this.element.querySelector('.totalInCategory');
    this.renderTotals();
    this.renderRows();
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
}
