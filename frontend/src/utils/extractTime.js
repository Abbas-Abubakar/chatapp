export function extractTIme(dateString){
  const date = new Date(dateString)
  const hours = padZero(date.getHours())
  const minutes = padZero(date.getMinutes())
  return `${hours}:${minutes}`
}

function padZero(number){
  return number.toString().padStart(2, "0")
}

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate())

export function formatLastSeen(dateString){
  if (!dateString) return "Offline"
  const date = new Date(dateString)
  const now = new Date()

  const diffMin = Math.floor((now - date) / 60000)
  if (diffMin < 1) return "Last seen just now"
  if (diffMin < 60) return `Last seen ${diffMin} min ago`

  const time = extractTIme(date)
  const dayDiff = Math.round((startOfDay(now) - startOfDay(date)) / 86400000)

  if (dayDiff === 0) return `Last seen today at ${time}`
  if (dayDiff === 1) return `Last seen yesterday at ${time}`
  if (dayDiff < 7) return `Last seen ${date.toLocaleDateString(undefined, { weekday: "long" })} at ${time}`
  return `Last seen ${date.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}`
}
