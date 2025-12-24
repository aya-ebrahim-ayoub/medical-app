
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Appointment, User } from '../types';
import { Calendar, Clock, CheckCircle, XCircle, User as UserIcon, MessageSquare } from 'lucide-react';

export const DoctorDashboard: React.FC<{ user: User }> = ({ user }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    const data = await api.getAppointments('DOCTOR', user.id);
    setAppointments(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    setLoading(false);
  };

  const handleStatusUpdate = async (id: string, status: Appointment['status']) => {
    await api.updateAppointmentStatus(id, status);
    loadAppointments();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900">Physician Control Panel</h1>
        <p className="text-gray-500">Welcome back, {user.name}. Manage your patient appointments and medical reviews.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2"><Calendar className="text-blue-600" /> Patient Schedule</h3>
            <span className="text-sm font-medium text-gray-500">{appointments.length} Total Visits</span>
          </div>

          <div className="space-y-4">
            {loading ? (
               <div className="animate-pulse space-y-4">
                 {[1,2,3].map(i => <div key={i} className="h-24 bg-gray-100 rounded-3xl"></div>)}
               </div>
            ) : appointments.length > 0 ? (
              appointments.map(apt => (
                <div key={apt.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6">
                  <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center shrink-0">
                    <UserIcon className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-lg">{apt.patientName}</h4>
                    <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mt-1">
                      <span className="flex items-center gap-1"><Clock size={14} /> {apt.time}</span>
                      <span className="flex items-center gap-1"><Calendar size={14} /> {apt.date}</span>
                    </div>
                    {apt.reason && <p className="text-xs text-gray-400 mt-2 line-clamp-1 italic">"{apt.reason}"</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    {apt.status === 'PENDING' ? (
                      <>
                        <button 
                          onClick={() => handleStatusUpdate(apt.id, 'CONFIRMED')}
                          className="bg-green-100 text-green-600 p-3 rounded-2xl hover:bg-green-200 transition-colors"
                          title="Confirm Appointment"
                        >
                          <CheckCircle size={20} />
                        </button>
                        <button 
                          onClick={() => handleStatusUpdate(apt.id, 'REJECTED')}
                          className="bg-red-100 text-red-600 p-3 rounded-2xl hover:bg-red-200 transition-colors"
                          title="Decline"
                        >
                          <XCircle size={20} />
                        </button>
                      </>
                    ) : (
                      <div className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider ${
                        apt.status === 'CONFIRMED' ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-400'
                      }`}>
                        {apt.status}
                      </div>
                    )}
                    <button className="p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                      <MessageSquare size={20} className="text-gray-400" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <p className="text-gray-500">No appointments scheduled yet.</p>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
           <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-3xl text-white shadow-xl">
             <h3 className="text-xl font-bold mb-4">Availability Status</h3>
             <div className="space-y-4">
               <div className="flex items-center justify-between">
                 <span>Accepting Appointments</span>
                 <div className="w-12 h-6 bg-white/20 rounded-full relative p-1 cursor-pointer">
                   <div className="w-4 h-4 bg-white rounded-full translate-x-6 transition-transform"></div>
                 </div>
               </div>
               <div className="pt-4 border-t border-white/10 text-sm text-indigo-100">
                 You have 3 new appointment requests pending review.
               </div>
             </div>
           </div>

           <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
             <h3 className="font-bold mb-4">Weekly Performance</h3>
             <div className="space-y-4">
               <div className="flex justify-between items-end h-24 gap-2">
                 {[40, 70, 45, 90, 65, 30, 10].map((h, i) => (
                   <div key={i} className="flex-1 bg-blue-100 rounded-t-lg relative group">
                     <div className="bg-blue-600 absolute bottom-0 w-full rounded-t-lg transition-all" style={{height: `${h}%`}}></div>
                     <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-blue-600">
                       {h}%
                     </div>
                   </div>
                 ))}
               </div>
               <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                 <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};
