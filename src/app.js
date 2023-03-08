import ProductManager from "../ProductManager.js";
import express from "express";

const port = 8080;
const app = express();

const productManager = new ProductManager("../products.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  const question = req.query;
  const { limit } = req.query;
  const products = await productManager.getProducts();
  if (!limit) {
    res.json({ products });
  } else {
    let newLimit = parseInt(req.query.limit);
    const filterProducts = products.filter((p) => p.id <= newLimit);
    res.json({ filterProducts });
  }
});

app.get("/products/:pid", async (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = await productManager.getProductById(productId);
  if (product.length == 0) {
    res.send("Product not existent");
  } else {
    res.json(product);
  }
});

app.listen(port, () => console.log(`Listen port ${port}`));
