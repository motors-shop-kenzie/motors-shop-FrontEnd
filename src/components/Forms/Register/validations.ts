export const isBirthdateValid = (value: string) => {
  const [yearStr, monthStr, dayStr] = value.split("-");
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return false;
  }

  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return false;
  }

  return true;
};

export const isCPFValid = (value: string) => {
  const cleanedCPF = value.replace(/\D/g, "");

  if (cleanedCPF.length !== 11 || /^(\d)\1+$/.test(cleanedCPF)) {
    return false;
  }

  const calculateDigit = (digits: number[]) => {
    const sum = digits.reduce((acc, digit, index) => {
      return acc + parseInt(String(digit)) * (digits.length + 1 - index);
    }, 0);
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
    return remainder;
  };

  const cpfDigits = Array.from(cleanedCPF).map(Number);
  const firstDigit = calculateDigit(cpfDigits.slice(0, 9));
  const secondDigit = calculateDigit(cpfDigits.slice(0, 9).concat(firstDigit));

  return cleanedCPF.charAt(9) === String(firstDigit) && cleanedCPF.charAt(10) === String(secondDigit);
};
