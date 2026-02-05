import express from "express";
import { db } from "../db.js";


const router = express.Router();


router.get("/:slug", async (req, res) => {
  const [[lista]] = await db.query(
    "SELECT * FROM listas WHERE slug = ?",
    [req.params.slug]
  );

  const [presentes] = await db.query(
    "SELECT * FROM presentes WHERE lista_id = ?",
    [lista.id]
  );

  res.json({ lista, presentes });
});

export default router;