
export type UserRole = 'PATIENT' | 'DOCTOR' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Doctor extends User {
  specialty: string;
  experience: number;
  about: string;
  rating: number;
  consultationFee: number;
  availableDays: string[];
  slots: TimeSlot[];
}

export interface TimeSlot {
  id: string;
  time: string;
  isBooked: boolean;
  date: string;
}

export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'REJECTED' | 'CANCELLED' | 'COMPLETED';

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  patientName: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  reason?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
