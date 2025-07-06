import React, { useState, useEffect } from 'react';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  email: string;
}

function UsersPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([
    { id: 1, name: 'Dr. John Doe', specialty: 'General Practitioner', email: 'john.doe@example.com' },
    { id: 2, name: 'Dr. Jane Smith', specialty: 'Pediatrician', email: 'jane.smith@example.com' },
  ]);
  const [newDoctorName, setNewDoctorName] = useState('');
  const [newDoctorSpecialty, setNewDoctorSpecialty] = useState('');
  const [newDoctorEmail, setNewDoctorEmail] = useState('');
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

  const handleAddDoctor = () => {
    if (newDoctorName && newDoctorSpecialty && newDoctorEmail) {
      const newDoctor: Doctor = {
        id: doctors.length > 0 ? Math.max(...doctors.map(d => d.id)) + 1 : 1,
        name: newDoctorName,
        specialty: newDoctorSpecialty,
        email: newDoctorEmail,
      };
      setDoctors([...doctors, newDoctor]);
      setNewDoctorName('');
      setNewDoctorSpecialty('');
      setNewDoctorEmail('');
    } else {
      alert('Please fill in all fields for the new doctor.');
    }
  };

  const handleEditDoctor = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setNewDoctorName(doctor.name);
    setNewDoctorSpecialty(doctor.specialty);
    setNewDoctorEmail(doctor.email);
  };

  const handleUpdateDoctor = () => {
    if (editingDoctor && newDoctorName && newDoctorSpecialty && newDoctorEmail) {
      setDoctors(doctors.map(doc =>
        doc.id === editingDoctor.id
          ? { ...doc, name: newDoctorName, specialty: newDoctorSpecialty, email: newDoctorEmail }
          : doc
      ));
      setEditingDoctor(null);
      setNewDoctorName('');
      setNewDoctorSpecialty('');
      setNewDoctorEmail('');
    } else {
      alert('Please fill in all fields for the doctor.');
    }
  };

  const handleDeleteDoctor = (id: number) => {
    setDoctors(doctors.filter(doctor => doctor.id !== id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Manage Doctors</h1>

      <div style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
        <h2>{editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}</h2>
        <input
          type="text"
          placeholder="Doctor Name"
          value={newDoctorName}
          onChange={(e) => setNewDoctorName(e.target.value)}
          style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
        />
        <input
          type="text"
          placeholder="Specialty"
          value={newDoctorSpecialty}
          onChange={(e) => setNewDoctorSpecialty(e.target.value)}
          style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={newDoctorEmail}
          onChange={(e) => setNewDoctorEmail(e.target.value)}
          style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
        />
        {editingDoctor ? (
          <button onClick={handleUpdateDoctor} style={{ padding: '10px 15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Update Doctor</button>
        ) : (
          <button onClick={handleAddDoctor} style={{ padding: '10px 15px', backgroundColor: '#008CBA', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Add Doctor</button>
        )}
        {editingDoctor && (
          <button onClick={() => {
            setEditingDoctor(null);
            setNewDoctorName('');
            setNewDoctorSpecialty('');
            setNewDoctorEmail('');
          }} style={{ padding: '10px 15px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }}>Cancel Edit</button>
        )}
      </div>

      <h2>Existing Doctors</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Specialty</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{doctor.id}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{doctor.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{doctor.specialty}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{doctor.email}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <button onClick={() => handleEditDoctor(doctor)} style={{ padding: '5px 10px', backgroundColor: '#ffc107', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', marginRight: '5px' }}>Edit</button>
                <button onClick={() => handleDeleteDoctor(doctor.id)} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersPage;