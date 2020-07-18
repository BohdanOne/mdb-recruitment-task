import Store from './Store';

const state = {
  Categories: new Store('categories'),
  Products: new Store('products'),
  calculateTotals: () => {
    const products = state.Products.readStore();
    let totalPcs = 0;
    let totalKgs = 0;
    products.forEach((product) => {
      return product.quantityUnit === 'pcs'
        ? (totalPcs += Number(product.quantity))
        : (totalKgs += Number(product.quantity));
    });
    return { totalPcs, totalKgs };
  },
};

export default state;
