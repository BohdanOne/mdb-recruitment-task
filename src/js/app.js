import MainHeader from './components/MainHeader';
import CategoryForm from './components/CategoryForm';
import ProductForm from './components/ProductForm';
import state from './state/state';

const Header = new MainHeader('mainHeader', 'app');
state.Products.addListener(Header.renderTotals);

const CategoryInput = new CategoryForm('categoryInput', 'app');

const ProductInput = new ProductForm('productInput', 'app');
state.Categories.addListener(ProductInput.renderSelectOptions);
