interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export function validateCode(code: string): ValidationResult {
  // Placeholder validation: always pass for now
  return { isValid: true };
}
