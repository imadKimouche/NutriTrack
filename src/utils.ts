import {Gender} from './store/onboarding';

export function dateToString(date: Date): string {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export function convertDateStringToDate(dateString: string): Date | null {
  const [day, month, year] = dateString.split('-').map(Number);

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return null;
  }
  const date = new Date(year, month - 1, day);

  if (isNaN(date.getTime())) {
    return null;
  }

  return date;
}

export function getSurroundingDates(dateStr: string, datesBefore: number, datesAfter: number): string[] {
  const date = convertDateStringToDate(dateStr);

  if (!date) {
    return [];
  }

  const surroundingDates: string[] = [];
  const millisecondsInADay = 24 * 60 * 60 * 1000;

  const startDate = new Date(date.getTime() - datesBefore * millisecondsInADay);

  for (let i = 0; i < datesBefore + datesAfter + 1; i++) {
    const currentDate = new Date(startDate.getTime() + i * millisecondsInADay);
    const formattedDate = dateToString(currentDate);
    surroundingDates.push(formattedDate);
  }

  return surroundingDates;
}

export function calculateBMR(gender: Gender, age: number, height: number, weight: number) {
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
