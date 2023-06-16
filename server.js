import express from "express";
import product from "./routes/products.js";
import { connection } from "./db/connection.js";
import cors from "cors";
import registration from "./routes/registration.js";
import bodyParser from "body-parser";

const app = express();



app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use('/upload',express.static('upload'));
connection
  .then(() => {
    console.log("DB Connected.");
  })
  .catch((e) => {
    console.log(e);
  });

app.use("/products", product);
app.use("/register", registration);

app.listen(8000);