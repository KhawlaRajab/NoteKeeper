require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const noteRoutes = require('./Routes/note.route.js');


const app = express();
app.use(cors()); 
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/notes', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to DB locally');
  } catch (error) {
    console.error('Failed to connect to DB:', error.message);
    process.exit(1);
  }
};


connectDB();
  

app.use('/notes', noteRoutes);

  

app.listen(5000, () => {
    console.log(`Server is running on http://localhost:5000`);
});
