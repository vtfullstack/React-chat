const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const usersroute = require("./routes/api/users");
const chatroute = require("./routes/api/chatroute");
const messageroute = require("./routes/api/message");
require("dotenv").config();

const app = express();
//connect to MongoDB
mongoose
  .connect(
    process.env.DB_URL ||
      "mongodb+srv://admin:admin123@cluster0.76idm.mongodb.net/HelloChatss?retrywrites=true&w=majority"
  )
  .then((res) => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());
require("./config/passport.js")(passport);
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());
app.use("/api/users", usersroute);
app.use("/api/chat", chatroute);
app.use("/api/message", messageroute);
console.log("process.env.PORT", process.env.PORT);
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server up and running on port ${port}`));
