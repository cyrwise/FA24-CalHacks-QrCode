import { useEffect, useState } from 'react';

export default function Profile({ id }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch(`/api/badges/${id}`);
      const data = await res.json();
      setProfile(data);
    };

    fetchProfile();
  }, [id]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h1>{profile.fullName}'s Profile</h1>
      <p>University: {profile.university}</p>
      <p>Major: {profile.major}</p>
      <p>Graduation Date: {new Date(profile.graduationDate).toLocaleDateString()}</p>
      <p>Github: <a href={profile.github}>{profile.github}</a></p>
      <img src={profile.qrCodeUrl} alt="QR Code" />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  return { props: { id } };
}
