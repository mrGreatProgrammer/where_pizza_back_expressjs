require("dotenv").config();
const express = require("express");
const path = require("path");


const sequelize = require("./settings/db");
const router = require('./routes/index');
const corsMiddleware = require("./middleware/corsMiddleware");

const port = process.env.PORT || 4400;
const app = express();



app.use(corsMiddleware);
app.use(express.json())
// app.use(express.static(path.resolve(__dirname, "static")));
app.use('/static', express.static('static'))
app.use('/api', router)

app.get("/", (req, res) => {
  res.send("Hello world!");
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (e) {
    console.log(e);
  }
};

start();
