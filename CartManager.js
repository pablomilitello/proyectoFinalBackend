import fs from "fs";

class CartManager {
  constructor(path) {
    this.path = path;
  }

  getCarts = async () => {
    if (fs.existsSync(this.path)) {
      const cartsInFile = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(cartsInFile);
    } else {
      return [];
    }
  };

  getCartById = async (id) => {
    const cartsInFile = await fs.promises.readFile(this.path, "utf-8");
    const carts = JSON.parse(cartsInFile);
    const findCart = carts.find((c) => c.id === id);
    if (findCart) {
      return findCart;
    } else {
      return [];
    }
  };

  addCarts = async (cart) => {
    const cartsInFileAsk = await this.getCarts();
    const id = this.#generateID(cartsInFileAsk);
    const newCarts = { id, ...cart };
    cartsInFileAsk.push(newCarts);
    await fs.promises.writeFile(this.path, JSON.stringify(cartsInFileAsk));
    return newCarts;
  };

  addProductsToCart = async (cid, products) => {
    const cartsInFileAsk = await this.getCarts();
    const cart = cartsInFileAsk.find((c) => c.id === cid);
    // cart = { cid, ...products };
    // cartsInFileAsk.push(cart);
    // await fs.promises.writeFile(this.path, JSON.stringify(cartsInFileAsk));
  };

  deleteCarts = async () => {
    if (fs.existsSync(this.path)) {
      await fs.promises.unlink(this.path);
      return "Delete carts";
    } else {
      return "Non-existent file";
    }
  };

  deleteCartsById = async (id) => {
    const carts = await this.getCarts();
    const cartIndex = carts.findIndex((c) => c.id === id);
    if (cartIndex === -1) {
      return "Cart doesn't exist";
    } else {
      carts.splice(cartIndex, 1);
      await fs.promises.writeFile(this.path, JSON.stringify(carts));
      return "Cart deleted";
    }
  };

  #generateID = (cart) => {
    let id;
    if (cart.length === 0) {
      id = 1;
    } else {
      id = cart[cart.length - 1].id + 1;
    }
    return id;
  };
}

export default CartManager;

const cart1 = {
  products: [],
};
