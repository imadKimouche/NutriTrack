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
