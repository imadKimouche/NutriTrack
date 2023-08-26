import {Gender} from './store/onboarding';

export function getSurroundingDates(date: Date, datesBefore: number, datesAfter: number) {
  const surroundingDates: Date[] = [];

  for (let i = datesBefore; i > 0; i--) {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - i);
    surroundingDates.push(newDate);
  }
  surroundingDates.push(date);
  for (let i = 1; i <= datesAfter; i++) {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + i);
    surroundingDates.push(newDate);
  }
  return surroundingDates;
}

export function calculateBMR(gender: Gender, age: number, height: number, weight: number) {
  if (!gender || !age || !height || !weight) {
    return 0;
  }
  let bmr;
  if (gender === 'male') {
    bmr = 66.473 + 13.7516 * weight + 5.0033 * height - 6.755 * age;
  } else {
    bmr = 655.0955 + 9.5634 * weight + 1.8496 * height - 4.6756 * age;
  }

  return bmr;
}

export function generateHeightOptions(min: number, max: number, increment: number) {
  const options = [];
  for (let height = min; height <= max; height += increment) {
    const label = `${height} cm`;
    options.push({value: height.toString(), label});
  }
  return options;
}

export const generateWeightOptions = (min: number, max: number, increment: number) => {
  const options = [];
  for (let weight = min; weight <= max; weight += increment) {
    options.push({value: weight.toString(), label: `${weight} kg`});
  }
  return options;
};

export function extractInitials(email?: string | null) {
  if (email === undefined || email == null || email?.trim().length === 0) {
    return 'N/A';
  }

  const emailParts = email.split('@');
  const username = emailParts[0];
  const nameParts = username.split('.');
  const initials = nameParts.map(part => part.charAt(0).toUpperCase());
  return initials.join('');
}

export function calculateMacronutrients(tdee: number, carbPercentage: number, proteinPercentage: number, fatPercentage: number) {
  const totalCalories = tdee;
  const carbCalories = (totalCalories * carbPercentage) / 100;
  const proteinCalories = (totalCalories * proteinPercentage) / 100;
  const fatCalories = (totalCalories * fatPercentage) / 100;

  // Convert calorie values to gram values (1g of carbs/proteins = 4 calories, 1g of fat = 9 calories)
  const carbs = carbCalories / 4;
  const protein = proteinCalories / 4;
  const fat = fatCalories / 9;

  return {carbs, protein, fat};
}
export const hex2rgba = (hex: string, alpha: number = 1) => {
  const [r, g, b] = hex.match(/\w\w/g)!.map(x => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};
