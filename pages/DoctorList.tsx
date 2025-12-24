
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Filter, Star, MapPin, Clock, ArrowRight, UserCircle } from 'lucide-react';
import { api } from '../services/api';
import { Doctor } from '../types';
import { SPECIALTIES } from '../constants';
import { GoogleGenAI, Type } from "@google/genai";

export const DoctorList: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const navigate = useNavigate();

  // AI Assistant State
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiRecommendation, setAiRecommendation] = useState<{ specialty: string; reason: string } | null>(null);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const data = await api.getDoctors();
      setDoctors(data);
      setFilteredDoctors(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = doctors;
    if (searchTerm) {
      result = result.filter(d => 
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedSpecialty !== 'All') {
      result = result.filter(d => d.specialty === selectedSpecialty);
    }
    setFilteredDoctors(result);
  }, [searchTerm, selectedSpecialty, doctors]);

  const handleAiAssistant = async () => {
    if (!aiPrompt.trim()) return;
    setAiLoading(true);
    setAiRecommendation(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Given these symptoms: "${aiPrompt}", which of the following medical specialties is most appropriate? ${SPECIALTIES.join(', ')}. Return the recommendation in JSON format with "specialty" and "reason" fields.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              specialty: { type: Type.STRING },
              reason: { type: Type.STRING }
            },
            required: ['specialty', 'reason']
          }
        }
      });
      
      const result = JSON.parse(response.text || '{}');
      setAiRecommendation(result);
      if (SPECIALTIES.includes(result.specialty)) {
        setSelectedSpecialty(result.specialty);
      }
    } catch (err) {
      console.error("AI Error:", err);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Meet Our Specialists</h1>
        <p className="mt-4 text-xl text-gray-500">Find the right medical care tailored to your needs.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Filter size={18} className="text-blue-600" /> Filters
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Name</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Doctor name..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all font-medium" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                <select 
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                >
                  <option value="All">All Specialties</option>
                  {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            {/* AI Assistant Card - Integrated into Sidebar */}
            <div className="mt-10 bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-lg text-white">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <span className="bg-white/20 p-1 rounded">✨</span> AI Guide
              </h3>
              <p className="text-blue-100 text-xs mb-4">Unsure? Describe your symptoms below.</p>
              <textarea 
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="e.g. My child has a persistent fever..."
                className="w-full bg-white/10 border-white/20 rounded-xl p-3 text-xs placeholder:text-blue-200 focus:ring-2 focus:ring-white mb-3"
                rows={3}
              />
              <button 
                onClick={handleAiAssistant}
                disabled={aiLoading}
                className="w-full bg-white text-blue-700 py-2 rounded-xl text-xs font-bold hover:bg-blue-50 transition-colors disabled:opacity-50"
              >
                {aiLoading ? 'Analyzing...' : 'Identify Specialty'}
              </button>
              {aiRecommendation && (
                <div className="mt-4 p-3 bg-white/10 rounded-xl text-[10px] leading-relaxed animate-in fade-in slide-in-from-top-2">
                  <p className="font-bold mb-1">Recommended: {aiRecommendation.specialty}</p>
                  <p className="text-blue-100">{aiRecommendation.reason}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Doctor Grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="bg-white p-6 h-64 rounded-3xl animate-pulse border border-gray-100"></div>
              ))}
            </div>
          ) : filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDoctors.map(doctor => (
                <div 
                  key={doctor.id} 
                  onClick={() => navigate(`/book/${doctor.id}`)}
                  className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all cursor-pointer group hover:-translate-y-1 relative overflow-hidden"
                >
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-[60px] -z-0 opacity-40 group-hover:bg-blue-100 transition-colors"></div>
                  
                  <div className="relative z-10 flex gap-5">
                    <img 
                      src={doctor.avatar || `https://picsum.photos/seed/${doctor.id}/200/200`} 
                      className="w-24 h-24 rounded-2xl object-cover shadow-md group-hover:scale-105 transition-transform border-2 border-white" 
                      alt={doctor.name} 
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-600 text-[10px] uppercase font-black rounded-full tracking-wider">
                          {doctor.specialty}
                        </span>
                        <div className="flex items-center gap-1 text-yellow-500 font-black text-sm">
                          <Star size={14} fill="currentColor" /> {doctor.rating}
                        </div>
                      </div>
                      <h4 className="text-xl font-black text-gray-900 mb-1 truncate">{doctor.name}</h4>
                      <p className="text-sm font-bold text-blue-600/80 mb-3">{doctor.specialty}</p>
                      
                      <div className="flex items-center gap-3 text-gray-400 text-[11px] font-bold uppercase tracking-tight">
                        <div className="flex items-center gap-1"><Clock size={12} /> {doctor.experience} Yrs Exp</div>
                        <div className="flex items-center gap-1"><MapPin size={12} /> Main Hub</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-5 border-t border-gray-50 flex items-center justify-between relative z-10">
                    <div>
                      <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest block mb-0.5">Session Fee</span>
                      <p className="text-2xl font-black text-gray-900">${doctor.consultationFee}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-2xl font-black text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 group-hover:shadow-blue-200">
                      View Profile <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <UserCircle className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-bold">No doctors found matching your criteria.</p>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedSpecialty('All');}}
                className="mt-4 text-blue-600 font-black hover:underline underline-offset-4"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
