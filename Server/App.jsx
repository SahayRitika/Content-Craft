const express = require('express');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const userModel = require('./models/user.jsx'); 
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config(); 

const app = express();

// Middleware setup
app.use(cors({ origin: 'https://contentcraft01.netlify.app', credentials: true })); // Allow requests from your React client
// 'http://localhost:5173'
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files if needed
app.use(express.static(path.join(__dirname, '../Client/public')));

// Basic endpoint to test server
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Create a new user
app.post('/create', (req, res) => {
  const { username, email, password } = req.body;

  // Encrypt the password before saving
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return res.status(500).send('Error generating salt');

    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) return res.status(500).send('Error hashing password');

      try {
        const createdUser = await userModel.create({
          username,
          email,
          password: hash,
        });

        const token = jwt.sign({ email }, 'shhhhhhh'); 
        res.cookie('token', token, { httpOnly: true });
        res.status(201).send(createdUser);
      } catch (error) {
        res.status(500).send('Error creating user');
      }
    });
  });
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).send('User not found');

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign({ email: user.email }, 'shhhh');
        res.cookie('token', token, { httpOnly: true });
        res.send('Login successful');
      } else {
        res.status(401).send('Invalid credentials');
      }
    });
  } catch (error) {
    res.status(500).send('Error logging in');
  }
});

// Logout endpoint
app.get('/logout', (req, res) => {
  res.cookie('token', '', { expires: new Date(0) });
  res.redirect('/');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
