const express = require("express");
const app = express();
const dotenv = require("dotenv");

const databaseConnect = require("./config/database");
const authRouter = require("./routes/authRoute");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5000;

dotenv.config({
  path: "backend/config/config.env",
});

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/messenger", authRouter);

app.get("/", (req, res) => {
  res.send("This is from backend Server");
});
databaseConnect();
app.listen(PORT, () => {
  console.log("The server is running on port " + PORT);
});
