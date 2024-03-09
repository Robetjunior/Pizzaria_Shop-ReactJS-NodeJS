// utils/validationUtils.js
export const isValidName = (name) => name.trim() !== "";
export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const isValidPhoneNumber = (phoneNumber) =>
  /^\+55\d{2}9\d{4}-\d{4}$/.test(phoneNumber);
