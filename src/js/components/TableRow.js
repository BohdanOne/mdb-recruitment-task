import BaseComponent from './BaseComponent';
import state from '../state/state';

export default class TableRow extends BaseComponent {
  constructor(templateId, parentId, newElementId, product) {
    super(templateId, parentId, newElementId);
    this.product = product;
    this.nameCell = this.element.querySelector('.row__productName');
    this.pcsCell = this.element.querySelector('.row__pcs');
    this.kgsCell = this.element.querySelector('.row__kgs');
    this.removeBtn = this.element.querySelector('.row__remove');
    this.increaseBtn = this.element.querySelector('.row__increaseQuantity');
    this.decreaseBtn = this.element.querySelector('.row__decreaseQuantity');
    this.removeRow = this.removeRow.bind(this);
    this.updateName = this.updateName.bind(this);
    this.insertSaveBtn = this.insertSaveBtn.bind(this);
    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
    this.fillCells();
    this.activateListeners();
  }

  fillCells() {
    this.nameCell.innerText = this.product.name;
    if (this.product.quantityUnit === 'pcs') {
      this.pcsCell.innerText = this.product.quantity;
    } else {
      this.kgsCell.innerText = this.product.quantity.toFixed(1);
    }
  }

  removeRow() {
    state.Products.removeItem(this.product);
  }

  insertSaveBtn() {
    const saveBtn = document.createElement('button');
    saveBtn.classList.add('btn');
    saveBtn.classList.add('btn-outline-secondary');
    saveBtn.classList.add('btn-sm');
    saveBtn.classList.add('m-1');
    saveBtn.innerText = 'save';
    this.nameCell.appendChild(saveBtn);
    saveBtn.addEventListener('click', () => {
      this.nameCell.removeChild(saveBtn);
      this.updateName();
    });
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
    state.Products.updateItem(this.product, 'quantity', Number(this.product.quantity) - amount);
  }

  activateListeners() {
    this.removeBtn.addEventListener('click', this.removeRow);
    this.nameCell.addEventListener('click', this.insertSaveBtn, { once: true });
    this.increaseBtn.addEventListener('click', this.increaseQuantity);
    this.decreaseBtn.addEventListener('click', this.decreaseQuantity);
  }
}
