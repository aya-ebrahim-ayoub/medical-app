
import { User, Doctor, Appointment, AuthState, UserRole } from '../types';
import { MOCK_DOCTORS } from '../constants';

const STORAGE_KEYS = {
  USERS: 'mc_users',
  DOCTORS: 'mc_doctors',
  APPOINTMENTS: 'mc_appointments',
  AUTH: 'mc_auth'
};

// Initialization
// We check if we need to update the doctor list (either it doesn't exist or it's just the basic 2)
const existingDocs = JSON.parse(localStorage.getItem(STORAGE_KEYS.DOCTORS) || '[]');
if (existingDocs.length < MOCK_DOCTORS.length) {
  localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(MOCK_DOCTORS));
}

if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([
    { id: 'admin1', name: 'Admin User', email: 'admin@med.com', password: 'password', role: 'ADMIN' },
    { id: 'patient1', name: 'John Doe', email: 'john@doe.com', password: 'password', role: 'PATIENT' },
    { id: 'doc1', name: 'Dr. Sarah Wilson', email: 'sarah.wilson@medconnect.com', password: 'password', role: 'DOCTOR' },
  ]));
}
if (!localStorage.getItem(STORAGE_KEYS.APPOINTMENTS)) {
  localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify([]));
}

export const api = {
  // Auth
  login: async (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
        const user = users.find((u: any) => u.email === email && u.password === password);
        if (user) {
          const { password, ...userWithoutPassword } = user;
          localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(userWithoutPassword));
          resolve(userWithoutPassword);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 800);
    });
  },

  register: async (userData: any): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
        const newUser = { ...userData, id: 'u' + Date.now() };
        users.push(newUser);
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
        const { password, ...userWithoutPassword } = newUser;
        localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(userWithoutPassword));
        resolve(userWithoutPassword);
      }, 800);
    });
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  },

  getDoctors: async (): Promise<Doctor[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const doctors = JSON.parse(localStorage.getItem(STORAGE_KEYS.DOCTORS) || '[]');
        resolve(doctors);
      }, 500);
    });
  },

  addDoctor: async (doctorData: Partial<Doctor>): Promise<Doctor> => {
    const doctors = JSON.parse(localStorage.getItem(STORAGE_KEYS.DOCTORS) || '[]');
    const newDoctor = {
      ...doctorData,
      id: 'doc' + Date.now(),
      role: 'DOCTOR',
      rating: 5.0,
      slots: []
    } as Doctor;
    doctors.push(newDoctor);
    localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(doctors));
    return newDoctor;
  },

  deleteDoctor: async (id: string): Promise<void> => {
    const doctors = JSON.parse(localStorage.getItem(STORAGE_KEYS.DOCTORS) || '[]');
    const updated = doctors.filter((d: Doctor) => d.id !== id);
    localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(updated));
  },

  // Appointments
  getAppointments: async (role: UserRole, id: string): Promise<Appointment[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPOINTMENTS) || '[]');
        if (role === 'ADMIN') resolve(all);
        if (role === 'PATIENT') resolve(all.filter((a: Appointment) => a.patientId === id));
        if (role === 'DOCTOR') resolve(all.filter((a: Appointment) => a.doctorId === id));
        resolve([]);
      }, 600);
    });
  },

  bookAppointment: async (booking: any): Promise<Appointment> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPOINTMENTS) || '[]');
        const newAppointment: Appointment = {
          ...booking,
          id: 'apt' + Date.now(),
          status: 'PENDING',
          createdAt: new Date().toISOString()
        };
        all.push(newAppointment);
        localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(all));
        
        // Update Doctor Slot status
        const doctors = JSON.parse(localStorage.getItem(STORAGE_KEYS.DOCTORS) || '[]');
        const doctor = doctors.find((d: Doctor) => d.id === booking.doctorId);
        if (doctor) {
          const slot = doctor.slots.find((s: any) => s.time === booking.time && s.date === booking.date);
          if (slot) slot.isBooked = true;
          localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(doctors));
        }

        resolve(newAppointment);
      }, 800);
    });
  },

  updateAppointmentStatus: async (id: string, status: Appointment['status']): Promise<void> => {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPOINTMENTS) || '[]');
    const index = all.findIndex((a: Appointment) => a.id === id);
    if (index !== -1) {
      all[index].status = status;
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(all));
    }
  }
};
