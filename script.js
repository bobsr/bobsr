const form = document.getElementById('bmiForm');
const genderValue = document.getElementById('genderValue');
const bmiValue = document.getElementById('bmiValue');
const categoryValue = document.getElementById('categoryValue');
const resultNote = document.getElementById('resultNote');
const resultPanel = document.getElementById('resultPanel');
const needle = document.getElementById('needle');

function classifyBmi(bmi) {
  if (bmi < 18.5) return { key: 'underweight', label: 'Underweight' };
  if (bmi < 25) return { key: 'normal', label: 'Normal weight' };
  if (bmi < 30) return { key: 'overweight', label: 'Overweight' };
  return { key: 'obesity', label: 'Obesity' };
}

function bmiToPercent(bmi) {
  const min = 15;
  const max = 40;
  const clamped = Math.min(max, Math.max(min, bmi));
  return ((clamped - min) / (max - min)) * 100;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const gender = document.getElementById('gender').value;
  const heightCm = Number(document.getElementById('height').value);
  const weightKg = Number(document.getElementById('weight').value);

  if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) {
    resultNote.textContent = 'Please provide valid height and weight values.';
    return;
  }

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  const rounded = bmi.toFixed(1);
  const classification = classifyBmi(bmi);
  const needlePercent = bmiToPercent(bmi);

  genderValue.textContent = `Gender: ${gender.charAt(0).toUpperCase()}${gender.slice(1)}`;
  bmiValue.textContent = rounded;
  categoryValue.textContent = classification.label;
  needle.style.left = `${needlePercent}%`;

  resultPanel.classList.remove('state-underweight', 'state-normal', 'state-overweight', 'state-obesity');
  resultPanel.classList.add(`state-${classification.key}`);

  resultNote.textContent = `Your BMI is ${rounded}. This falls in the ${classification.label.toLowerCase()} range.`;
});
