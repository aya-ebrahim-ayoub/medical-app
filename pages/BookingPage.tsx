
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Award, Star, BookOpen, Quote } from 'lucide-react';
import { api } from '../services/api';
import { Doctor, User } from '../types';

export const BookingPage: React.FC<{ user: User | null }> = ({ user }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadDoctor();
  }, [id]);

  const loadDoctor = async () => {
    const doctors = await api.getDoctors();
    const found = doctors.find(d => d.id === id);
    if (found) setDoctor(found);
    setLoading(false);
  };

  const handleBooking = async () => {
    if (!user) {
      navigate('/login?redirect=book/' + id);
      return;
    }
    if (!selectedSlot || !doctor) return;
    setIsSubmitting(true);
    try {
      await api.bookAppointment({
        patientId: user.id,
        patientName: user.name,
        doctorId: doctor.id,
        doctorName: doctor.name,
        date: selectedSlot.date,
        time: selectedSlot.time,
        reason: reason
      });
      setSuccess(true);
      setTimeout(() => navigate('/patient-dashboard'), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
  
  if (!doctor) return <div className="p-20 text-center text-gray-500 font-black">Doctor not found.</div>;

  if (success) {
    return (
      <div className="max-w-md mx-auto mt-20 p-10 bg-white rounded-[40px] shadow-2xl text-center border border-gray-100">
        <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <CheckCircle2 className="text-green-600 w-12 h-12" />
        </div>
        <h2 className="text-3xl font-black mb-3 text-gray-900">Booking Confirmed!</h2>
        <p className="text-gray-500 mb-8 font-medium">Your medical consultation with {doctor.name} is successfully scheduled.</p>
        <button onClick={() => navigate('/patient-dashboard')} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">View My Dashboard</button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-3 text-gray-400 hover:text-blue-600 mb-10 font-black transition-all group"
      >
        <div className="bg-white p-2.5 rounded-xl border border-gray-100 group-hover:border-blue-100 shadow-sm"><ArrowLeft size={20} /></div> 
        Back to Specialists
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Extensive Doctor Profile & Bio */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50/50 rounded-bl-[150px] -z-0"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row gap-10 items-start md:items-center mb-10">
                <div className="relative">
                   <img 
                    src={doctor.avatar || `https://picsum.photos/seed/${doctor.id}/200/200`} 
                    className="w-44 h-44 rounded-3xl object-cover shadow-2xl border-8 border-white" 
                    alt={doctor.name} 
                  />
                  <div className="absolute -bottom-3 -right-3 bg-green-500 text-white p-2 rounded-xl border-4 border-white shadow-lg">
                    <ShieldCheck size={20} />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="px-3.5 py-1 bg-blue-600 text-white text-[10px] font-black rounded-full uppercase tracking-[0.15em] shadow-md shadow-blue-100">Expert Specialist</span>
                    <div className="flex items-center gap-1.5 text-yellow-500 font-black px-3 py-1 bg-yellow-50 rounded-full border border-yellow-100">
                      <Star size={16} fill="currentColor" /> {doctor.rating}
                    </div>
                  </div>
                  <h1 className="text-4xl font-black text-gray-900 mb-1 leading-tight">{doctor.name}</h1>
                  <p className="text-2xl text-blue-600 font-black mb-6">{doctor.specialty}</p>
                  
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100 shadow-sm">
                      <Award className="text-blue-500" size={20} />
                      <span className="text-sm font-black text-gray-700">{doctor.experience}+ Years Practice</span>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100 shadow-sm">
                      <BookOpen className="text-indigo-500" size={20} />
                      <span className="text-sm font-black text-gray-700">Board Certified</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8 border-t border-gray-50 pt-10">
                <div>
                  <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                    <Quote className="text-blue-200" size={32} /> Professional Biography
                  </h3>
                  <div className="bg-blue-50/30 p-8 rounded-[32px] border border-blue-100/50">
                    <p className="text-gray-700 leading-relaxed text-lg font-medium italic">
                      "{doctor.about}"
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-sm">
                    <h4 className="font-black text-gray-900 mb-4 text-sm uppercase tracking-widest border-b border-gray-50 pb-3">Clinical Focus</h4>
                    <ul className="space-y-3 text-sm font-medium text-gray-600">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Advanced Diagnostic Procedures
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Evidence-Based Medical Therapy
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Patient-Centered Chronic Care
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-sm">
                    <h4 className="font-black text-gray-900 mb-4 text-sm uppercase tracking-widest border-b border-gray-50 pb-3">Qualifications</h4>
                    <ul className="space-y-3 text-sm font-medium text-gray-600">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> MD from Top Medical University
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Specialist Training Fellowship
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> International Medical License
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Booking Widget */}
        <div className="lg:col-span-4">
          <div className="bg-white p-8 rounded-[40px] shadow-2xl border border-gray-100 sticky top-24">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-50">
              <h3 className="text-xl font-black text-gray-900">Book Session</h3>
              <div className="text-right">
                <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] block mb-1">Fee</span>
                <span className="text-3xl font-black text-gray-900">${doctor.consultationFee}</span>
              </div>
            </div>
            
            <label className="block text-xs font-black text-gray-400 mb-5 uppercase tracking-[0.2em]">Select Time Slot</label>
            <div className="grid grid-cols-2 gap-3.5 mb-8">
              {doctor.slots.length > 0 ? (
                doctor.slots.map(slot => (
                  <button
                    key={slot.id}
                    disabled={slot.isBooked}
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-4 rounded-2xl text-center transition-all border-2 flex flex-col items-center justify-center gap-1 ${
                      selectedSlot?.id === slot.id 
                        ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-lg scale-[1.05]' 
                        : slot.isBooked 
                          ? 'border-gray-50 bg-gray-50 text-gray-300 cursor-not-allowed'
                          : 'border-gray-50 hover:border-blue-200 hover:bg-white hover:shadow-md'
                    }`}
                  >
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{slot.date}</div>
                    <div className="text-sm font-black">{slot.time}</div>
                  </button>
                ))
              ) : (
                <div className="col-span-full py-10 text-center text-gray-300 font-black bg-gray-50 rounded-3xl">No Slots Today</div>
              )}
            </div>

            <div className="mb-8">
              <label className="block text-xs font-black text-gray-400 mb-4 uppercase tracking-[0.2em]">Primary Symptom</label>
              <textarea 
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Briefly describe your health concern..."
                className="w-full bg-gray-50 border-none rounded-2xl p-5 focus:ring-2 focus:ring-blue-500 h-28 text-sm font-bold placeholder:text-gray-300"
              />
            </div>

            <button 
              onClick={handleBooking}
              disabled={!selectedSlot || isSubmitting}
              className="w-full bg-blue-600 text-white py-5 rounded-3xl font-black hover:bg-blue-700 transition-all shadow-2xl shadow-blue-100 disabled:opacity-40 disabled:shadow-none flex items-center justify-center gap-3 group"
            >
              {isSubmitting ? 'Confirming...' : (
                <>
                  Secure Appointment <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            
            <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-gray-400 font-black uppercase tracking-widest">
              <ShieldCheck size={14} className="text-green-500" /> Secure Payment & Data
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
