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

  addCarts = async () => {
    const cartsInFileAsk = await this.getCarts();
    const id = this.#generateID(cartsInFileAsk);
    const newCarts = { id: id, products: [] };
    cartsInFileAsk.push(newCarts);
    await fs.promises.writeFile(this.path, JSON.stringify(cartsInFileAsk));
    return newCarts;
  };

  addProductsToCart = async (cid, pid) => {
    const cartsInFileAsk = await this.getCarts();
    const cart = cartsInFileAsk.find((c) => c.id === cid);
    let q = 1;
    const obj = { product: pid, quantity: q };

    if (cart.products.length === 0) {
      cart.products = obj;
      const updateCart = cart;
      //console.log(cart);
      cartsInFileAsk.splice(0, 1, updateCart);
      console.log(cartsInFileAsk);
      await fs.promises.writeFile(this.path, JSON.stringify(cartsInFileAsk));
      return "Product addred";
    }
    if (cart.products.product === pid) {
      cart.products.quantity += 1;
      const updateCart = cart;
      cartsInFileAsk.splice(0, 1, updateCart);
      await fs.promises.writeFile(this.path, JSON.stringify(cartsInFileAsk));
      return "Product addred";
    } else {
      //falta agregar que pasa si es un producto nuevo
    }
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
