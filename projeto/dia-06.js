const products = [
  { id: 101, name: "Notebook", price: 3500, available: true },
  { id: 102, name: "Mouse", price: 120, available: false },
  { id: 103, name: "Teclado", price: 250, available: true },
  { id: 104, name: "Monitor", price: 900, available: true }
];

const productFound = products.find((product) => product.id === 999);
if (productFound) {
    console.log(`Produto encontrado: ${productFound.name}`);
} else {
    console.log("Produto não encontrado");
}