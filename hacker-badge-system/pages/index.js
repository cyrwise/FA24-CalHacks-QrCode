import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    fullName: '',
    university: '',
    major: '',
    graduationDate: '',
    github: '',
  });

  const [badge, setBadge] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/badges', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const result = await res.json();
    setBadge(result);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          required
        />
        <input
          type="text"
          name="university"
          value={formData.university}
          onChange={handleChange}
          placeholder="University"
          required
        />
        <input
          type="text"
          name="major"
          value={formData.major}
          onChange={handleChange}
          placeholder="Major"
          required
        />
        <input
          type="date"
          name="graduationDate"
          value={formData.graduationDate}
          onChange={handleChange}
          required
          placeholder="Expected Graduation Date"
        />
        <input
          type="url"
          name="github"
          value={formData.github}
          onChange={handleChange}
          placeholder="GitHub URL"
          required
        />
        <button type="submit">Generate Badge</button>
      </form>

      {badge && (
        <div>
          <h2>Your Badge</h2>
          <p>Name: {badge.fullName}</p>
          <p>University: {badge.university}</p>
          <p>Major: {badge.major}</p>
          <p>Graduation Date: {new Date(badge.graduationDate).toLocaleDateString()}</p>
          <p>GitHub: <a href={badge.github}>{badge.github}</a></p>
          <img src={badge.qrCodeUrl} alt="QR Code" />
        </div>
      )}
    </div>
  );
}
