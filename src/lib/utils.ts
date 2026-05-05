export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function generateClaimToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }
  return phone
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).trimEnd() + '…'
}

const DAY_LABELS: Record<string, string> = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',
}

export function formatDayLabel(key: string): string {
  return DAY_LABELS[key] ?? key
}

export function getMapsUrl(address: string, city: string, state: string): string {
  const query = encodeURIComponent(`${address}, ${city}, ${state}`)
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}
