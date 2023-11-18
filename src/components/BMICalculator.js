import React, { Component } from 'react';
import axios from 'axios';

class BMICalculator extends Component {
  constructor() {
    super();
    this.state = {
      weight: 0,
      height: 0,
      bmi: 0,
      bmiCategory: '', // Added a new state property for BMI category.
    };
  }

  calculateBMI = () => {
    const { weight, height } = this.state;
    const heightInMeters = height / 100;

    if (weight > 0 && height > 0) {
      const bmi = weight / Math.pow(heightInMeters, 2);
      this.setState({ bmi });

      // Determine the BMI category based on the calculated BMI value.
      let bmiCategory = '';
      if (bmi < 18.5) {
        bmiCategory = 'Underweight';
      } else if (bmi < 24.9) {
        bmiCategory = 'Normal Weight';
      } else if (bmi < 29.9) {
        bmiCategory = 'Overweight';
      } else {
        bmiCategory = 'Obese';
      }

      this.setState({ bmiCategory });

      // Make an API call to save the BMI data
      axios.post('http://localhost:5000/api/bmi', {
        weight,
        height,
        bmi,
        bmiCategory,
      })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error saving BMI data:', error);
        });
    }
  };

  handleWeightChange = (e) => {
    this.setState({ weight: e.target.value });
  };

  handleHeightChange = (e) => {
    this.setState({ height: e.target.value });
  };

  render() {
    return (
      <div>
        <h1>BMI Calculator</h1>
        <div>
          <label>Weight (kgs):</label>
          <input type="number" onChange={this.handleWeightChange} />
        </div>
        <div>
          <label>Height (cms):</label>
          <input type="number" onChange={this.handleHeightChange} />
        </div>
        <button onClick={this.calculateBMI}>Calculate BMI</button>
        {this.state.bmi > 0 && (
          <div>
            <p>Your BMI is: {this.state.bmi.toFixed(2)}</p>
            <p>BMI Category: {this.state.bmiCategory}</p> {/* Display the calculated BMI category. */}
          </div>
        )}
      </div>
    );
  }
}

export default BMICalculator;
