const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
//url адрес + порт 
let corsOptions = {
  origin: "http://localhost:80"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

app.get("/", (req, res) => {
  res.json({ msg:"hello world!" });
});
require("./app/routes/turorial.routes")(app);
//портецькый
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Сервер работате на порте: ${PORT}.`);
});
