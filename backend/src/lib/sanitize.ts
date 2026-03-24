export function sanitizeText(value: string) {
  return value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim();
}

export function sanitizeMultilineText(value: string) {
  return sanitizeText(value).replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n");
}

export function sanitizeOptionalText(value: string | undefined | null) {
  if (!value) {
    return undefined;
  }

  const sanitized = sanitizeText(value);
  return sanitized.length > 0 ? sanitized : undefined;
}
