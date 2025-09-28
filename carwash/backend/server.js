require('dotenv').config();
const connectDB = require("./conection");
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/carwash';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('MongoDB connected'))
  .catch(err => console.error('Mongo connection error:', err));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/user"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on http://localhost:${PORT}`));
