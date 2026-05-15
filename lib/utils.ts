import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Covert prisma object into a regular js object

export function covertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

// Format number to decimal Places
export function formatToDecimalPlaces(num: number | string): string {
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
}
