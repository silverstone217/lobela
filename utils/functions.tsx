// IS EMPTY STRING FUNCTION
export function isEmptyString(value: string | null | undefined): boolean {
  return !value || value.trim().length === 0;
}

//
