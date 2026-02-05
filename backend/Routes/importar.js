import express from "express";
import multer from "multer";
import xlsx from "xlsx";
import { db } from "../db.js";



const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/:listaId", upload.single("arquivo"), async (req, res) => {
  const workbook = XLSX.readFile(req.file.path);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const dados = XLSX.utils.sheet_to_json(sheet);

  for (const item of dados) {
    await db.query(
      "INSERT INTO presentes (lista_id, nome) VALUES (?, ?)",
      [req.params.listaId, item.nome]
    );
  }

  res.json({ ok: true });
});

export default router;