import { Router } from "express";
import ProductManager from "../../ProductManager.js";

const path = "products.json";
const router = Router();

const productManager = new ProductManager(path);

router.get("/", async (req, res) => {
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

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await productManager.getProductById(+pid);
  if (product.length == 0) {
    res.json({ message: "Product not existent" });
  } else {
    res.json(product);
  }
});

router.post("/", async (req, res) => {
  const obj = req.body;
  const newProduct = await productManager.addProducts(obj);
  res.json({ message: "Product created", product: newProduct });
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const obj = req.body;
  const product = await productManager.updateProduct(+pid, obj);
  res.json({ product });
});

router.delete("/", async (req, res) => {
  const response = await productManager.deleteProducts();
  res.json({ response });
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  const products = await productManager.deleteProductsById(+pid);
  res.json({ products });
});

export default router;
