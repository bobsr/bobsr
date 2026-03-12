const form = document.getElementById('bmi-form');
const bmiValue = document.getElementById('bmi-value');
const bmiCategory = document.getElementById('bmi-category');
const errorMessage = document.getElementById('error');
const indicator = document.getElementById('meter-indicator');
const healthyRange = document.getElementById('healthy-range');

const BMI_MIN = 16;
const BMI_MAX = 40;

const healthyByGender = {
  female: { min: 18.0, max: 24.0 },
  male: { min: 18.5, max: 25.0 },
};

const toCategory = (bmi) => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Healthy';
  if (bmi < 30) return 'Overweight';
  return 'Obesity';
};

const updateIndicator = (bmi) => {
  const clamped = Math.max(BMI_MIN, Math.min(BMI_MAX, bmi));
  const ratio = (clamped - BMI_MIN) / (BMI_MAX - BMI_MIN);
  indicator.style.left = `${ratio * 100}%`;
};

const setHealthyRangeText = (gender) => {
  const range = healthyByGender[gender];
  healthyRange.textContent = `Healthy range (${gender}): ${range.min.toFixed(1)}–${range.max.toFixed(1)}`;
};

form.addEventListener('change', (event) => {
  if (event.target.name === 'gender') {
    setHealthyRangeText(event.target.value);
  }
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  errorMessage.textContent = '';

  const formData = new FormData(form);
  const gender = formData.get('gender');
  const heightCm = Number(formData.get('height'));
  const weightKg = Number(formData.get('weight'));

  if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) {
    errorMessage.textContent = 'Please enter valid positive height and weight values.';
    return;
  }

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  const category = toCategory(bmi);

  const range = healthyByGender[gender];
  const inHealthyRange = bmi >= range.min && bmi <= range.max;

  bmiValue.textContent = bmi.toFixed(1);
  bmiCategory.textContent = `${category}${inHealthyRange ? ' • within your selected healthy range' : ''}`;
  setHealthyRangeText(gender);
  updateIndicator(bmi);
});

setHealthyRangeText('female');
updateIndicator(18.5);
