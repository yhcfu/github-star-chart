import { type ClassValue, clsx } from "clsx";
import { createTwc } from "react-twc";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// https://react-twc.vercel.app/
export const twx = createTwc({ compose: cn });
