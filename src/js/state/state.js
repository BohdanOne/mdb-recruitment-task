import Store from './Store';

const state = {
  Categories: new Store('categories'),
  Products: new Store('products'),
  productsInCategory: (category) => filterProductsByCategory(category),
  calculateTotals: () => calculateTotalAmount(state.Products.readStore()),
  calculateTotalInCategory: (category) => {
    const products = filterProductsByCategory(category);
    return calculateTotalAmount(products);
  },
  areProductsInCategory: (category) => filterProductsByCategory(category).length > 0,
};

const filterProductsByCategory = (category) =>
  state.Products.readStore().filter((product) => product.category === category);

const calculateTotalAmount = (products) => {
  let totalPcs = 0;
  let totalKgs = 0;
  products.forEach((product) => {
    return product.quantityUnit === 'pcs'
      ? (totalPcs += Number(product.quantity))
      : (totalKgs += Number(product.quantity));
  });
  return { totalPcs, totalKgs };
};

export default state;
