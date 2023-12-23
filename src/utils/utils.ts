export const getDayByDate = (dateString: string) => {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const date = new Date(dateString);
  return daysOfWeek[date.getDay()];
};

export const getImageByPhrase = (phrase: string) => {
  const lowercasedPhrase = phrase.toLowerCase();
  if (lowercasedPhrase.includes('snow')) {
    return 'snow';
  } else if (
    lowercasedPhrase.includes('rain') ||
    lowercasedPhrase.includes('shower')
  ) {
    return 'rain';
  } else if (lowercasedPhrase.includes('cloud')) {
    return 'cloudy';
  } else {
    return 'sun';
  }
};

export const calculateTemperature = (
  temperature: number,
  measureSystem: string
) => {
  if (measureSystem === 'Celsius') {
    return (((temperature - 32) * 5) / 9).toFixed(0);
  }
  return ((temperature * 9) / 5 + 32).toFixed(0);
};
