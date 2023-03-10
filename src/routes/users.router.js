import { Router } from "express";

const router = Router();

const users = [];

router.get("/", (req, res) => {
  res.json({ users });
});

export default router;
