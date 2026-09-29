import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import bookRoutes from "./routes/book.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
// console.log('process.cwd(): ', process.cwd());

/* SETTINGS */
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

/* MIDDLEWARES */
//app.use(express.json())//
app.use(express.urlencoded({extended: false})) //LEE FORMATOS application/x-www-form-urlencoded

/* ROUTES */
app.use(bookRoutes);

/* middleware de errores */
app.use((err, req, res, next) => {
  res.status(500).send("Something went wrong!");
})

/* STATIC FILES */
app.use(express.static(join(__dirname, "public")));

app.listen(PORT, () => console.log(`Server up on port ${PORT}`));

/* Dedicado a mi bro RONALD ® */