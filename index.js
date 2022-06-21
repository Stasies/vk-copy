const express = require("express");
const app = express();
const helmet = require("helmet");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const commentRoute = require("./routes/comment");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const cors = require("cors");
const multer = require("multer");
const router = express.Router();
const path = require("path");

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded ");
  } catch (error) {
    console.log(error);
  }
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/messages", messageRoute);
app.use("/api/comment", commentRoute);
app.use("/api/conversations", conversationRoute);

app.get("/", (req, res) => {
  res.send("welcome to our page");
});

app.listen(PORT, () => {
  console.log("backend is running on " + PORT);
});
