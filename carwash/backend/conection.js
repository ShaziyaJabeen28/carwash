require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    console.log('DB Name:', mongoose.connection.name);
    console.log('Host Info:', mongoose.connection.host + ':' + mongoose.connection.port);
  })
  .catch((err) => {
    console.error('Mongo connection error:', err);
  });
