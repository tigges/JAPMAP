export function fmtInt(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

export function fmtKm(n: number): string {
  const digits = Number.isInteger(n) ? 0 : 1;
  return n.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: 1,
  });
}

export function fmtClimb(n: number): string {
  return `${fmtInt(n)} m`;
}

export function fmtEffort(n: number): string {
  return String(Math.round(n));
}
