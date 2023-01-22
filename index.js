const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const router = require("./routes/router.js");

//! INIT APP
const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

//! ROUTES
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ Message: "This is the backend of: https://books-info.vercel.app" });
});
app.use("/api/books", router);

//! DB CONNECTION
const mongoUri = `mongodb+srv://agustintcruz:${process.env.PASS}@redesplus.icmht48.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;

mongoose
  .set("strictQuery", false)
  .connect(mongoUri)
  .then(() => {
    //! Listen for request
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`✔️  Connected to DB & listening on port ${PORT}...`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = app;
