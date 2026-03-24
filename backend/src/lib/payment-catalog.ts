export type PaymentOption = {
  key: string;
  label: string;
  amountCents: number;
  description: string;
  statementDescriptor: string;
};

export const paymentOptions: readonly PaymentOption[] = [
  {
    key: "compliance-consultation-deposit",
    label: "Compliance Consultation Deposit",
    amountCents: 25_000,
    description: "Reserve a scoped compliance readiness engagement for your business.",
    statementDescriptor: "NOURMED COMPLIANCE",
  },
  {
    key: "secure-website-project-deposit",
    label: "Secure Website Project Deposit",
    amountCents: 50_000,
    description: "Reserve a secure website development engagement with implementation planning.",
    statementDescriptor: "NOURMED WEBSITE",
  },
  {
    key: "security-package-setup-deposit",
    label: "Security Package Setup Deposit",
    amountCents: 30_000,
    description: "Reserve onboarding for a recurring small-business security package.",
    statementDescriptor: "NOURMED SECURITY",
  },
] as const;

export function getPaymentOption(optionKey: string) {
  return paymentOptions.find((option) => option.key === optionKey);
}
