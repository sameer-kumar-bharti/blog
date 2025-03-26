const express = require('express')
const app = express()
const router = require('./Router/route');
const db = require('./database/db');
const dotenv = require('dotenv');
const session = require('express-session');
dotenv.config();
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const cors = require('cors');
app.use(cors());
app.use(
  session({
    secret: 'test', // Replace with a strong secret key
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't create session until something is stored
    cookie: {
      secure: false, // Use `true` if using HTTPS
      httpOnly: true, // Helps prevent XSS attacks
      maxAge: 3600000, // 1 hour in milliseconds
  },
  })
);

const port = 4000
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/',router);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})