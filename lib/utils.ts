import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials (name: string, lastname: string) {
  return `${name[0]}${lastname[0]}`
}

export function capitalize (str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const isString = (node: any) => {
  return typeof node === 'string'
}
