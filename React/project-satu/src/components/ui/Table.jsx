export default function Table({ headers, children }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-secondary-light/30">
      <table className="w-full text-sm">
        <thead className="bg-primary text-white">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="text-left px-4 py-3 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-secondary-light/20">
          {children}
        </tbody>
      </table>
    </div>
  )
}
