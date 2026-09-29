import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const filePath = path.join(__dirname, "products.json");


const raw = JSON.parse(fs.readFileSync(filePath, "utf-8"));


const cleaned = raw.map((p) => ({
  ...p,
  _id: p._id?.$oid || undefined,
}));


fs.writeFileSync(filePath, JSON.stringify(cleaned, null, 2));

// ✅ Succes
console.log("✅ products.json curățat");
