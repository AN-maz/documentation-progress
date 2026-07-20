export default function Input({ label, error, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-secondary">{label}</label>}
      <input
        className="border border-secondary-light rounded-lg px-3 py-2 outline-none focus:border-primary transition-colors"
        {...props}
      />
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  )
}
