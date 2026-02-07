import React from 'react';

export default function TeamMemberCard({ member }) {
    return (
        <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
            <img
                src={member.image || "/assets/default-avatar.png"}
                alt={member.name}
                className="w-10 h-10 rounded-full object-cover shadow-md shrink-0 border border-gray-200"
            />
            <div>
                <p className="font-bold text-gray-800 text-sm">
                    {member.name} - <span className="font-normal text-oxigen-light text-sm">{member.role}</span>
                </p>
            </div>
        </div>
    );
}
