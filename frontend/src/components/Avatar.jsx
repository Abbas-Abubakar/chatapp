const COLORS = [
  "bg-amber-700", "bg-blue-600", "bg-emerald-600", "bg-rose-600",
  "bg-violet-600", "bg-cyan-700", "bg-orange-600", "bg-pink-600",
]

const SIZES = {
  sm: "size-9 text-xs",
  md: "size-11 text-sm",
  lg: "size-12 text-base",
}

const getInitials = (name = "") => {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return "?"
  const first = parts[0][0]
  const last = parts.length > 1 ? parts[parts.length - 1][0] : ""
  return (first + last).toUpperCase()
}

// same name always gets the same color
const colorFor = (name = "") => {
  let hash = 0
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0
  return COLORS[hash % COLORS.length]
}

const Avatar = ({ name, size = "md" }) => (
  <div aria-hidden="true"
    className={`${SIZES[size]} ${colorFor(name)} shrink-0 rounded-full grid place-items-center font-bold text-white select-none`}>
    {getInitials(name)}
  </div>
)

export default Avatar