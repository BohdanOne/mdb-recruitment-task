import CategoryForm from './components/CategoryForm';
import ProductForm from './components/ProductForm';
import state from './state/state';

const CategoryInput = new CategoryForm('categoryInput', 'app');

const ProductInput = new ProductForm('productInput', 'app');
state.Categories.addListener(ProductInput.renderSelectOptions);
