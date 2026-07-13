export default function ListsAndKeys() {
  const users = [
    { id: 1, name: "Budi", role: "Admin" },
    { id: 2, name: "Siti", role: "Editor" },
    { id: 3, name: "Andi", role: "User" },
  ];

  return (
    <ul className="p-4 space-y-2">
      {users.map((user) => (
        // 'key' ditaruh di elemen paling luar yang di-return dari map
        <li key={user.id} className="p-2 border rounded shadow-sm">
          <span className="font-bold">{user.name}</span> - {user.role}
        </li>
      ))}
    </ul>
  );
}