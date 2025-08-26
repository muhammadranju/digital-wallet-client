// List of trusted email providers
const trustedEmailProviders = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "protonmail.com",
  "icloud.com",
  "hotmail.com",
  "aol.com",
  "mail.com",
  "yandex.com",
];

export const checkEmailProvider = (email: string): boolean => {
  const domain = email.split("@")[1]; // Get the domain part of the email
  return trustedEmailProviders.includes(domain); // Check if the domain matches any trusted provider
};
