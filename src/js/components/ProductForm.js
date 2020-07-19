import BaseComponent from './BaseComponent';
import state from '../state/state';

export default class ProductForm extends BaseComponent {
  constructor(templateId, parentId, newElementId) {
    super(templateId, parentId, newElementId);
    this.form = this.element.querySelector('form');
    this.categorySelect = this.element.querySelector('select');
    this.quantityInput = this.element.querySelector('#productQuantity');
    this.quantityUnitKg = this.element.querySelector('#quantityUnitKg');
    this.quantityUnitPcs = this.element.querySelector('#quantityUnitPcs');
    this.addProduct = this.addProduct.bind(this);
    this.renderSelectOptions = this.renderSelectOptions.bind(this);
    this.selectQuantityUnit = this.selectQuantityUnit.bind(this);
    this.setQuantityStep = this.setQuantityStep.bind(this);
    this.element.addEventListener('submit', this.addProduct);
    this.renderSelectOptions();
    this.selectQuantityUnit();
  }

  renderSelectOptions() {
    this.categorySelect.innerHTML = '';
    const categories = state.Categories.items();
    categories.forEach((category) => {
      const option = document.createElement('option');
      option.value = category.name;
      option.textContent = category.name;
      this.categorySelect.appendChild(option);
    });
  }

  selectQuantityUnit() {
    this.quantityUnitKg.addEventListener('change', () => {
      return this.quantityUnitKg.value.on
        ? this.setQuantityStep(false)
        : this.setQuantityStep(true);
    });
    this.quantityUnitPcs.addEventListener('change', () => {
      return this.quantityUnitKg.value.on
        ? this.setQuantityStep(true)
        : this.setQuantityStep(false);
    });
  }

  setQuantityStep(isFraction) {
    this.quantityInput.step = isFraction ? '.1' : '1';
  }

  addProduct(event) {
    event.preventDefault();
    const newProduct = {
      id: state.Products.items().length + 1,
      name: this.form.productName.value,
      quantityUnit: this.form.productQuantityUnit.value,
      quantity: this.form.productQuantity.value,
      category: this.form.productCategory.value,
    };
    state.Products.addItem(newProduct);
    this.form.reset();
  }
}
