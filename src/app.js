import ProductManager from "../ProductManager.js";
import express from "express";
import productsRouter from "./routes/products.router.js";
import usersRouter from "./routes/users.router.js";
import { __dirname } from "./utils.js";

const path = "./products.json";
const port = 8080;
const app = express();

const productManager = new ProductManager(path);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static(__dirname + "/public"));

app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);

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

app.post("/products", async (req, res) => {
  const obj = req.body;
  const newProduct = await productManager.addProducts(obj);
  res.json({ message: "Product created", product: newProduct });
});

app.get("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await productManager.getProductById(+pid);
  if (product.length == 0) {
    res.json({ message: "Product not existent" });
  } else {
    res.json(product);
  }
});

app.delete("/products", async (req, res) => {
  const response = await productManager.deleteProducts();
  res.json({ response });
});

app.delete("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  const products = await productManager.deleteProductsById(+pid);
  res.json({ products });
});

app.put("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  const obj = req.body;
  const product = await productManager.updateProduct(+pid, obj);
  res.json({ product });
});

app.listen(port, () => console.log(`Listen port ${port}`));
