export default function Badge({ children, variant = 'gold', size = 'sm' }) {
  const variants = {
    gold: 'tag-gold',
    rose: 'tag-rose',
    green: 'tag-green',
    red: 'tag-red',
    amber: 'tag-amber',
    blue: 'tag-blue',
    gray: 'bg-white/5 text-gray-400 border border-white/10',
  }

  const sizes = {
    xs: 'text-xs px-2 py-0.5 rounded-md',
    sm: 'text-xs px-2.5 py-1 rounded-lg',
    md: 'text-sm px-3 py-1 rounded-lg',
  }

  return (
    <span className={`inline-flex items-center font-medium ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  )
}
