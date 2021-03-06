import Store from './Store';

const state = {
  Categories: new Store('categories'),
  Products: new Store('products'),
  productsInCategory: (category) => filterProductsByCategory(category),
  calculateTotals: () => calculateTotalAmount(state.Products.items()),
  calculateTotalInCategory: (category) => {
    const products = filterProductsByCategory(category);
    return calculateTotalAmount(products);
  },
  areProductsInCategory: (categoryId) => filterProductsByCategory(categoryId).length > 0,
};

const filterProductsByCategory = (category) =>
  state.Products.items().filter((product) => product.category === category.name);

const calculateTotalAmount = (products) => {
  let totalPcs = 0;
  let totalKg = 0;
  products.forEach((product) => {
    return product.quantityUnit === 'pcs'
      ? (totalPcs += Number(product.quantity))
      : (totalKg += Number(product.quantity));
  });
  return { totalPcs, totalKg };
};

export default state;
