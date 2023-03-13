import { Router } from "express";
import CartManager from "../../CartManager.js";

const path = "carts.json";
const router = Router();

const cartManager = new CartManager(path);

const products = [1, 2, 3];

router.post("/", async (req, res) => {
  const newCart = await cartManager.addCarts();
  res.json({ message: "Cart created", cart: newCart });
});

router.get("/", async (req, res) => {
  const { limit } = req.query;
  const carts = await cartManager.getCarts();
  if (!limit) {
    res.json({ carts });
  } else {
    let newLimit = parseInt(req.query.limit);
    const filterCarts = carts.filter((c) => c.id <= newLimit);
    res.json({ filterCarts });
  }
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await cartManager.getCartById(+cid);
  if (cart.length == 0) {
    res.json({ message: "Cart not existent" });
  } else {
    res.json(cart);
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const newCart = await cartManager.addProductsToCart(+cid, +pid);
  res.json({ message: "Products in cart", cart: newCart });
});

router.delete("/", async (req, res) => {
  const response = await cartManager.deleteCarts();
  res.json({ response });
});

export default router;
