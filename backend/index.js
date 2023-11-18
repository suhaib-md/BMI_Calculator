const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/bmiCalculator', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});

// Define BMI model/schema
const bmiSchema = new mongoose.Schema({
  weight: Number,
  height: Number,
  bmi: Number,
  bmiCategory: String,
});

const BMI = mongoose.model('BMI', bmiSchema);

// API routes
app.post('/api/bmi', (req, res) => {
  const { weight, height, bmi, bmiCategory } = req.body;
  const newBMI = new BMI({ weight, height, bmi, bmiCategory });

  newBMI.save()
  .then(() => {
    console.log('BMI data saved successfully');
    res.status(200).send('BMI data saved successfully');
  })
  .catch((err) => {
    console.error('Error saving BMI data:', err);
    res.status(500).send('Error saving BMI data');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
