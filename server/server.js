const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

//Import mongoose and DB connection
const mongoose = require('mongoose');
const connectDB = require('./config/connection.js');
const colors = require('colors');

//Import routes
const userRoutes = require('./routes/userRoutes');

//Express config
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/', userRoutes);

//DB connection
connectDB();

//Port listen...
PORT = process.env.PORT;
app.listen(PORT, console.log(`Server listening on port ${PORT}`.yellow));
