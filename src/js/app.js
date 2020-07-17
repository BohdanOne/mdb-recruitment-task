import CategoryInput from './components/CategoryInput';
import ProductInput from './components/ProductInput';
import state from './state/state';

const app = document.querySelector('#app');

const CategoryNameInput = new CategoryInput('categoryInput', 'categoryNameInput');
CategoryNameInput.attachTo(app);

const ProductNameInput = new ProductInput('productInput', 'productNameInput');
state.Categories.addListener(ProductNameInput.renderSelectOptions);
ProductNameInput.attachTo(app);
