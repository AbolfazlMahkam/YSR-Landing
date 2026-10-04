import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

export function toPersianDigits(value: string | number): string {
  return String(value).replace(/\d/g, (d) => persianDigits[Number(d)])
}

export function formatNumber(value: number): string {
  return toPersianDigits(value.toLocaleString('en-US'))
}
