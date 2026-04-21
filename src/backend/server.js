const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb+srv://admin:admin@admin.6hxyace.mongodb.net/authDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
});

const User = mongoose.model("User", UserSchema);


// SIGNUP (Admin use)
app.post("/signup", async (req, res) => {
  try {
    let { username, password } = req.body;

    username = username.trim().toLowerCase();
    password = password.trim();

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      password: hashedPassword,
    });

    res.send("User stored in DB");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error storing data");
  }
});


// LOGIN (Client use)
app.post("/login", async (req, res) => {
  try {
    let { username, password } = req.body;

    username = username.trim().toLowerCase();
    password = password.trim();

    console.log("Entered:", username, password);

    const user = await User.findOne({ username });
    console.log("DB User:", user);

    if (!user) {
      return res.status(400).send("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res.status(400).send("Invalid password");
    }

    res.send("Login successful");
  } catch (err) {
    console.log(err);
    res.status(500).send("Login error");
  }
});


// GET USERS
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});


// Server
app.listen(5000, () => console.log("Server running on port 5000"));