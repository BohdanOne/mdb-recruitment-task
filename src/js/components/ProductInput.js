import BaseComponent from './BaseComponent';
import state from '../state/state';

export default class ProductInput extends BaseComponent {
  constructor() {
    super('productInput');
    this.formElement = this.element.querySelector('#productInputForm');
    this.productCategorySelectElement = this.element.querySelector('#productCategory');
    this.productQuantityInputElement = this.element.querySelector('#productQuantity');
    this.productQuantityKg = this.element.querySelector('#kg');
    this.productQuantityPcs = this.element.querySelector('#pcs');
    this.addProduct = this.addProduct.bind(this);
    this.element.addEventListener('submit', this.addProduct);
    this.renderSelectOptions = this.renderSelectOptions.bind(this);
    this.selectQuantityType = this.selectQuantityType.bind(this);
    this.setQuantityStep = this.setQuantityStep.bind(this);
    this.renderSelectOptions();
    this.selectQuantityType();
  }

  renderSelectOptions() {
    this.productCategorySelectElement.innerHTML = '';
    const categories = state.Categories.readStore();
    categories.forEach((category) => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      this.productCategorySelectElement.appendChild(option);
    });
  }

  selectQuantityType() {
    this.productQuantityKg.addEventListener('change', () => {
      if (this.productQuantityKg.value.on) {
        this.setQuantityStep(false);
      } else {
        this.setQuantityStep(true);
      }
    });
    this.productQuantityPcs.addEventListener('change', () => {
      if (this.productQuantityKg.value.on) {
        this.setQuantityStep(true);
      } else {
        this.setQuantityStep(false);
      }
    });
  }

  setQuantityStep(isFraction) {
    this.productQuantityInputElement.step = isFraction ? '.1' : '1';
  }

  addProduct(event) {
    event.preventDefault();
    const newProduct = {
      name: this.formElement.productName.value,
      quantityType: this.formElement.productQuantityType.value,
      quantity: this.formElement.productQuantity.value,
      category: this.formElement.productCategory.value,
    };
    state.Products.writeToStore(newProduct);
    this.formElement.reset();
  }
}
