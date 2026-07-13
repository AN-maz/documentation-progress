import { useState } from 'react';

export default function ProfilUser() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="p-4 border rounded shadow-sm max-w-sm">
      {/* 1. Ternary Operator */}
      <h3 className="text-lg font-bold">
        {isLogin ? "Selamat datang, User!" : "Silakan Login"}
      </h3>

      <button 
        onClick={() => setIsLogin(!isLogin)}
        className="mt-2 px-3 py-1 bg-gray-800 text-white rounded"
      >
        {isLogin ? "Logout" : "Login"}
      </button>

      {/* 2. Logical AND */}
      {isLogin && (
        <div className="mt-4 p-2 bg-green-100 text-green-700 rounded">
          Ini adalah dashboard rahasia kamu.
        </div>
      )}
    </div>
  );
}