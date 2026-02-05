import express from "express";
import cors from "cors";
import authRoutes from "/Users/LUKAS/Pictures/Chá panela - Lukas & Emilly/backend/routes/auth.js";
import listasRoutes from "/Users/LUKAS/Pictures/Chá panela - Lukas & Emilly/backend/routes/listas.js";
import importarRoutes from "/Users/LUKAS/Pictures/Chá panela - Lukas & Emilly/backend/routes/importar.js";

const app = express();
app.use(cors());
app.use(express.json());


app.use("/auth",authRoutes);
app.use("/listas",listasRoutes);
app.use("/importar",importarRoutes);

app.listen(3000, () => console.log("API rodando na porta 3000"));