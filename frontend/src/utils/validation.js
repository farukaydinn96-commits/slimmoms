export const validateCalculatorForm = formData => {
  const errors = {};
  let isValid = true;

  if (!formData.height) {
    errors.height = 'Required';
    isValid = false;
  }
  if (!formData.age) {
    errors.age = 'Required';
    isValid = false;
  }
  if (!formData.currentWeight) {
    errors.currentWeight = 'Required';
    isValid = false;
  }
  if (!formData.desiredWeight) {
    errors.desiredWeight = 'Required';
    isValid = false;
  }
  if (!formData.bloodType) {
    errors.bloodType = 'Required';
    isValid = false;
  }

  return { errors, isValid };
};
