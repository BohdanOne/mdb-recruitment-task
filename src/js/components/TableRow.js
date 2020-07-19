import BaseComponent from './BaseComponent';
import state from '../state/state';
import Button from './Button';

export default class TableRow extends BaseComponent {
  constructor(templateId, parentId, newElementId, product) {
    super(templateId, parentId, newElementId);
    this.product = product;
    this.nameCell = this.element.querySelector('.row__productName');
    this.nameCell.id = `nameCell--${this.product.name}`;
    this.pcsCell = this.element.querySelector('.row__pcs');
    this.kgsCell = this.element.querySelector('.row__kgs');
    this.removeBtn = this.element.querySelector('.row__remove');
    this.increaseBtn = this.element.querySelector('.row__increaseQuantity');
    this.decreaseBtn = this.element.querySelector('.row__decreaseQuantity');
    this.fillCells = this.fillCells.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.updateName = this.updateName.bind(this);
    this.insertSaveBtn = this.insertSaveBtn.bind(this);
    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.fillCells();
    this.activateListeners();
  }

  fillCells() {
    const quantity = Number(this.product.quantity);
    this.nameCell.innerText = this.product.name;
    if (this.product.quantityUnit === 'pcs') {
      this.pcsCell.innerText = quantity;
    } else if (this.product.quantityUnit === 'kg') {
      this.kgsCell.innerText = quantity.toFixed(1);
    }
  }

  removeRow() {
    state.Products.removeItem(this.product);
  }

  insertSaveBtn() {
    return new Button(
      'button',
      this.nameCell.id,
      `saveBtn--${this.product.name}`,
      'save',
      this.updateName,
      true
    );
  }

  updateName() {
    state.Products.updateItem(this.product, 'name', this.nameCell.innerText);
  }

  increaseQuantity() {
    const amount = this.product.quantityUnit === 'pcs' ? 1 : 0.1;
    state.Products.updateItem(this.product, 'quantity', Number(this.product.quantity) + amount);
  }

  decreaseQuantity() {
    const amount = this.product.quantityUnit === 'pcs' ? 1 : 0.1;
    if (this.product.quantity === 0) return;
    state.Products.updateItem(this.product, 'quantity', Number(this.product.quantity) - amount);
  }

  handleDragStart(event) {
    event.dataTransfer.setData('text/plain', this.product.id);
    event.dataTransfer.effectAllowed = 'move';
  }

  activateListeners() {
    this.removeBtn.addEventListener('click', this.removeRow);
    this.nameCell.addEventListener('click', this.insertSaveBtn, { once: true });
    this.increaseBtn.addEventListener('click', this.increaseQuantity);
    this.decreaseBtn.addEventListener('click', this.decreaseQuantity);
    this.element.addEventListener('dragstart', this.handleDragStart);
  }
}
