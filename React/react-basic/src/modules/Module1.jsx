import React, { useState } from 'react';


const MentoringSession = ({ topic, mentorName }) => {
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <Card>
      <h2 className="text-xl font-bold text-gray-800 mb-2">{topic}</h2>
      <p className="text-gray-600 mb-4">Mentor: {mentorName}</p>
      
      <div className="mb-4">
        <span className="font-semibold">Status: </span>
        {isRegistered ? (
          <span className="text-green-600 font-medium">Sudah Terdaftar ✅</span>
        ) : (
          <span className="text-gray-500 font-medium">Belum Terdaftar ❌</span>
        )}
      </div>

      <button
        onClick={() => setIsRegistered(!isRegistered)}
        className={`w-full py-2 px-4 rounded font-bold text-white transition-colors ${
          isRegistered ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isRegistered ? 'Batalkan Pendaftaran' : 'Daftar Sesi'}
      </button>
    </Card>
  );
};

// Komponen utama untuk Modul 1
const Module1 = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 border-b pb-2">Modul 1: JSX, State, Props & Composition</h1>
      <div className="flex flex-wrap gap-4">
        <MentoringSession topic="React Hooks Fundamental" mentorName="Kak Andrian" />
        <MentoringSession topic="Membangun API dengan Express" mentorName="Kak Budi" />
      </div>
    </div>
  );
};

export default Module1;