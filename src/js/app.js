import MainHeader from './components/MainHeader';
import CategoryForm from './components/CategoryForm';
import ProductForm from './components/ProductForm';
import state from './state/state';
import ListContainer from './components/ListContainer';

const Header = new MainHeader('mainHeader', 'app', 'header');
state.Products.addListener(Header.renderTotals);

const CategoryInput = new CategoryForm('categoryInput', 'app', 'categoryForm');

const ProductInput = new ProductForm('productInput', 'app', 'productForm');
state.Categories.addListener(ProductInput.renderSelectOptions);

const MainShoppingList = new ListContainer('listContainer', 'app', 'shoppingList');
MainShoppingList.renderLists();
state.Categories.addListener(MainShoppingList.renderLists);
state.Products.addListener(MainShoppingList.renderLists);
