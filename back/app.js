const express = require("express");
const app = express();
app.use(express.json());

const PORT = 8080;

const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/trylundi", {})
    .then(console.log("Connected to MongoDB"));

const routes = require("./routes");
app.use("/", routes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

