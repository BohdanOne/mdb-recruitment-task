import * as JSPDF from 'jspdf';
import state from '../state/state';

export default () => {
  const pdf = new JSPDF();
  const categories = state.Categories.readStore();
  let list = 'SHOPPING LIST \n\n';
  categories.forEach((category) => {
    list += `### ${category.name.toUpperCase()} ###\n`;
    const products = state.productsInCategory(category);
    products.forEach((product) => {
      list += `* ${product.name} ${Number(product.quantity).toFixed(1)}${product.quantityUnit}\n`;
    });
    list += '\n';
  });
  pdf.text(list, 20, 20);
  pdf.save('shopping-list.pdf');
};
