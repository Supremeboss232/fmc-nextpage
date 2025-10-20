export function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export function passwordStrength(password: string) {
  const length = password.length >= 6;
  const upper = /[A-Z]/.test(password);
  const number = /[0-9]/.test(password);
  const score = [length, upper, number].filter(Boolean).length;
  return { score, criteria: { length, upper, number } };
}
