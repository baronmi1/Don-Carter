const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const xss = require("xss-clean");
const cors = require("cors");
const globalErrorHandler = require("./controllers/errorController");

const planRouter = require("./routes/planRoutes");
const userRouter = require("./routes/userRoutes");
const emailRouter = require("./routes/emailRoutes");
const currencyRouter = require("./routes/currencyRoutes");
const transactionRouter = require("./routes/transactionRoutes");
const companyRouter = require("./routes/companyRoutes");
const bannerRouter = require("./routes/bannerRoutes");
const faqRouter = require("./routes/faqRoutes");
const termsRouter = require("./routes/termsRoutes");
const cardRouter = require("./routes/cardRoutes");
const blogRouter = require("./routes/blogRoutes");

const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connected");
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(xss());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan("dev")); // configire morgan

app.use("/api/plans", planRouter);
app.use("/api/users", userRouter);
app.use("/api/emails", emailRouter);
app.use("/api/currency", currencyRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/company", companyRouter);
app.use("/api/banner", bannerRouter);
app.use("/api/faq", faqRouter);
app.use("/api/terms", termsRouter);
app.use("/api/card", cardRouter);
app.use("/api/blog", blogRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/dist/")));
  app.get("*", (req, res) => {
    res.sendFile(__dirname + "/dist/index.html");
  });
}

app.use(globalErrorHandler);

module.exports = server;
