
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Doctor, Appointment, User } from '../types';
import { Users, UserPlus, Trash2, Check, X, Calendar, ClipboardList } from 'lucide-react';
import { SPECIALTIES } from '../constants';

export const AdminDashboard: React.FC<{ user: User }> = ({ user }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDoc, setShowAddDoc] = useState(false);
  const [newDoc, setNewDoc] = useState({ name: '', specialty: SPECIALTIES[0], email: '', experience: 5, consultationFee: 100, about: '' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const docs = await api.getDoctors();
    const apts = await api.getAppointments('ADMIN', '');
    setDoctors(docs);
    setAppointments(apts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    setLoading(false);
  };

  const handleAddDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.addDoctor(newDoc);
    setShowAddDoc(false);
    loadData();
  };

  const handleDeleteDoctor = async (id: string) => {
    if (confirm('Are you sure you want to remove this doctor?')) {
      await api.deleteDoctor(id);
      loadData();
    }
  };

  const handleAptStatus = async (id: string, status: Appointment['status']) => {
    await api.updateAppointmentStatus(id, status);
    loadData();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500">Manage clinic resources, doctors, and all patient bookings.</p>
        </div>
        <button 
          onClick={() => setShowAddDoc(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all"
        >
          <UserPlus size={20} /> Add Doctor
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-2xl text-blue-600"><Users size={24} /></div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{doctors.length}</div>
            <div className="text-sm text-gray-500">Total Doctors</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-2xl text-green-600"><Calendar size={24} /></div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{appointments.length}</div>
            <div className="text-sm text-gray-500">Total Bookings</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-yellow-100 p-3 rounded-2xl text-yellow-600"><ClipboardList size={24} /></div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{appointments.filter(a => a.status === 'PENDING').length}</div>
            <div className="text-sm text-gray-500">Pending Approvals</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Doctors Management */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2"><Users className="text-blue-600" /> Doctors Registry</h3>
          <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Doctor</th>
                  <th className="px-6 py-4">Specialty</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {doctors.map(doc => (
                  <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={doc.avatar || `https://picsum.photos/seed/${doc.id}/40/40`} className="w-10 h-10 rounded-xl" />
                        <div className="font-bold text-gray-900">{doc.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{doc.specialty}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDeleteDoctor(doc.id)} className="text-red-400 hover:text-red-600 p-2"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Appointments */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2"><Calendar className="text-blue-600" /> Appointment Management</h3>
          <div className="space-y-4">
            {appointments.slice(0, 10).map(apt => (
              <div key={apt.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                  <div className="font-bold text-gray-900">{apt.patientName} <span className="text-gray-400 font-normal">with</span> {apt.doctorName}</div>
                  <div className="text-xs text-gray-500 mt-1">{apt.date} • {apt.time}</div>
                </div>
                <div className="flex items-center gap-2">
                  {apt.status === 'PENDING' ? (
                    <>
                      <button onClick={() => handleAptStatus(apt.id, 'CONFIRMED')} className="bg-green-100 text-green-600 p-2 rounded-xl hover:bg-green-200 transition-colors"><Check size={18} /></button>
                      <button onClick={() => handleAptStatus(apt.id, 'REJECTED')} className="bg-red-100 text-red-600 p-2 rounded-xl hover:bg-red-200 transition-colors"><X size={18} /></button>
                    </>
                  ) : (
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 px-3 py-1 bg-gray-50 rounded-full">{apt.status}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Add Doctor */}
      {showAddDoc && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Register New Doctor</h3>
              <button onClick={() => setShowAddDoc(false)}><X /></button>
            </div>
            <form onSubmit={handleAddDoctor} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">Full Name</label>
                <input required type="text" className="w-full bg-gray-50 border-none rounded-xl px-4 py-2" onChange={e => setNewDoc({...newDoc, name: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1">Specialty</label>
                  <select className="w-full bg-gray-50 border-none rounded-xl px-4 py-2" onChange={e => setNewDoc({...newDoc, specialty: e.target.value})}>
                    {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Consultation Fee ($)</label>
                  <input required type="number" className="w-full bg-gray-50 border-none rounded-xl px-4 py-2" onChange={e => setNewDoc({...newDoc, consultationFee: parseInt(e.target.value)})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Email</label>
                <input required type="email" className="w-full bg-gray-50 border-none rounded-xl px-4 py-2" onChange={e => setNewDoc({...newDoc, email: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">About Bio</label>
                <textarea className="w-full bg-gray-50 border-none rounded-xl px-4 py-2 h-24" onChange={e => setNewDoc({...newDoc, about: e.target.value})} />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition-colors">Add Doctor Account</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
