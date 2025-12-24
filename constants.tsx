
import React from 'react';
import { Stethoscope, ShieldCheck, Clock, Users } from 'lucide-react';

export const SPECIALTIES = [
  'General Physician',
  'Cardiologist',
  'Dermatologist',
  'Pediatrician',
  'Neurologist',
  'Orthopedic',
  'Gynecologist',
  'Dentist'
];

export const FEATURES = [
  {
    title: 'Top Specialists',
    description: 'Connect with highly qualified doctors across 20+ specialties.',
    icon: <Stethoscope className="w-6 h-6 text-blue-600" />
  },
  {
    title: 'Easy Booking',
    description: 'Book your appointment in just a few clicks with real-time slot availability.',
    icon: <Clock className="w-6 h-6 text-blue-600" />
  },
  {
    title: 'Secure & Private',
    description: 'Your medical data is encrypted and handled with the highest security standards.',
    icon: <ShieldCheck className="w-6 h-6 text-blue-600" />
  },
  {
    title: 'Admin Dashboard',
    description: 'Comprehensive management tools for clinic administrators.',
    icon: <Users className="w-6 h-6 text-blue-600" />
  }
];

export const MOCK_DOCTORS = [
  {
    id: 'doc1',
    name: 'Dr. Sarah Wilson',
    email: 'sarah.wilson@medconnect.com',
    role: 'DOCTOR' as const,
    specialty: 'Cardiologist',
    experience: 12,
    about: 'Dr. Sarah Wilson is a highly regarded cardiologist with over 12 years of experience in cardiovascular health. She specializes in preventive cardiology and manages conditions like hypertension and heart rhythm disorders. Her approach combines advanced medical therapy with lifestyle interventions to ensure long-term heart health for her patients.',
    rating: 4.9,
    consultationFee: 150,
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    slots: [
      { id: 's1', time: '09:00 AM', isBooked: false, date: '2024-05-20' },
      { id: 's2', time: '10:30 AM', isBooked: false, date: '2024-05-20' },
      { id: 's3', time: '02:00 PM', isBooked: false, date: '2024-05-20' }
    ],
    avatar: 'https://picsum.photos/seed/doctor1/200/200'
  },
  {
    id: 'doc2',
    name: 'Dr. James Miller',
    email: 'james.miller@medconnect.com',
    role: 'DOCTOR' as const,
    specialty: 'Dermatologist',
    experience: 8,
    about: 'Dr. James Miller specializes in clinical and surgical dermatology. His expertise includes treating skin cancer, acne, and chronic skin conditions with the latest dermatological technologies. He is committed to providing personalized skin care plans that address both medical and aesthetic concerns, helping patients achieve healthy and radiant skin.',
    rating: 4.7,
    consultationFee: 120,
    availableDays: ['Tuesday', 'Thursday'],
    slots: [
      { id: 's4', time: '11:00 AM', isBooked: false, date: '2024-05-21' },
      { id: 's5', time: '03:00 PM', isBooked: false, date: '2024-05-21' }
    ],
    avatar: 'https://picsum.photos/seed/doctor2/200/200'
  },
  {
    id: 'doc3',
    name: 'Dr. Emily Chen',
    email: 'emily.chen@medconnect.com',
    role: 'DOCTOR' as const,
    specialty: 'Pediatrician',
    experience: 10,
    about: 'Dr. Emily Chen provides compassionate pediatric care for infants through adolescents. She is known for her gentle approach and focus on nutritional health and developmental milestones. Her clinic is designed to be a child-friendly environment where young patients feel safe and parents feel heard and supported.',
    rating: 5.0,
    consultationFee: 100,
    availableDays: ['Monday', 'Tuesday', 'Wednesday'],
    slots: [
      { id: 's6', time: '08:30 AM', isBooked: false, date: '2024-05-20' },
      { id: 's7', time: '11:00 AM', isBooked: false, date: '2024-05-20' },
      { id: 's8', time: '01:30 PM', isBooked: false, date: '2024-05-20' }
    ],
    avatar: 'https://picsum.photos/seed/doctor3/200/200'
  },
  {
    id: 'doc4',
    name: 'Dr. Michael Ross',
    email: 'michael.ross@medconnect.com',
    role: 'DOCTOR' as const,
    specialty: 'Neurologist',
    experience: 15,
    about: 'Dr. Michael Ross is a board-certified neurologist specializing in disorders of the central nervous system. He has extensive research background in migraine management and sleep medicine. He believes in a comprehensive diagnostic approach to uncover the root cause of neurological symptoms, ensuring targeted and effective treatment.',
    rating: 4.8,
    consultationFee: 200,
    availableDays: ['Wednesday', 'Thursday', 'Friday'],
    slots: [
      { id: 's9', time: '10:00 AM', isBooked: false, date: '2024-05-22' },
      { id: 's10', time: '03:00 PM', isBooked: false, date: '2024-05-22' }
    ],
    avatar: 'https://picsum.photos/seed/doctor4/200/200'
  },
  {
    id: 'doc5',
    name: 'Dr. Aisha Khan',
    email: 'aisha.khan@medconnect.com',
    role: 'DOCTOR' as const,
    specialty: 'General Physician',
    experience: 7,
    about: 'Dr. Aisha Khan is dedicated to family wellness and primary care. She focuses on long-term health management and coordinates complex care for chronic diseases. Her goal is to build lasting relationships with patients to manage their overall well-being throughout their life stages.',
    rating: 4.6,
    consultationFee: 80,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    slots: [
      { id: 's11', time: '09:00 AM', isBooked: false, date: '2024-05-20' },
      { id: 's12', time: '10:00 AM', isBooked: false, date: '2024-05-20' },
      { id: 's13', time: '11:00 AM', isBooked: false, date: '2024-05-20' }
    ],
    avatar: 'https://picsum.photos/seed/doctor5/200/200'
  },
  {
    id: 'doc6',
    name: 'Dr. Robert Brown',
    email: 'robert.brown@medconnect.com',
    role: 'DOCTOR' as const,
    specialty: 'Orthopedic',
    experience: 11,
    about: 'Dr. Robert Brown specializes in musculoskeletal conditions. He has treated numerous professional athletes for ligament repairs and joint injuries. Using minimally invasive techniques, he aims to restore mobility and function as quickly as possible for his patients.',
    rating: 4.9,
    consultationFee: 160,
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    slots: [
      { id: 's14', time: '12:00 PM', isBooked: false, date: '2024-05-21' },
      { id: 's15', time: '04:00 PM', isBooked: false, date: '2024-05-21' }
    ],
    avatar: 'https://picsum.photos/seed/doctor6/200/200'
  },
  {
    id: 'doc7',
    name: 'Dr. Maria Garcia',
    email: 'maria.garcia@medconnect.com',
    role: 'DOCTOR' as const,
    specialty: 'Gynecologist',
    experience: 14,
    about: 'Dr. Maria Garcia provides expert care in obstetrics and gynecology. She is a champion for maternal health and minimally invasive gynecological surgeries. Her practice focuses on empowering women through education and high-quality clinical care at every stage of their life.',
    rating: 4.7,
    consultationFee: 130,
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    slots: [
      { id: 's16', time: '08:00 AM', isBooked: false, date: '2024-05-20' },
      { id: 's17', time: '12:30 PM', isBooked: false, date: '2024-05-20' }
    ],
    avatar: 'https://picsum.photos/seed/doctor7/200/200'
  },
  {
    id: 'doc8',
    name: 'Dr. David Lee',
    email: 'david.lee@medconnect.com',
    role: 'DOCTOR' as const,
    specialty: 'Dentist',
    experience: 9,
    about: 'Dr. David Lee focuses on preventive and restorative dentistry. He creates personalized dental plans to help patients achieve healthy, confident smiles. With a focus on pain-free treatments, he ensures a comfortable experience for even the most anxious patients.',
    rating: 4.8,
    consultationFee: 90,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    slots: [
      { id: 's18', time: '10:00 AM', isBooked: false, date: '2024-05-20' },
      { id: 's19', time: '02:00 PM', isBooked: false, date: '2024-05-20' },
      { id: 's20', time: '04:00 PM', isBooked: false, date: '2024-05-20' }
    ],
    avatar: 'https://picsum.photos/seed/doctor8/200/200'
  },
  {
    id: 'doc9',
    name: 'Dr. Linda White',
    email: 'linda.white@medconnect.com',
    role: 'DOCTOR' as const,
    specialty: 'Neurologist',
    experience: 13,
    about: 'Dr. Linda White is an expert in neuro-diagnostics and epilepsy treatment. She has over a decade of clinical experience in academic medical centers and is passionate about utilizing digital health tools to monitor and manage neurological chronic conditions.',
    rating: 4.9,
    consultationFee: 190,
    availableDays: ['Monday', 'Tuesday'],
    slots: [
      { id: 's21', time: '09:30 AM', isBooked: false, date: '2024-05-20' },
      { id: 's22', time: '11:30 AM', isBooked: false, date: '2024-05-20' }
    ],
    avatar: 'https://picsum.photos/seed/doctor9/200/200'
  },
  {
    id: 'doc10',
    name: 'Dr. Kevin Adams',
    email: 'kevin.adams@medconnect.com',
    role: 'DOCTOR' as const,
    specialty: 'Cardiologist',
    experience: 18,
    about: 'Dr. Kevin Adams specializes in interventional cardiology. He is a senior consultant with a focus on coronary artery disease and heart failure management. His expertise includes catheter-based procedures to treat structural heart problems with precision.',
    rating: 4.9,
    consultationFee: 220,
    availableDays: ['Wednesday', 'Thursday'],
    slots: [
      { id: 's23', time: '08:00 AM', isBooked: false, date: '2024-05-22' },
      { id: 's24', time: '10:00 AM', isBooked: false, date: '2024-05-22' }
    ],
    avatar: 'https://picsum.photos/seed/doctor10/200/200'
  },
  {
    id: 'doc11',
    name: 'Dr. Sandra Bullock',
    email: 'sandra.b@medconnect.com',
    role: 'DOCTOR' as const,
    specialty: 'Pediatrician',
    experience: 6,
    about: 'Dr. Sandra is a young and energetic pediatrician who focuses on pediatric nutrition and childhood obesity prevention through active lifestyle changes. She believes that early intervention in diet and exercise sets the foundation for a healthy adult life.',
    rating: 4.5,
    consultationFee: 85,
    availableDays: ['Monday', 'Friday'],
    slots: [
      { id: 's25', time: '01:00 PM', isBooked: false, date: '2024-05-20' },
      { id: 's26', time: '03:00 PM', isBooked: false, date: '2024-05-20' }
    ],
    avatar: 'https://picsum.photos/seed/doctor11/200/200'
  },
  {
    id: 'doc12',
    name: 'Dr. William Parker',
    email: 'william.p@medconnect.com',
    role: 'DOCTOR' as const,
    specialty: 'Dermatologist',
    experience: 12,
    about: 'Dr. William Parker is a specialist in laser dermatology and cosmetic treatments. He has published multiple papers on modern laser therapy for skin rejuvenation and is an expert in managing difficult-to-treat dermatological scarring.',
    rating: 4.8,
    consultationFee: 140,
    availableDays: ['Thursday', 'Friday', 'Saturday'],
    slots: [
      { id: 's27', time: '10:00 AM', isBooked: false, date: '2024-05-23' },
      { id: 's28', time: '12:00 PM', isBooked: false, date: '2024-05-23' }
    ],
    avatar: 'https://picsum.photos/seed/doctor12/200/200'
  },
  {
    id: 'doc13',
    name: 'Dr. Olivia Martinez',
    email: 'olivia.m@medconnect.com',
    role: 'DOCTOR' as const,
    specialty: 'Dentist',
    experience: 5,
    about: 'Dr. Olivia Martinez is a specialist in pediatric dentistry. She focuses on making the first dental visit a fun and educational experience for children, promoting good oral hygiene habits from a very young age.',
    rating: 4.7,
    consultationFee: 75,
    availableDays: ['Tuesday', 'Wednesday'],
    slots: [
      { id: 's29', time: '09:00 AM', isBooked: false, date: '2024-05-21' },
      { id: 's30', time: '11:00 AM', isBooked: false, date: '2024-05-21' }
    ],
    avatar: 'https://picsum.photos/seed/doctor13/200/200'
  },
  {
    id: 'doc14',
    name: 'Dr. Daniel Kim',
    email: 'daniel.kim@medconnect.com',
    role: 'DOCTOR' as const,
    specialty: 'Orthopedic',
    experience: 20,
    about: 'Dr. Daniel Kim is a senior orthopedic surgeon with 20 years of experience. He specializes in complex spine surgeries and regenerative medicine techniques to help patients avoid surgery when possible.',
    rating: 4.9,
    consultationFee: 250,
    availableDays: ['Monday', 'Wednesday'],
    slots: [
      { id: 's31', time: '02:00 PM', isBooked: false, date: '2024-05-20' },
      { id: 's32', time: '04:00 PM', isBooked: false, date: '2024-05-20' }
    ],
    avatar: 'https://picsum.photos/seed/doctor14/200/200'
  },
  {
    id: 'doc15',
    name: 'Dr. Sophia Loren',
    email: 'sophia.l@medconnect.com',
    role: 'DOCTOR' as const,
    specialty: 'Gynecologist',
    experience: 9,
    about: 'Dr. Sophia Loren focuses on adolescent gynecology and hormonal health. She provides a supportive and non-judgmental space for young women to discuss their health and reproductive concerns.',
    rating: 4.6,
    consultationFee: 115,
    availableDays: ['Thursday', 'Friday'],
    slots: [
      { id: 's33', time: '10:00 AM', isBooked: false, date: '2024-05-23' },
      { id: 's34', time: '01:00 PM', isBooked: false, date: '2024-05-23' }
    ],
    avatar: 'https://picsum.photos/seed/doctor15/200/200'
  },
  {
    id: 'doc16',
    name: 'Dr. Ahmed Hassan',
    email: 'ahmed.h@medconnect.com',
    role: 'DOCTOR' as const,
    specialty: 'General Physician',
    experience: 15,
    about: 'Dr. Ahmed Hassan is an expert in internal medicine and chronic disease management. He takes a comprehensive look at patient health history to provide coordinated care plans that improve quality of life.',
    rating: 4.8,
    consultationFee: 95,
    availableDays: ['Sunday', 'Monday', 'Tuesday'],
    slots: [
      { id: 's35', time: '08:00 AM', isBooked: false, date: '2024-05-19' },
      { id: 's36', time: '10:00 AM', isBooked: false, date: '2024-05-19' }
    ],
    avatar: 'https://picsum.photos/seed/doctor16/200/200'
  }
];
