export const serviceInterestValues = [
  "Compliance Consulting",
  "Secure Website Development",
  "Small Business Security Packages",
  "Authorized Security Scan",
  "Not sure yet",
] as const;

export type ServiceInterestValue = (typeof serviceInterestValues)[number];
