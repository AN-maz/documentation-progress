function ProfileCard({ name, role, photo }) {
  return (
    <article className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
      <img
        src={photo}
        alt={name}
        className="w-24 h-24 rounded-full mx-auto mb-4 bg-primary/10"
      />
      <h3 className="text-lg font-bold text-dark">{name}</h3>
      <p className="text-secondary font-medium text-sm mt-1">{role}</p>
    </article>
  )
}

export default ProfileCard
