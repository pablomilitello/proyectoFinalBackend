import { Router } from "express";

const router = Router();

const products = [];

router.get("/", (req, res) => {
  res.json({ products });
});

export default router;
