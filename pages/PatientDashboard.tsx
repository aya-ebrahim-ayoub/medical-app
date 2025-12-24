
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Appointment, User } from '../types';
import { Calendar, Clock, MapPin, User as UserIcon, XCircle, AlertCircle } from 'lucide-react';

export const PatientDashboard: React.FC<{ user: User }> = ({ user }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    const data = await api.getAppointments('PATIENT', user.id);
    setAppointments(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    setLoading(false);
  };

  const handleCancel = async (id: string) => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      await api.updateAppointmentStatus(id, 'CANCELLED');
      loadAppointments();
    }
  };

  const StatusBadge = ({ status }: { status: Appointment['status'] }) => {
    const styles: Record<string, string> = {
      PENDING: 'bg-yellow-100 text-yellow-700',
      CONFIRMED: 'bg-green-100 text-green-700',
      REJECTED: 'bg-red-100 text-red-700',
      CANCELLED: 'bg-gray-100 text-gray-700',
      COMPLETED: 'bg-blue-100 text-blue-700',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Welcome, {user.name}</h1>
          <p className="text-gray-500 mt-1">Manage your clinic visits and medical history.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="bg-blue-100 p-2 rounded-xl"><Calendar className="text-blue-600" /></div>
          <div>
            <div className="text-sm font-bold text-gray-900">{appointments.length}</div>
            <div className="text-xs text-gray-500">Total Appointments</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="h-32 bg-gray-100 rounded-2xl animate-pulse"></div>)}
          </div>
        ) : appointments.length > 0 ? (
          appointments.map(apt => (
            <div key={apt.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 md:items-center">
                <div className="bg-blue-50 w-20 h-20 rounded-2xl flex items-center justify-center shrink-0">
                  <UserIcon className="text-blue-600 w-10 h-10" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-bold text-gray-900">{apt.doctorName}</h3>
                    <StatusBadge status={apt.status} />
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1.5"><Calendar size={16} /> {apt.date}</div>
                    <div className="flex items-center gap-1.5"><Clock size={16} /> {apt.time}</div>
                    <div className="flex items-center gap-1.5"><MapPin size={16} /> Central Medical Center</div>
                  </div>
                  {apt.reason && (
                    <div className="mt-2 text-sm text-gray-600 italic">
                      "Reason: {apt.reason}"
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {apt.status === 'PENDING' && (
                    <button 
                      onClick={() => handleCancel(apt.id)}
                      className="flex items-center gap-2 text-red-600 font-bold hover:bg-red-50 px-4 py-2 rounded-xl transition-colors"
                    >
                      <XCircle size={18} /> Cancel
                    </button>
                  )}
                  <button className="bg-gray-50 text-gray-700 px-6 py-2 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No appointments yet</h3>
            <p className="text-gray-500 mb-6">Start your healthcare journey today.</p>
            <a href="#/doctors" className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-colors">
              Find a Doctor
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
