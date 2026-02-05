import express from "express";
import bcrypt from "bcryptjs";
import { db } from "../db.js";

router.post("/register", async (req, res) => {
  const { nome, email, senha } = req.body;

  const hash = await bcrypt.hash(senha, 10);

  await db.query(
    "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
    [nome, email, hash]
  );

  res.json({ ok: true });
});

export default router;