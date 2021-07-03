const express = require("express");
const mongoose = require("mongoose");
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require("./config/config");

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log("connected to DB"))
    .catch((e) => {
      console.error(e);
      setTimeout(connectWithRetry, 5000);
    });
};

app.get("/", (req, res) => {
  res.send("<h2>We're up!!!</h2>");
});

connectWithRetry();

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
