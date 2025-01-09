const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const passport = require("passport");
const session = require("express-session"); 
const app = express();
const passportsetup = require("./passport");
const authRoutes = require("./routes/auth");

app.use(
  session({
    secret: process.env.SESSION_SECRET || "asdfghjkl", 
    resave: false, 
    saveUninitialized: false, 
    cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }, 
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: "http://localhost:3000", 
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoutes);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
