import React from 'react';

const DailyCalorieIntake = ({ data }) => {
  return (
    <div>
      <h2>Your recommended daily calorie intake is</h2>
      <div>
        {/* Burası hesaplanan sonuç olacak, şimdilik placeholder */}
        <h3>
          2800 <span>kcal</span>
        </h3>
      </div>

      <hr />

      <div>
        <h4>Foods you should not eat</h4>
        <ol>
          <li>Flour products</li>
          <li>Milk</li>
          <li>Red meat</li>
          <li>Smoked meats</li>
        </ol>
      </div>

      <button type="button">Start losing weight</button>
    </div>
  );
};

export default DailyCalorieIntake;
