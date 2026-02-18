import React from 'react';

const UserDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Card Info */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-gray-500 text-sm mb-1">Status Keanggotaan</h3>
        <p className="text-2xl font-bold text-green-600">Aktif</p>
      </div>
      
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-gray-500 text-sm mb-1">Divisi</h3>
        <p className="text-2xl font-bold text-oxigen-light">Software Engineering</p>
      </div>
    </div>
  );
};

export default UserDashboard;