export const allLanguages = [
  "English",
  "French",
  "Spanish",
  "Chinese",
  "German",
  "Italian",
];

export const allLocations = ["UK", "USA", "Singapore", "Canada", "Germany", "Italy"];


export const deliveryOptions = [
  { label: "Less than 24hr", value: 1 },
  { label: "Less than 7 days", value: 7 },
  { label: "Less than 10 days", value: 10 },
];

export const ratingOptions = [
  { label: "1+ rating", value: 1 },
  { label: "2+ rating", value: 2 },
  { label: "3+ rating", value: 3 },
  { label: "4+ rating", value: 4 },
  { label: "5 rating", value: 5 },
];

export const getCurrencySymbol = (code) => {
  const symbolMap = {
    usd: '$',
    eur: '€',
    gbp: '£',
    cad: 'C$',
    aud: 'A$',
    huf: 'Ft'
  };
  
  return symbolMap[code] || '$';
};

export const standardCurrency={ sign: "$", name: "USD", description: "United States Dollar" }

export const currencies = [
  { sign: "$", name: "USD", description: "United States Dollar" },
  { sign: "C$", name: "CAD", description: "Canadian Dollar" },
  { sign: "A$", name: "AUD", description: "Australian Dollar" },
  { sign: "Ft", name: "HUF", description: "Hungarian Forint" },
  { sign: "€", name: "EUR", description: "Euro" },
  { sign: "£", name: "GBP", description: "British Pound Sterling" },
];