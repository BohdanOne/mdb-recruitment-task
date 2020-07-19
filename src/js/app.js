import MainHeader from './components/MainHeader';
import CategoryForm from './components/CategoryForm';
import ProductForm from './components/ProductForm';
import ListContainer from './components/ListContainer';
import state from './state/state';

const UI = {
  Header: new MainHeader('mainHeader', 'app', 'header'),
  CategoryInput: new CategoryForm('categoryInput', 'app', 'categoryForm'),
  ProductInput: new ProductForm('productInput', 'app', 'productForm'),
  MainShoppingList: new ListContainer('listContainer', 'app', 'shoppingList'),
};

state.Products.addListener(UI.Header.renderTotals);
state.Categories.addListener(UI.ProductInput.renderSelectOptions);
state.Categories.addListener(UI.MainShoppingList.renderLists);
state.Products.addListener(UI.MainShoppingList.renderLists);
